import express from "express"
import { cancelRegistration, createEvent, getEventDetails, getEventStats, listUpcomingEvents, registerForEvent } from "../controller/event.controller.js";

const router = express.Router()

router.post('/', createEvent);

router.get('/', listUpcomingEvents);

router.get('/:eventId', getEventDetails);

router.post('/:eventId/register', registerForEvent);

router.post('/:eventId/cancel', cancelRegistration);

router.get('/:eventId/stats', getEventStats);

export default router;