import { Schema, model, Document, Types } from 'mongoose'

export interface IPriority extends Document {
  name: string
  createdBy: Types.ObjectId
  type: number
  editedBy?: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const prioritySchema = new Schema<IPriority>(
  {
    name: { type: String, required: true },
    type: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    editedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null }
  },
  { timestamps: true }
)

export default model<IPriority>('Priority', prioritySchema)
