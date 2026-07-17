import mongoose from 'mongoose';

const schema = new mongoose.Schema({}, { timestamps: true });
export default mongoose.models.Announcement || mongoose.model('Announcement', schema);
