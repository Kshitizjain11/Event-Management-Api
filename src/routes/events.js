import express from "express"

const router = express.Router()

router.post('/', controller.createEvent);

router.get('/', controller.listUpcomingEvents);

router.get('/:eventId', controller.getEventDetails);

router.post('/:eventId/register', controller.registerForEvent);

router.post('/:eventId/cancel', controller.cancelRegistration);

router.get('/:eventId/stats', controller.getEventStats);

export default router;