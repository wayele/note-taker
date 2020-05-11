// Require express npm package
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
// Need to figure out where to use this uuid
// uuidv4();

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


// API Routes

app.get("/api/notes", function (req, res) {
    // Use db.json to store and retrieve notes using fs 
    fs.readFile("./db/db.json", "utf-8", function (err, dbJson) {
        if (err) {
            console.log(err);
        }
        console.log(dbJson);

        const savedNotes = JSON.parse(dbJson);
        // console.log(savedNotes);
        res.json(savedNotes);
    })

});


// Create a post request to add new note
app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", function (err, dbJson) {
        if (err) {
            console.log(err);
        }
        // console.log(dbJson);

        const savedNotes = JSON.parse(dbJson);
        const newNote = req.body;
        // newNote.id = savedNotes[savedNotes.length - 1].id + 1
        newNote.id = uuidv4();
        savedNotes.push(newNote);
        // put this in a function
        fs.writeFile("./db/db.json", JSON.stringify(savedNotes), function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(data);

            res.json("saved results");
        });
    });

})

app.delete("/api/notes/:id", function (req, res) {
    let selected = req.params.id;
    console.log(selected);
    fs.readFile("./db/db.json", "utf-8", function (err, dbJson) {
        if (err) {
            console.log(err);
        }
        const savedNotes = JSON.parse(dbJson);
        const index = savedNotes.findIndex(el => el.id === selected)
        savedNotes.splice(index, 1);
        // console.log("removed ???")
        console.log(savedNotes)

        fs.writeFile("./db/db.json", JSON.stringify(savedNotes), function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(data);

            res.json("saved results");
        });


    })

})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



// Listener
app.listen(PORT, () => {
    console.log("App listeninig on PORT " + PORT);

})