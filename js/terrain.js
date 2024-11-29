

function addToTerrain(event) {
    let modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    let selectedPlace = event.target.parentElement;
    let storage = JSON.parse(localStorage.getItem('playerDB')) || [];
    let allPositions = ["ST", "LW", "RW", "CDM", "CM", "LB", "RB", "CB", "GK"];
    
    console.log(selectedPlace);
    let placeholders = [...selectedPlace.classList];
    let availablePosition = placeholders.filter(cls => allPositions.includes(cls));
    
    storage.forEach(player => {
        if(availablePosition.includes(player.position)) {
            PlayerModal(player);
        }
    });
}

function PlayerModal(obj) {
    // onClick on that Player
    // place holder removed & replaced by the new Player
}

function expandPlayer() {}

function removeFromFormation() {}
function removeFromTerrain() {}

function changePlayers() {}



function saveFormation() {}


document.getElementById('terrain').addEventListener('click', (event) => {
    addToTerrain(event);
});

document.getElementById('remplace').addEventListener('click', (event) => {
    addToTerrain(event);
});