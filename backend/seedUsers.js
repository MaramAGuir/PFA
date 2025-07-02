// seedUsers.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const seedUsers = async () => {
  try {
    // Supprime les utilisateurs existants
    await User.deleteMany();

    // Liste des utilisateurs
    const users = [
      {
        name: "Ameni Jafeer",
        email: "ameni@proxym.com",
        password: "123456",
        role: "chef",
      },
      {
        name: "Maram Aguir ",
        email: "maram@proxym.com",
        password: "123456",
        role: "collaborateur",
      },
      {
        name: "Yassmine Sahli ",
        email: "yassmine@proxym.com",
        password: "123456",
        role: "collaborateur",
      },
      {
        name: "Ali Ben Salah",
        email: "ali@proxym.com",
        password: "123456",
        role: "collaborateur",
      },
      {
        name: "Sarra Jouini",
        email: "sarra@proxym.com",
        password: "123456",
        role: "collaborateur",
      },
    ];

    // Hasher les mots de passe
    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
    }

    // Insère dans la base
    await User.insertMany(users);
    console.log("✅ Utilisateurs insérés avec succès !");
    process.exit(); // quitte proprement
  } catch (error) {
    console.error("❌ Erreur lors de l’insertion :", error.message);
    process.exit(1);
  }
};

seedUsers();
