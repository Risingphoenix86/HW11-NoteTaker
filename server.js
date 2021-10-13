const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('./public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
    
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});
    
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
});

app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
});
