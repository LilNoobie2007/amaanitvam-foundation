import mongoose from 'mongoose';

const schema = new mongoose.Schema({}, { timestamps: true });
export default mongoose.models.Task || mongoose.model('Task', schema);
