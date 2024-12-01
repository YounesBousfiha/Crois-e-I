function addToTerrain(event) {
    // BUG: Ajoute Multiple on remplacant
    let modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    let selectedPlace = event.target.parentElement;
    let storage = JSON.parse(localStorage.getItem('playerDB')) || [];
    let allPositions = ["ST", "LW", "RW", "CDM", "CM", "LB", "RB", "CB", "GK"];
    let playerContainer = document.getElementById('playersBank');

    let placeholders = [...selectedPlace.classList];
    let availablePosition = placeholders.filter(cls => allPositions.includes(cls));
    let ScannerTerrain = document.getElementById('terrain');
    let playerinTerrain = [];
    let playerRemplacant = [];

    ScannerTerrain.querySelectorAll('div').forEach((div) => {
        if(div.dataset.name) {
            playerinTerrain.push(div.dataset.name);
        }
    });

    let ChangePlayer = document.querySelectorAll('#remplace div');
    ChangePlayer.forEach((div) => {
        if(div.dataset.name) {
            playerRemplacant.push(div.dataset.name);  
        }
    });

    playerContainer.innerHTML = ``;
    storage.forEach(player => {
        if(availablePosition.includes(player.position)) {
            if(!playerinTerrain.includes(player.name) && !playerRemplacant.includes(player.name)) {
                PlayerModal(player, playerContainer, event);
            }
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
        <div data-name="${obj.name}" data-rating="${obj.rating}" data-photo="${obj.photo}"  data-position="${obj.position}" data-flag="${obj.flag}" data-logo="${obj.logo}" data-pace="${obj.pace}" data-shooting="${obj.shooting}" data-passing="${obj.passing}" data-dribble="${obj.dribbling}" data-defense="${obj.defending}" data-physique="${obj.physical}" class="w-44 h-72 bg-white rounded-lg shadow-md px-2 py-2 m-2 hover:scale-110 hover:duration-500 hover:shadow-lg hover:shadow-black">
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
                        <span class="text-gray-600 physique">${obj.physical || '00'}</span>
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

    if (placeHolder.parentElement.id == 'remplace') {
        let data = {}
        let ChangeStorage = JSON.parse(localStorage.getItem('remplacant')) || [];
        if (card.dataset.position == 'GK') {
            data = {
                name: card.dataset.name,
                position: card.dataset.position,
                rating: card.dataset.rating,
                flag: card.dataset.flag,
                logo: card.dataset.logo,
                photo: card.dataset.photo,
                diving: card.dataset.diving,
                handling: card.dataset.handling,
                kicking: card.dataset.kicking,
                reflexes: card.dataset.reflexes,
                speed: card.dataset.speed,
                positioning: card.dataset.positioning
            }
        } else {
            data = {
                name: card.dataset.name,
                position: card.dataset.position,
                rating: card.dataset.rating,
                flag: card.dataset.flag,
                logo: card.dataset.logo,
                photo: card.dataset.photo,
                pace: card.dataset.pace,
                shooting: card.dataset.shooting,
                passing: card.dataset.passing,
                dribbling: card.dataset.dribbling,
                defending: card.dataset.defending,
                physical: card.dataset.physical
            }  
        }

        ChangeStorage.push(data);

        localStorage.setItem('remplacant', JSON.stringify(ChangeStorage));
    }

    if (placeHolder.querySelector('[data-name]')) {
        return;
    } 

    spans.remove();

    let newElement;
    if(card.dataset.position == 'GK') {
        newElement = `
        <div data-name="${card.dataset.name}" data-rating="${card.dataset.rating}" data-photo="${card.dataset.photo}"  data-position="${card.dataset.position}" data-flag="${card.dataset.flag}" data-logo="${card.dataset.logo}" data-diving="${card.dataset.diving}" data-handling="${card.dataset.handling}" data-kicking="${card.dataset.kicking}" data-reflexes="${card.dataset.reflexes}" data-speed="${card.dataset.speed}" data-positioning="${card.dataset.positioning}" class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-black p-4" onclick="expandPlayer(this)">
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
    } else {
        newElement = `
        <div data-name="${card.dataset.name}" data-rating="${card.dataset.rating}" data-photo="${card.dataset.photo}"  data-position="${card.dataset.position}" data-flag="${card.dataset.flag}" data-logo="${card.dataset.logo}" data-pace="${card.dataset.pace}" data-shooting="${card.dataset.shooting}" data-passing="${card.dataset.passing}" data-dribbling="${card.dataset.dribble}" data-defending="${card.dataset.defense}" data-physical="${card.dataset.physique}" class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-black p-4" onclick="expandPlayer(this)">
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
    }


        placeHolder.innerHTML += newElement;

        document.getElementById('player').addEventListener('click', (event) => expandPlayer(event));
        document.getElementById('modal').classList.add('hidden');
}

function expandPlayer(element) {

    let playerDetails;

    if (element.dataset.position == 'GK') {
        playerDetails = `
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
                        <span class="font-bold">diving: </span>
                        <span>${element.dataset.diving || '00'}</span>
                    </div>
                    <div class="text-center">
                        <span class="font-bold">handling: </span>
                        <span>${element.dataset.handling || '00'}</span>
                    </div>
                    <div class="text-center">
                        <span class="font-bold">kicking: </span>
                        <span>${element.dataset.kicking || '00'}</span>
                    </div>
                    <div class="text-center">
                        <span class="font-bold">reflexes: </span>
                        <span>${element.dataset.reflexes || '00'}</span>
                    </div>
                    <div class="text-center">
                        <span class="font-bold">speed: </span>
                        <span>${element.dataset.speed || '00'}</span>
                    </div>
                    <div class="text-center">
                        <span class="font-bold">positioning: </span>
                        <span>${element.dataset.positioning || '00'}</span>
                    </div>
                </div>
                <div class="flex justify-around mt-4">
                    <button id="ChangePlayer" class="px-4 py-2 bg-yellow-500 text-white rounded">Change</button>
                    <button id="RemovePlayer" class="px-4 py-2 bg-red-500 text-white rounded">Remove</button>
                </div>
            </div>
        </div>`;
    } else {
        playerDetails = `
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
                        <span class="font-bold">pace: </span>
                        <span>${element.dataset.pace || '00'}</span>
                    </div>
                    <div class="text-center">
                        <span class="font-bold">shooting: </span>
                        <span>${element.dataset.shooting || '00'}</span>
                    </div>
                    <div class="text-center">
                        <span class="font-bold">passing: </span>
                        <span>${element.dataset.passing || '00'}</span>
                    </div>
                    <div class="text-center">
                        <span class="font-bold">dribble: </span>
                        <span>${element.dataset.dribbling || '00'}</span>
                    </div>
                    <div class="text-center">
                        <span class="font-bold">defense: </span>
                        <span>${element.dataset.defending || '00'}</span>
                    </div>
                    <div class="text-center">
                        <span class="font-bold">physique: </span>
                        <span>${element.dataset.physical || '00'}</span>
                    </div>
                </div>
                <div class="flex justify-around mt-4">
                    <button id="ChangePlayer" class="px-4 py-2 bg-yellow-500 text-white rounded">Change</button>
                    <button id="RemovePlayer" class="px-4 py-2 bg-red-500 text-white rounded">Remove</button>
                </div>
            </div>
        </div>`;
    }

    document.body.insertAdjacentHTML('beforeend', playerDetails);
    
    let placeholder = event.target.parentElement;

    document.getElementById('ChangePlayer').addEventListener('click',  (event) => changePlayers(event, placeholder));
    document.getElementById('RemovePlayer').addEventListener('click', (event) => removeFromTerrain(event, placeholder));

    document.getElementById('closeDetails').addEventListener('click', () => {
        document.getElementById('playerModal').remove();
    });
}


function removeFromTerrain(event, placeHolder) {
    document.getElementById('playerModal').remove();
    let cible = placeHolder.querySelector('[data-name]');

    let ChangeStorage = JSON.parse(localStorage.getItem('remplacant')) || [];
    let temp = [];

    ChangeStorage.forEach((player) => {
        if(player.name != cible.dataset.name) {
            temp.push(player);
        }
    });
    ChangeStorage = temp;


    localStorage.setItem('remplacant', JSON.stringify(ChangeStorage));

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
    let changeModal = document.getElementById('ChangeModal');
    let changeStorage = JSON.parse(localStorage.getItem('remplacant')) || [];

    let allPositions = ["ST", "LW", "RW", "CDM", "CM", "LB", "RB", "CB", "GK"];
    let placeInCard = [...placeHolder.classList];
    let availablePosition = placeInCard.filter(cls => allPositions.includes(cls));

    let changeBank = document.getElementById('ChangeBank');
    changeBank.innerHTML = '';

    let playerChange ;
    changeStorage.forEach((player) => {
        if(availablePosition.includes(player.position)) {
            if(player.position == 'GK') {
                playerChange  = `
                <div id="player" data-name="${player.name}"
                    data-rating="${player.rating}"
                    data-photo="${player.photo}"
                    data-position="${player.position}"
                    data-flag="${player.flag}"
                    data-logo="${player.logo}"
                    data-diving="${player.diving}"
                    data-handling="${player.handling}"
                    data-kicking="${player.kicking}"
                    data-reflexes="${player.reflexes}"
                    data-speed="${player.speed}"
                    data-positioning="${player.positioning}"  
                    class="w-44 h-72 bg-white rounded-lg shadow-md px-2 py-2 m-2 hover:scale-110 hover:duration-500 hover:shadow-lg hover:shadow-black">
                        <img src="${player.photo}" alt="Player Image" class="w-full h-32 playerect-cover rounded-t-lg">
                        <div class="p-2 space-y-1">
                            <p class="text-lg font-bold text-center name">${player.name}</p>
                            <div class="flex justify-evenly">
                                <span class="text-gray-600 text postion">${player.position}</span>
                                <span class="text-gray-600 rating">${player.rating}</span>
                                <img src="${player.flag}" alt="nation" width="20">
                                <img src="${player.logo}" alt="club" width="20">
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
                                <span class="text-gray-600 pace">${player.diving || '00'}</span>
                                <span class="text-gray-600 shooting">${player.handling || '00'}</span>
                                <span class="text-gray-600 passing">${player.kicking || '00'}</span>
                                <span class="text-gray-600 dribble">${player.reflexes || '00'}</span>
                                <span class="text-gray-600 defense">${player.speed || '00'}</span>
                                <span class="text-gray-600 physique">${player.positioning || '00'}</span>
                            </div>
                        </div>
                        <div class="bg-green-500 px-2 text-center text-white">
                            <button class="w-full selectToChange">Change</button>
                        </div>
                    </div>`;
            } else {
                playerChange = `
                <div id="player"
                    data-name="${player.name}"
                    data-rating="${player.rating}"
                    data-photo="${player.photo}"
                    data-position="${player.position}"
                    data-flag="${player.flag}"
                    data-logo="${player.logo}"
                    data-pace="${player.pace}"
                    data-shooting="${player.shooting}"
                    data-passing="${player.passing}"
                    data-dribble="${player.dribbling}"
                    data-defense="${player.defending}"
                    data-physique="${player.physique}"
                    class="w-44 h-72 bg-white rounded-lg shadow-md px-2 py-2 m-2 hover:scale-110 hover:duration-500 hover:shadow-lg hover:shadow-black">
                        <img src="${player.photo}" alt="Player Image" class="w-full h-32 playerect-cover rounded-t-lg">
                        <div class="p-2 space-y-1">
                            <p class="font-bold text-center name">${player.name}</p>
                            <div class="flex justify-evenly">
                                <span class="text-gray-600 text postion">${player.position}</span>
                                <span class="text-gray-600 rating">${player.rating}</span>
                                <img class="flag" src="${player.flag}" alt="nation" width="20">
                                <img class="logo" src="${player.logo}" alt="club" width="20">
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
                                <span class="text-gray-600 pace">${player.pace || '00'}</span>
                                <span class="text-gray-600 shooting">${player.shooting || '00'}</span>
                                <span class="text-gray-600 passing">${player.passing || '00'}</span>
                                <span class="text-gray-600 dribble">${player.dribbling || '00'}</span>
                                <span class="text-gray-600 defense">${player.defending || '00'}</span>
                                <span class="text-gray-600 physique">${player.physique || '00'}</span>
                            </div>
                        </div>
                        <div class="bg-green-500 px-2 text-center text-white">
                            <button class="w-full selectToChange">Change</button>
                        </div>
                    </div>`;
            }

            changeBank.innerHTML += playerChange;
        }
    });

    changeBank.addEventListener('click', (event) => {
        if (event.target.classList.contains('selectToChange')) {
            swapPlayer(event, placeHolder);
        }
    });

    changeModal.classList.remove('hidden');

    document.getElementById('closeChangeModal').addEventListener('click', () => {
        changeModal.classList.add('hidden');
    });
}

function swapPlayer(event, placeHolder) {
    console.log("Hello")
    let remplacantStorage = JSON.parse(localStorage.getItem('remplacant')) || [];
    let temp = [];
    let newPlayer = event.target.parentElement.parentElement;
    let OldPlayer = placeHolder.querySelector('[data-name]');

    let remplasantContainer = document.getElementById('remplace');
    let playerTarget = remplasantContainer.querySelector(`[data-name="${newPlayer.dataset.name}"]`);

    let parentOfOldPlayer = OldPlayer.parentElement;
    let parentOfTargetPlayer = playerTarget.parentElement;

    let cloneTarget = playerTarget.cloneNode(true);
    let cloneOld = OldPlayer.cloneNode(true);

    remplacantStorage.forEach((player) => {
        if(player.name == OldPlayer.dataset.name) {
            player.name = newPlayer.dataset.name;
            player.position = newPlayer.dataset.position;
            player.rating = newPlayer.dataset.rating;
            player.flag = newPlayer.dataset.flag;
            player.logo = newPlayer.dataset.logo;
            player.photo = newPlayer.dataset.photo;
            player.diving = newPlayer.dataset.diving;
            player.handling = newPlayer.dataset.handling;
            player.kicking = newPlayer.dataset.kicking;
            player.reflexes = newPlayer.dataset.reflexes;
            player.speed = newPlayer.dataset.speed;
            player.positioning = newPlayer.dataset.positioning;
        } else if (player.name == newPlayer.dataset.name) {
            player.name = OldPlayer.dataset.name;
            player.position = OldPlayer.dataset.position;
            player.rating = OldPlayer.dataset.rating;
            player.flag = OldPlayer.dataset.flag;
            player.logo = OldPlayer.dataset.logo;
            player.photo = OldPlayer.dataset.photo;
            player.pace = OldPlayer.dataset.pace;
            player.shooting = OldPlayer.dataset.shooting;
            player.passing = OldPlayer.dataset.passing;
            player.dribbling = OldPlayer.dataset.dribbling;
            player.defending = OldPlayer.dataset.defending;
            player.physical = OldPlayer.dataset.physical;
        }

        temp.push(player);
    });

    remplacantStorage = temp;

    localStorage.setItem('remplacant', JSON.stringify(remplacantStorage));

    parentOfOldPlayer.replaceChild(cloneTarget, OldPlayer);
    parentOfTargetPlayer.replaceChild(cloneOld, playerTarget);
}


document.getElementById('terrain').addEventListener('click', (event) => {
    let placeHolder = event.target.parentElement;
    if (!placeHolder.querySelector('[data-name]')) {
        addToTerrain(event);
    }
});

document.getElementById('remplace').addEventListener('click', (event) => {
    let placeHolder = event.target.parentElement;
    if (!placeHolder.querySelector('[data-name]')) {
        addToTerrain(event);
    }
});

window.addEventListener('load', () => {
    localStorage.removeItem('remplacant');
});