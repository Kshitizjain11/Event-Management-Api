import * as service from '../services/userService.js';

export const createUser = async (req, res, next) => {
    try {
        const { name, email } = req.body || {};
        
        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const result = await service.createUser({ name, email });
        res.status(201).json(result);
    } catch (err) {
        // Handle unique constraint violation (duplicate email)
        if (err.code === 'P2002') {
            return res.status(409).json({ error: 'Email already exists' });
        }
        next(err);
    }
};

export const listUsers = async (_req, res, next) => {
    try {
        const result = await service.listUsers();
        res.json(result);
    } catch (err) {
        next(err);
    }
};