import mongoose, { Schema, Document, Types } from 'mongoose';
import { TaskStatus } from '../enums/taskStatus.enum'; // Assuming you have this enum


export interface ITask extends Document {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: Date;
    category?: Types.ObjectId; // Reference to Category
    assignedTo?: Types.ObjectId; // Reference to User
    createdBy: Types.ObjectId; // Reference to User
    board?: Types.ObjectId; // Reference to Board (NEW)
    createdAt: Date;
    updatedAt: Date;
}

// Mongoose schema for Task
const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.TODO,
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
        required: true
    },
    dueDate: { type: Date, required: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        // required: [true, 'Assigned user is required'] // Make optional or handle validation elsewhere
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: [true, 'Creator user is required'],
        immutable: true // Cannot be changed after creation
    },
    board: { // NEW FIELD
        type: Schema.Types.ObjectId,
        ref: 'Board', // Reference to the Board model
        index: true // Add index for faster queries filtering by board
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Pre-save hook to handle any logic before saving a task
TaskSchema.pre<ITask>('save', function (next) {
    // Add any pre-save logic here
    next();
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;