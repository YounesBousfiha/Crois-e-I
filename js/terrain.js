// Refactoring : reDesign Expand player Card

// FEAT: add REGEX Validation


// FEAT: Add modifie BTN & Remove BTN ( remove from Formation ou From Remplassant);

// BUG: chaque joueur doit etre en terrain ou en remplassant ou on database ( Separation des BaseDonner)
// Plan D'action
// Every Player inside the terrain should be in LocalStorage "inGame"
// Every Player in changeDeck should be in LocalStorage "inChange"

//BUG: le joueur  doit etre ajouter seulment Une Fois

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
        <div data-name="${obj.name}" data-rating="${obj.rating}" data-photo="${obj.photo}"  data-position="${obj.position}" data-flag="${obj.flag}" data-logo="${obj.logo}" data-diving="${obj.diving}" data-handling="${obj.handling}" data-kicking="${obj.kicking}" data-reflexes="${obj.reflexes}" data-speed="${obj.speed}" data-positioning="${obj.positioning}"  class="w-44 h-72 bg-white rounded-lg shadow-md px-2 py-2 m-2 hover:scale-110 hover:duration-500 hover:shadow-lg hover:shadow-black">
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
                <div id="select" class="bg-green-500 px-2 text-center text-white">
                    <button>Select</button>
                </div>
            </div>`;
    } else {
        playerFromStorage = `
        <div id="player" data-name="${obj.name}" data-rating="${obj.rating}" data-photo="${obj.photo}"  data-position="${obj.position}" data-flag="${obj.flag}" data-logo="${obj.logo}" data-pace="${obj.pace}" data-shooting="${obj.shooting}" data-passing="${obj.passing}" data-dribble="${obj.dribbling}" data-defense="${obj.defending}" data-physique="${obj.physique}" class="w-44 h-72 bg-white rounded-lg shadow-md px-2 py-2 m-2 hover:scale-110 hover:duration-500 hover:shadow-lg hover:shadow-black">
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
                <div class="bg-green-500 px-2 text-center text-white">
                    <button id="select" class="w-full">Select</button>
                </div>
            </div>`;
    }

    playerContainer.insertAdjacentHTML('afterbegin' ,playerFromStorage);

    document.getElementById('select').addEventListener('click', (event) => addToPlay(event, firstEvent));
}

function addToPlay(event, originalEvent) {
    let placeHolder = originalEvent.target.parentElement;
    let card = event.target.parentElement.parentElement;
    let spans = placeHolder.querySelector("span");

    if (placeHolder.querySelector('[data-name]')) {
        return;
    } 

    spans.remove();
    let newElement = `
    <div data-name="${card.dataset.name}" data-position="${card.dataset.position}" data-rating="${card.dataset.rating}" data-flag="${card.dataset.flag}" data-logo="${card.dataset.logo}" data-photo="${card.dataset.photo}" class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-black p-4" onclick="expandPlayer(this)" data-name="${card.dataset.name}" data-rating="${card.dataset.rating}" data-photo="${card.dataset.photo}" data-position="${card.dataset.position}" data-flag="${card.dataset.flag}" data-logo="${card.dataset.logo}">
            <div class="flex items-center justify-between w-28 max-md:w-24 max-sm:w-12 mt-5">
                <div class="flex flex-col max-sm:-mt-6 max-sm:leading-[0px]">
                    <span class="text-lg font-bold max-md:text-sm max-sm:text-[8px] max-ms:mt-2 max-sm:h-3">${card.dataset.rating}</span>
                    <span class="text-lg max-md:text-sm max-sm:text-[8px] max-sm:h-4">${card.dataset.position}</span>
                    <div class="space-y-1">
                        <img src="${card.dataset.flag}" alt="nationality" class="w-5 h-5 max-sm:w-2 max-sm:h-2">
                        <img src="${card.dataset.logo}" alt="club" class="w-5 h-5 max-sm:w-2 max-sm:h-2">
                    </div>
                </div>
                <img src="${card.dataset.photo}" alt="player" class="w-24 -mt-5 max-sm:w-16 max-sm:h-12 object-contain">
            </div>
            <span class="font-semibold max-md:text-sm max-sm:text-[6px]">${card.dataset.name}</span>
        </div>`;

        placeHolder.innerHTML += newElement;

        document.getElementById('player').addEventListener('click', (event) => expandPlayer(event));
}

function expandPlayer(element) {

    //document.getElementById('terrain').removeEventListener('click', addToTerrain);
    let playerDetails = `
    <div id="playerModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-4 rounded-lg max-w-md w-full mx-4">
            <div class="flex justify-end">
                <span id="closeDetails" class="mt-1 px-4 py-1 bg-black text-white rounded">&times</span>
            </div>
            <h2 class="text-xl font-bold text-center">${element.dataset.name}</h2>
            <img src="${element.dataset.photo}" alt="Player Image" class="w-32 h-32 object-cover rounded-full mx-auto">
            <p class="text-center">Rating: ${element.dataset.rating}</p>
            <p class="text-center">Position: ${element.dataset.position}</p>
            <div class="flex justify-center gap-2">
                <p class="text-center">Nationality:</p>
                <img src="${element.dataset.flag}" alt="nation" width="20">
            </div>
            <div class="flex justify-center gap-2">
                <p class="text-center">Club: </p>
                <img src="${element.dataset.logo}" alt="club" width="20">
            </div>
            <div class="grid grid-cols-2 mt-4">
                <div class="text-center">
                    <span class="font-bold">Stat 1: </span>
                    <span>${element.dataset.stat1 || '00'}</span>
                </div>
                <div class="text-center">
                    <span class="font-bold">Stat 2: </span>
                    <span>${element.dataset.stat2 || '00'}</span>
                </div>
                <div class="text-center">
                    <span class="font-bold">Stat 3: </span>
                    <span>${element.dataset.stat3 || '00'}</span>
                </div>
                <div class="text-center">
                    <span class="font-bold">Stat 4: </span>
                    <span>${element.dataset.stat4 || '00'}</span>
                </div>
                <div class="text-center">
                    <span class="font-bold">Stat 5: </span>
                    <span>${element.dataset.stat5 || '00'}</span>
                </div>
                <div class="text-center">
                    <span class="font-bold">Stat 6: </span>
                    <span>${element.dataset.stat6 || '00'}</span>
                </div>
            </div>
            <div class="flex justify-around mt-4">
                <button id="ChangePlayer" class="px-4 py-2 bg-yellow-500 text-white rounded">Change</button>
                <button id="RemovePlayer" class="px-4 py-2 bg-red-500 text-white rounded">Remove</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', playerDetails);
    
    let placeholder = event.target.parentElement;
    document.getElementById('ChangePlayer').addEventListener('click',  (event) => changePlayers(event, placeholder));
    document.getElementById('RemovePlayer').addEventListener('click', (event) => removeFromTerrain(event, placeholder));

    document.getElementById('closeDetails').addEventListener('click', () => {
        document.getElementById('playerModal').remove();
    });
}


