function addToTerrain(event) {
    let modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    let selectedPlace = event.target.parentElement;
    let storage = JSON.parse(localStorage.getItem('playerDB')) || [];
    let allPositions = ["ST", "LW", "RW", "CDM", "CM", "LB", "RB", "CB", "GK"];
    let playerContainer = document.getElementById('playersBank');

    let placeholders = [...selectedPlace.classList];
    let availablePosition = placeholders.filter(cls => allPositions.includes(cls));
    
    playerContainer.innerHTML = ``;
    storage.forEach(player => {
        if(availablePosition.includes(player.position)) {
            PlayerModal(player, playerContainer, event);
        }
    });
}

function PlayerModal(obj, playerContainer, firstEvent) {
    let playerFromStorage;
    if(obj.position == 'GK') {
        playerFromStorage = `
        <div data-name="${obj.name}"  data-position="${obj.position}" data-flag="${obj.flag}" data-logo="${obj.logo}" data-diving="${obj.diving}" data-handling="${obj.handling}" data-kicking="${obj.kicking}" data-reflexes="${obj.reflexes}" data-speed="${obj.speed}" data-positioning="${obj.positioning}"  class="w-44 h-72 bg-white rounded-lg shadow-md px-2 py-2 m-2 hover:scale-110 hover:duration-500 hover:shadow-lg hover:shadow-black">
                <img src="${obj.photo}" alt="Player Image" class="w-full h-32 object-cover rounded-t-lg">
                <div class="p-2 space-y-1">
                    <p class="text-lg font-bold text-center name">${obj.name}</p>
                    <div class="flex justify-evenly">
                        <span class="text-gray-600 text postion">${obj.position}</span>
                        <span class="text-gray-600 rating">${obj.rating}</span>
                        <img src="${obj.flag}" alt="nation" width="20">
                        <img src="${obj.logo}" alt="club" width="20">
                    </div>
                    <div class="flex space-x-1">
                        <span class="text-gray-600">DI</span>
                        <span class="text-gray-600">HA</span>
                        <span class="text-gray-600">KI</span>
                        <span class="text-gray-600">RE</span>
                        <span class="text-gray-600">SP</span>
                        <span class="text-gray-600">PO</span>
                    </div>
                    <div class="flex justify-around space-x-2">
                        <span class="text-gray-600 pace">${obj.diving || '00'}</span>
                        <span class="text-gray-600 shooting">${obj.handling || '00'}</span>
                        <span class="text-gray-600 passing">${obj.kicking || '00'}</span>
                        <span class="text-gray-600 dribble">${obj.reflexes || '00'}</span>
                        <span class="text-gray-600 defense">${obj.speed || '00'}</span>
                        <span class="text-gray-600 physique">${obj.positioning || '00'}</span>
                    </div>
                </div>
                <div class="bg-green-500 px-2 text-center text-white onclick="addToPlay(this)"">
                    <button>Select</button>
                </div>
            </div>`;
    } else {
        playerFromStorage = `
        <div data-name="${obj.name}"  data-position="${obj.position}" data-flag="${obj.flag}" data-logo="${obj.logo}" data-pace="${obj.pace}" data-shooting="${obj.shooting}" data-passing="${obj.passing}" data-dribble="${obj.dribbling}" data-defense="${obj.defending}" data-physique="${obj.physique}" class="w-44 h-72 bg-white rounded-lg shadow-md px-2 py-2 m-2 hover:scale-110 hover:duration-500 hover:shadow-lg hover:shadow-black">
                <img src="${obj.photo}" alt="Player Image" class="w-full h-32 object-cover rounded-t-lg">
                <div class="p-2 space-y-1">
                    <p class="font-bold text-center name">${obj.name}</p>
                    <div class="flex justify-evenly">
                        <span class="text-gray-600 text postion">${obj.position}</span>
                        <span class="text-gray-600 rating">${obj.rating}</span>
                        <img class="flag" src="${obj.flag}" alt="nation" width="20">
                        <img class="logo" src="${obj.logo}" alt="club" width="20">
                    </div>
                    <div class="flex space-x-1">
                        <span class="text-gray-600">PC</span>
                        <span class="text-gray-600">SH</span>
                        <span class="text-gray-600">PA</span>
                        <span class="text-gray-600">DR</span>
                        <span class="text-gray-600">DF</span>
                        <span class="text-gray-600">PH</span>
                    </div>
                    <div class="flex justify-around space-x-2">
                        <span class="text-gray-600 pace">${obj.pace || '00'}</span>
                        <span class="text-gray-600 shooting">${obj.shooting || '00'}</span>
                        <span class="text-gray-600 passing">${obj.passing || '00'}</span>
                        <span class="text-gray-600 dribble">${obj.dribbling || '00'}</span>
                        <span class="text-gray-600 defense">${obj.defending || '00'}</span>
                        <span class="text-gray-600 physique">${obj.physique || '00'}</span>
                    </div>
                </div>
                <div id="select" class="bg-green-500 px-2 text-center text-white">
                    <button>Select</button>
                </div>
            </div>`;
    }

    playerContainer.insertAdjacentHTML('afterbegin' ,playerFromStorage);

    document.getElementById('select').addEventListener('click', (event) => addToPlay(event, firstEvent));
}

function addToPlay(event, originalEvent) {
    console.log(originalEvent.target);
    //let card = event.parentElement;
    console.log(event.target);

    //spans.remove();
    //console.log(placeHolder);
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