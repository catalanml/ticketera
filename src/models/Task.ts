import { Schema, model, Document, Types } from 'mongoose'
import { ICategory } from './Category'
import { IUser } from './User'
import { TaskStatusEnum } from '../enums/taskStatus.enum';


export interface ITask extends Document {
    name: string
    description: string
    category: ICategory['_id']
    assignedTo: IUser['_id']
    priority: number
    status: TaskStatusEnum
    dueDate: Date
    completedAt?: Date
    createdBy: IUser['_id']
    editedBy?: IUser['_id']
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deleteAt?: Date
}


const taskSchema = new Schema<ITask>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        priority: {
            type: Number,
            required: true,
            min: 1,
            max: 3,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for priority'
            }
        },
        status: {
            type: String,
            enum: Object.values(TaskStatusEnum),
            default: TaskStatusEnum.TODO,
            required: true
        },
        dueDate: { type: Date, required: true },
        completedAt: { type: Date, default: null },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        editedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
        deleted: { type: Boolean, default: false },
        deleteAt: { type: Date, default: null }
    },
    {
        timestamps: true
    }
)

export default model<ITask>('Task', taskSchema)