import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface for the Board document
export interface IBoard extends Document {
    name: string;
    description?: string;
    status: 'Open' | 'In Progress' | 'Closed'; // Example statuses
    createdAt: Date;
    updatedAt: Date;
}

// Mongoose schema for Board
const BoardSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Board name is required'],
        trim: true,
        minlength: [3, 'Board name must be at least 3 characters long'],
        maxlength: [100, 'Board name cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        default: 'Open'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Create and export the Board model
const Board = mongoose.model<IBoard>('Board', BoardSchema);

export default Board;
