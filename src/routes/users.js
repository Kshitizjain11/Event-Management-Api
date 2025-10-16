import { Router } from 'express';
import * as userController from '../controller/user.controller.js';

const router = Router();

// Create a new user
router.post('/', userController.createUser);

// List all users
router.get('/', userController.listUsers);

export default router;