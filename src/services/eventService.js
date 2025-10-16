import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient()

export async function createEvent(data) {

    const eventDate = new Date(data.dateTime);
  if (Number.isNaN(eventDate.getTime())) {
    const err = new Error('Invalid dateTime. Must be ISO string ');
    err.status = 400;
    throw err;
  }

  if (data.capacity < 1 || data.capacity > 1000) {
    const err = new Error('Capacity must be less than 1000.');
    err.status = 400;
    throw err;
  }

  const event = await prisma.event.create({
    data: {
      title: data.title,
      dateTime: eventDate,
      location: data.location,
      capacity: data.capacity,
    },

    select: { id: true },
  });

  return event;
}

export async function getEventDetails(eventId) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { registration: { include: { user: true } } },
  });
  if (!event) {
    const err = new Error('Event not found');
    err.status = 404;
    throw err;
  }

  const users = event.registration.map((regis) => ({
    id: regis.user.id,
    name: regis.user.name,
    email: regis.user.email
  }));

  return {
    id: event.id,
    title: event.title,
    dateTime: event.dateTime,
    location: event.location,
    capacity: event.capacity,
    users 
  };
}

export async function registerForEvent(eventId, userId) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { _count: { select: { registration: true } } }
  });

  if (!event) {
    const err = new Error('Event not found');
    err.status = 404;
    throw err;
  }

  if (event.dateTime.getTime() <= Date.now()) {
    const err = new Error('Cannot register for past events');
    err.status = 400;
    throw err;
  }

  const alreadyRegistered = await prisma.registration.findUnique({
    where: { userId_eventId: { userId, eventId } }
  });

  if (alreadyRegistered) {
    const err = new Error('User already registered for this event');
    err.status = 409;
    throw err;
  }

  const currentCount = event._count.registration;
  if (currentCount >= event.capacity) {
    const err = new Error('Event is full');
    err.status = 409;
    throw err;
  }

  await prisma.registration.create({
    data: { eventId, userId }
  });

  return { success: true };
}

export async function cancelRegistration(eventId, userId) {
  const existingRegistration = await prisma.registration.findUnique({
    where: { userId_eventId: { userId, eventId } }
  });

  if (!existingRegistration) {
    const err = new Error('User is not registered for this event');
    err.status = 400;
    throw err;
  }

  await prisma.registration.delete({
    where: { id: existingRegistration.id }
  });

  return { success: true };
}

export async function listUpcomingEvents() {
  const now = new Date();

  const events = await prisma.event.findMany({
    where: { dateTime: { gt: now } },
    orderBy: [
      { dateTime: 'asc' },
      { location: 'asc' }
    ],
  });

  return events.map(event => ({
    id: event.id,
    title: event.title,
    dateTime: event.dateTime,
    location: event.location,
    capacity: event.capacity
  }));
}

export async function getEventStats(eventId) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      _count: { select: { registration: true } },
    },
  });

  if (!event) {
    const err = new Error('Event not found');
    err.status = 404;
    throw err;
  }

  const totalRegistrations = event._count.registration;
  const remainingCapacity = event.capacity - totalRegistrations

  const percentageUsed = event.capacity > 0
    ? Number(((totalRegistrations / event.capacity) * 100).toFixed(2))
    : 0;

  return {
    totalRegistrations,    
    remainingCapacity,    
    percentageUsed
  };
}


