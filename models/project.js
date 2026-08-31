import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [String], // Array of strings e.g. ["React", "Tailwind"]
  likes: { type: Number, default: 0 }
}, { timestamps: true }); // Automatically creates 'createdAt' and 'updatedAt' fields

const Project = mongoose.model('Project', projectSchema);
export default Project;