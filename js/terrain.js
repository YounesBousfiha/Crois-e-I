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
                <div id="select" class="bg-green-500 px-2 text-center text-white">
                    <button>Select</button>
                </div>
            </div>`;
    }

    playerContainer.insertAdjacentHTML('afterbegin' ,playerFromStorage);

    document.getElementById('select').addEventListener('click', (event) => addToPlay(event, firstEvent));
}

function addToPlay(event, originalEvent) {
    let placeHolder = originalEvent.target.parentElement;
    let card = event.target.parentElement;
    let spans = placeHolder.querySelector("span");

    if (placeHolder.querySelector('[data-name]')) {
        return;
    }

    spans.remove();
    let newElement = `
    <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-black p-4" onclick="expandPlayer(this)" data-name="${card.dataset.name}" data-rating="${card.dataset.rating}" data-photo="${card.dataset.photo}" data-position="${card.dataset.position}" data-flag="${card.dataset.flag}" data-logo="${card.dataset.logo}">
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
        console.log("fill card :", placeHolder);
        placeHolder.innerHTML += newElement;

        document.getElementById('player').addEventListener('click', (event) => expandPlayer(event));
}

function expandPlayer(element) {
    document.getElementById('terrain').removeEventListener('click', addToTerrain);
    let playerDetails = `
    <div id="playerModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-4 rounded-lg">
            <h2 class="text-xl font-bold">${element.getAttribute('data-name')}</h2>
            <img src="${element.getAttribute('data-photo')}" alt="Player Image" class="w-32 h-32 object-cover rounded-full mx-auto">
            <p>Rating: ${element.getAttribute('data-rating')}</p>
            <p>Position: ${element.getAttribute('data-position')}</p>
            <p>Nationality: <img src="${element.getAttribute('data-flag')}" alt="nation" width="20"></p>
            <p>Club: <img src="${element.getAttribute('data-logo')}" alt="club" width="20"></p>
            <button id="closeModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', playerDetails);

    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('playerModal').remove();
        document.getElementById('terrain').addEventListener('click', addToTerrain);
    });
}

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