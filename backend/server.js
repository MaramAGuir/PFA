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

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/projectdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 📁 Schéma Project
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

// 📁 Schéma Task
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
  createdAt: { type: Date, default: Date.now }
});
const Task = mongoose.model('Task', taskSchema);

//
// ─── ROUTES PROJETS ─────────────────────────────────────────────
//
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

//
// ─── ROUTES TÂCHES ─────────────────────────────────────────────
//
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Tâche non trouvée" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, startDate, endDate, assignee, teamMembers } = req.body;

    if (!title || !description || !startDate || !endDate || !assignee) {
      return res.status(400).json({ error: "Champs obligatoires manquants." });
    }

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

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Tâche non trouvée" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Tâche non trouvée" });
    res.json({ message: "Tâche supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// ─── SERVIR LE FRONTEND ─────────────────────────────────────────
//
app.use(express.static(path.join(__dirname, '../front/dist')));

// ✔️ Correction compatible avec Node.js 20.x et Express
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, '../front/dist/index.html'));
  } else {
    next();
  }
});

//
// ─── LANCEMENT DU SERVEUR ───────────────────────────────────────
//
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Projets: /api/projects | Tâches: /api/tasks`);
});
