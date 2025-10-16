import * as service from '../services/eventService.js';

export const createEvent =async (req, res, next) => {
  try {
    const { title, dateTime, location, capacity } = req.body || {};
    if (!title || !dateTime || !location || capacity == null) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const result = await service.createEvent({ title, dateTime, location, capacity: Number(capacity) });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export const  getEventDetails = async(req, res, next) => {
  try {
    const { eventId } = req.params;
    const result = await service.getEventDetails(eventId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export const registerForEvent = async(req, res, next)  => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body || {};
    if (!userId) {
      return res.status(400).json({ error: 'Missing required field: userId' });
    }
    const result = await service.registerForEvent(eventId, userId);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export const  cancelRegistration = async(req, res, next) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body || {};
    if (!userId) {
      return res.status(400).json({ error: 'Missing required field: userId' });
    }
    const result = await service.cancelRegistration(eventId, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export const listUpcomingEvents = async(_req, res, next) => {
  try {
    const result = await service.listUpcomingEvents();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export const getEventStats = async(req, res, next) => {
  try {
    const { eventId } = req.params;
    const result = await service.getEventStats(eventId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}


