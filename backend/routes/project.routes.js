const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { auth, adminOnly } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = { status: 'active' };
    
    if (category && category.toLowerCase() !== 'all') query.category = category;
    if (featured === 'true') query.featured = true;
    
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single project by ID or slug (public)
router.get('/:idOrSlug', async (req, res) => {
  try {
    let project;
    if (req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(req.params.idOrSlug);
    } else {
      project = await Project.findOne({ slug: req.params.idOrSlug });
    }
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create project (admin)
router.post('/', auth, adminOnly, upload.array('images', 5), async (req, res) => {
  try {
    console.log('📥 CREATE PROJECT — body:', req.body);
    console.log('📥 CREATE PROJECT — files:', req.files?.length || 0);

    const projectData = { ...req.body };

    // Parse JSON strings back to arrays
    if (projectData.techStack && typeof projectData.techStack === 'string') {
      try { projectData.techStack = JSON.parse(projectData.techStack); } catch(e) { projectData.techStack = []; }
    }
    if (projectData.features && typeof projectData.features === 'string') {
      try { projectData.features = JSON.parse(projectData.features); } catch(e) { projectData.features = []; }
    }

    // Handle images
    if (req.files && req.files.length > 0) {
      projectData.images = req.files.map(f => f.path);
      projectData.thumbnail = req.files[0].path;
    } else {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Convert rating to number
    if (projectData.rating) projectData.rating = parseFloat(projectData.rating);
    
    // Convert order to number
    if (projectData.order) projectData.order = parseInt(projectData.order);

    // Convert featured to boolean
    projectData.featured = projectData.featured === 'true' || projectData.featured === true;

    console.log('📥 CREATE PROJECT — final data:', projectData);

    const project = new Project(projectData);
    await project.save();
    
    console.log('✅ Project created:', project.title);
    res.status(201).json(project);
  } catch (error) {
    console.error('❌ CREATE ERROR:', error.message);
    res.status(500).json({ message: error.message, details: error.errors });
  }
});

// Update project (admin)
router.put('/:id', auth, adminOnly, upload.array('images', 5), async (req, res) => {
  try {
    console.log('📥 UPDATE PROJECT — id:', req.params.id);
    
    const updateData = { ...req.body };

    // Parse JSON strings
    if (updateData.techStack && typeof updateData.techStack === 'string') {
      try { updateData.techStack = JSON.parse(updateData.techStack); } catch(e) { updateData.techStack = []; }
    }
    if (updateData.features && typeof updateData.features === 'string') {
      try { updateData.features = JSON.parse(updateData.features); } catch(e) { updateData.features = []; }
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(f => f.path);
      updateData.images = newImages;
      updateData.thumbnail = newImages[0];
    }

    if (updateData.rating) updateData.rating = parseFloat(updateData.rating);
    if (updateData.order) updateData.order = parseInt(updateData.order);
    updateData.featured = updateData.featured === 'true' || updateData.featured === true;

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    console.log('✅ Project updated:', project.title);
    res.json(project);
  } catch (error) {
    console.error('❌ UPDATE ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete project (admin)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;