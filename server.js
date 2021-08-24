// Dependencies

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const characters = [
  {
    routeName: 'yoda',
    name: 'Yoda',
    role: 'Jedi Master',
    age: 900,
    forcePoints: 2000,
  },
  {
    routeName: 'darthmaul',
    name: 'Darth Maul',
    role: 'Sith Lord',
    age: 200,
    forcePoints: 1200,
  },
  {
    routeName: 'obiwankenobi',
    name: 'Obi Wan Kenobi',
    role: 'Jedi Knight',
    age: 60,
    forcePoints: 1360,
  }
];

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'add.html')));

app.get('/api/characters', (req, res) => res.json(characters));

app.get('/api/characters/:character', (req, res) => {
  const chosen = req.params.character;
  const chosenCharacter = characters.find(char => char.routeName === chosen) || false;
  return res.json(chosenCharacter);
});

app.post('/api/characters', (req, res) => {
  const newCharacter = req.body;
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();
  characters.push(newCharacter);
  res.json(newCharacter);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
