/*const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/projectdb');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  teamLead: String,
  teamMembers: Number,
  priority: String,
  progress: { type: Number, default: 0 },
  deadline: String,
});

const Project = mongoose.model('Project', projectSchema);

app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.status(201).json(newProject);
});

// 👉 Corriger le chemin vers le dossier dist
app.use(express.static(path.join(__dirname, '../front/dist')));



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});*/

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// CORS : autorise toutes les origines (en dev uniquement)
app.use(cors());

app.use(express.json());

const PORT = 5000;

// SCHÉMAS
const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  teamLead: String,
  teamMembers: Number,
  priority: String,
  progress: { type: Number, default: 0 },
  deadline: String,
});
const Project = mongoose.model('Project', projectSchema);

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  assignee: { type: String, required: true },
  teamMembers: { type: Number, required: true, min: 1 },
  status: { type: String, default: "To Do", enum: ["To Do", "In Progress", "Done"] },
  highlights: { type: String, default: "" },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  createdAt: { type: Date, default: Date.now },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});
const Task = mongoose.model('Task', taskSchema);

// ROUTES API

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects/:projectId', async (req, res) => {
  const { projectId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "ID de projet invalide" });
  }
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Projet non trouvé" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Dans ton backend, par exemple server.js ou routes/projects.js

app.get('/api/projects/:id/teamMembers', async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId).populate('teamMembers', 'name email'); // populate selon ta config

    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    res.json(project.teamMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/projects/:projectId/tasks', async (req, res) => {
  const { projectId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "ID de projet invalide" });
  }
  try {
    const tasks = await Task.find({ projectId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, startDate, endDate, assignee, teamMembers, projectId } = req.body;
    if (!title || !description || !startDate || !endDate || !assignee || !projectId) {
      return res.status(400).json({ error: "Champs obligatoires manquants." });
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "ID de projet invalide" });
    }
    const projectExists = await Project.findById(projectId);
    if (!projectExists) return res.status(404).json({ error: "Projet non trouvé" });

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return res.status(400).json({ error: "La date de début ne peut pas être dans le passé" });
    }
    if (end <= start) {
      return res.status(400).json({ error: "La date de fin doit être après la date de début" });
    }
    if (teamMembers <= 0) {
      return res.status(400).json({ error: "Le nombre de membres doit être supérieur à 0" });
    }

    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ error: "ID de tâche invalide" });
  }
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Tâche non trouvée" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.put('/api/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ error: "ID de tâche invalide" });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true } // ← pour retourner la tâche mise à jour
    );
    if (!updatedTask) return res.status(404).json({ error: "Tâche non trouvée" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// SERVE FRONTEND STATIC FILES
app.use(express.static(path.join(__dirname, '../front/dist')));

// Fallback pour React Router — renvoyer index.html sauf pour les routes /api
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, '../front/dist/index.html'));
  } else {
    next();
  }
});

// Connexion MongoDB & lancement serveur
mongoose.connect('mongodb://localhost:27017/projectdb')
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Erreur de connexion MongoDB :", err);
  });
