const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const PORT = 3001;

// Built-in middleware for JSON parsing
app.use(express.json());
app.use(cors());

//Full-path to the Games Array
const filePath = path.join(__dirname, 'games.json');

//Helper Function to read the array
async function getGames() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

//Helper Function to Save Games to the array
async function saveGames(games) { 
    const data = JSON.stringify(games, null, 2);
    await fs.writeFile(filePath, data)
}


// GET games path
app.get('/api/games', async (req, res) => {
    try {
        const games = await getGames();
        res.status(200).json(games);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to load games '});
    }
});

// POST games path
app.post('/api/games', async (req, res) => {
    // Get the current list of games
    const games = await getGames();

    // Create a new game using the fields
    const newGame = {
        id: Date.now(),
        title: req.body.title,
        platform: req.body.platform,
        esrbRating: req.body.esrbRating,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
        boxArtUrl: req.body.boxArtUrl
    };

    games.push(newGame);
    await saveGames(games);

    return res.status(201).json(newGame);
})




app.listen(PORT, () => {
    console.log(`Games List App is listening on http://localhost:${PORT}`);
} )