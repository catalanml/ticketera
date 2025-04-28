import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import User from '../models/User';
import Board from '../models/Board'; // Import Board model
import mongoose from 'mongoose';

// Helper to check if an ID is a valid MongoDB ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

export async function validateTaskEntities(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Validate entities present in the body for create/update task requests
    const { category, assignedTo, board } = req.body; // Add board

    try {
        if (category) {
            if (!isValidObjectId(category)) {
                res.status(400).json({ error: 'Invalid Category ID format' });
                return;
            }
            const exists = await Category.exists({ _id: category });
            if (!exists) {
                res.status(404).json({ error: `Category with ID ${category} not found` }); // Use 404
                return;
            }
        }

        if (assignedTo) {
            if (!isValidObjectId(assignedTo)) {
                res.status(400).json({ error: 'Invalid Assigned User ID format' });
                return;
            }
            const exists = await User.exists({ _id: assignedTo });
            if (!exists) {
                res.status(404).json({ error: `User with ID ${assignedTo} not found` }); // Use 404
                return;
            }
        }

        if (board) { // Add validation for board
            if (!isValidObjectId(board)) {
                res.status(400).json({ error: 'Invalid Board ID format' });
                return;
            }
            const exists = await Board.exists({ _id: board });
            if (!exists) {
                res.status(404).json({ error: `Board with ID ${board} not found` }); // Use 404
                return;
            }
        }

        next(); // All checks passed
    } catch (err) {
        // Log the error internally
        console.error("Error during entity validation:", err);
        res.status(500).json({
            error: 'Internal server error during entity validation',
            // Avoid sending detailed internal error messages to the client
            // details: (err as Error).message
        });
    }
}

// Optional: Middleware specifically for validating if a Board exists based on URL param (:id)
// This could be used on GET /boards/:id, PUT /boards/:id, DELETE /boards/:id routes
// before the main controller logic, although the service layer often handles this.
export async function validateBoardExists(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        res.status(400).json({ error: 'Invalid Board ID format' });
        return;
    }

    try {
        const exists = await Board.exists({ _id: id });
        if (!exists) {
            res.status(404).json({ error: `Board with ID ${id} not found` });
            return;
        }
        next(); // Board exists, proceed
    } catch (err) {
        console.error("Error checking board existence:", err);
        res.status(500).json({ error: 'Internal server error checking board existence' });
    }
}