function removeFromTerrain(event, placeHolder) {
    let cible = placeHolder.querySelector('[data-name]');
    cible.remove();
    placeHolder.innerHTML += `
                <span class="absolute inset-0 flex justify-center items-center">
                    <svg class="w-16 max-md:w-12 max-sm:w-8" viewBox="0 0 36 42" fill="none">
                        <path d="M18.6275 41.711L18.3137 41.0298C18.1146 41.1215 17.8854 41.1215 17.6863 41.0298L17.3726 41.711L17.6863 41.0298L1.18627 33.4311C0.920355 33.3087 0.75 33.0427 0.75 32.7499V8.7248C0.75 8.42506 0.928458 8.15411 1.20383 8.03575L17.7038 0.943648C17.8929 0.862375 18.1071 0.862375 18.2962 0.943648L34.7962 8.03575C35.0715 8.15411 35.25 8.42506 35.25 8.7248V32.7499C35.25 33.0427 35.0796 33.3087 34.8137 33.4311L18.3137 41.0298L18.6275 41.711Z" stroke="currentColor" stroke-width="1.5"></path>
                        <path d="M18 12v12m6-6H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </span>`;
}



function changePlayers(event, placeHolder) {
    document.getElementById('playerModal').remove();
    // Load Other Modal Point to Replacement LocalStorage
    // new modal should display contain players from localStorage(remplacant);
    // select a player
    // swap the new Player & the old Player data
    // update the localStorage
    console.log(placeHolder);
}

// function that track players in Remplacant
// function that track players in terrain

function saveFormation() {}


document.getElementById('terrain').addEventListener('click', (event) => {
    let placeHolder = event.target.parentElement;
    if (!placeHolder.querySelector('[data-name]')) {
        addToTerrain(event);
    }
});

document.getElementById('remplace').addEventListener('click', (event) => {
    let placeHolder = event.target.parentElement;
    console.log(placeHolder);
    if (!placeHolder.querySelector('[data-name]')) {
        addToTerrain(event);
    }
});