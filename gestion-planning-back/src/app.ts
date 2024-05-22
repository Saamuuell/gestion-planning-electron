import express from "express";
import sqlite3 from "sqlite3";
import cors from 'cors';

const app = express();
const db = new sqlite3.Database("./mydb.sqlite");

app.use(cors());

app.get("/", (_req, res) => {
  db.serialize(() => {
    db.run(
      "CREATE TABLE if not exists user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
    );
    db.run("INSERT INTO user (name) VALUES (?)", ["Alice"]);
    db.all("SELECT * FROM user", (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send(rows);
      }
    });
  });
});

// Route pour obtenir l'utilisateur avec l'ID 1
app.get("/user/1", (req, res) => {
  db.get("SELECT * FROM user WHERE id = 1", (err, row) => {
    if (err) {
      res
        .status(500)
        .send(
          "Erreur lors de la récupération de l'utilisateur: " + err.message
        );
    } else if (row) {
      res.send(row);
    } else {
      res.status(404).send("Utilisateur non trouvé");
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
