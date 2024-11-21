import mongoose from 'mongoose';

export interface IEntity {
  name: string;
  description: string;
}

const EntitySchema = new mongoose.Schema<IEntity>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Entity = mongoose.model<IEntity>('Entity', EntitySchema);

export default Entity;
