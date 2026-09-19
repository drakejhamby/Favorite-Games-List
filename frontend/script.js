// Needed Variables
const gamesGrid = document.getElementById('games-grid');

async function getGames() {
   const response = await fetch('http://localhost:3001/api/games');
   const gamesData = await response.json();
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

getGames();