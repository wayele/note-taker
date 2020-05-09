// Require express npm package
const express = require("express");
const path = require("path");
const fs = require("fs");

// Express configuration
// Create an 'express' server

const app = express();

// Set an initial port

const PORT = process.env.PORT || 8080;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

// HTML Routes

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// Use db.json to store and retrieve notes using fs 


// API Routes

app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", function (err, dbJson) {
        if (err) {
            console.log(err);
        }
        console.log(dbJson);

        const savedNotes = JSON.parse(dbJson);
        res.json(savedNotes);
    })

});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// app.post("/api/notes", function (req, res) {
//     const newNote = req.body;
//     fs.writeFile("./db/db.json", newNote, function (err, data) {
//         if (err) {
//             console.log(err);
//         }
//         console.log(data);

//         const savedNotes = JSON.parse(data);
//         res.json(savedNotes);
//     });
// });

// Listener
app.listen(PORT, () => {
    console.log("App listeninig on PORT " + PORT);
})