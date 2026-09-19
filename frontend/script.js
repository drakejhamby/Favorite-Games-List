// Needed Variables
const gamesGrid = document.getElementById('games-grid');
const inputForm = document.getElementById('input-form');


// GET function
async function getGames() {
   const response = await fetch('http://localhost:3001/api/games');
   if (!response.ok) {
       throw new Error(`Unable to load games: ${response.status}`);
   }

   const gamesData = await response.json();
    gamesGrid.innerHTML = '';
    gamesData.forEach((game) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'game-card';

        gridItem.innerHTML = `
        <img class="box-art" src="${game.boxArtUrl}" alt="${game.title} box art" />
        <strong class="game-title">${game.title}</strong>
        <p>${game.platform}</p>
        <p>${game.esrbRating}</p>
        <p>${game.releaseYear}</p>
        <p>${game.genre}</p>
        <button>Edit</button>
        <button>Delete</button>
        `;
        gamesGrid.appendChild(gridItem);
    })
  
}



// POST function
inputForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const newGame = {
            title: document.getElementById('title').value,
            platform: document.getElementById('platform').value,
            releaseYear: document.getElementById('release-year').value,
            genre: document.getElementById('genre-input').value,
            boxArtUrl: document.getElementById('boxArtUrl').value
        };

        const response = await fetch('http://localhost:3001/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGame)
        });

        if (!response.ok) {
            throw new Error(`Unable to save game: ${response.status}`);
        }

        inputForm.reset();
        await getGames();
    } catch (error) {
        console.error(error);
    }
})



getGames();