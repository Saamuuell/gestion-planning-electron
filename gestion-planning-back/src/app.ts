import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const db = new sqlite3.Database("./mydb.sqlite");

app.use(cors());

app.get("/", (_req, res) => {
  db.serialize(() => {
    db.run(
      "CREATE TABLE if not exists user (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, email TEXT, phone_number TEXT, job TEXT, schedule JSON)",
    );
    db.run(
      "INSERT INTO user (first_name, last_name, email, phone_number, job, schedule) VALUES (?, ?, ?, ?, ?, ?)",
      [
        "Alice",
        "Smith",
        "alice@example.com",
        "123-456-7890",
        "Developer",
        JSON.stringify({ start: "9:00", end: "17:00" }),
      ],
    );
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
          "Erreur lors de la récupération de l'utilisateur: " + err.message,
        );
    } else if (row) {
      res.send(row);
    } else {
      res.status(404).send("Utilisateur non trouvé");
    }
  });
});
app.post("/user", (req, res) => {
  const { first_name, last_name, email, phone_number, job, schedule } =
    req.body;
  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone_number ||
    !job ||
    !schedule
  ) {
    res.status(400).send("All fields are required");
    return;
  }
  db.run(
    "INSERT INTO user (first_name, last_name, email, phone_number, job, schedule) VALUES (?, ?, ?, ?, ?, ?)",
    [first_name, last_name, email, phone_number, job, JSON.stringify(schedule)],
    function (err) {
      if (err) {
        res.status(500).send("Error inserting user: " + err.message);
      } else {
        res.status(201).send({ id: this.lastID });
      }
    },
  );
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
