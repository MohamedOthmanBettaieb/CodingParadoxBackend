import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Project from './models/project.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Atlas Connected: ${conn.connection.host} 🚀`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message} ❌`);
        process.exit(1);
    }
};

// Connect to Database
connectDB();

// Root route
app.get('/', (req, res) => {
    res.send('CodingParadox Backend API is running... 🚀');
});

// GET /api/projects - Fetch all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (error) {
        console.error(`Error fetching projects: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/projects - Create a new project
app.post('/api/projects', async (req, res) => {
    try {
        const { title, description, techStack } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and Description are required' });
        }

        const project = new Project({
            title,
            description,
            techStack: techStack || [],
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        console.error(`Error creating project: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
