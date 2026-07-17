import mongoose from 'mongoose';

const schema = new mongoose.Schema({}, { timestamps: true });
export default mongoose.models.Course || mongoose.model('Course', schema);
