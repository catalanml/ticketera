import { Schema, model, Document, Types } from 'mongoose'

export interface ICategory extends Document {
  name: string
  createdBy: Types.ObjectId
  editedBy?: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    editedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null }
  },
  { timestamps: true }
)

export default model<ICategory>('Category', categorySchema)
