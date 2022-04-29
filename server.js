const express = require('express');
const path = require('path')
const fs = require('fs');
let notes = require('./db/db.json');
const { randomUUID } = require('crypto');
//const api = require('./public/assets/js/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  // console.log(notes);
  // res.json(notes);
  // res.json(`${req.method} request received to get notes`);

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
      } else {
        res.json(JSON.parse(data));
      }
  })
  // console.info(`${req.method} request received to get notes`);
});

app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  // console.info(`${req.method} request received to add a notes`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNotes = {
      title,
      text,
      notes_id: randomUUID(),
    };

    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        let parsedNotes = JSON.parse(data);

        // Add a new notes
        parsedNotes.push(newNotes);
        notes = parsedNotes;
        
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNotes,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting notes');
  }
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);