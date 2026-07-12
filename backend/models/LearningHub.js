import mongoose from "mongoose";

const learningHubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, required: true, enum: ['Webinar', 'Competition'] },
  event: { type: String, required: true },
  organization: { type: String },
  message: { type: String },
  registrationDate: { type: Date, default: Date.now }
});

export default mongoose.model("LearningHub", learningHubSchema);