document.addEventListener('DOMContentLoaded' , function () {

    // TODO: Style de Error Message
    // TODO: Verification Complete d'application
    // TODO : Code CleaUP

    // TODO : Revision Global de Code Source
    // TODO: revision de Code HTML/CSS
    // TODO: Revision de DOM


    LoadFromLocalStorage();

    function LoadFromLocalStorage() {
        let data = JSON.parse(localStorage.getItem('playerDB')) || [];
        data.forEach((element) => {
            createPlayerCard(element);
        });
    }

    document.getElementById('sourceSelect').addEventListener('change', function() {
        let dynamicFields = document.getElementById('dynamicFields');
        dynamicFields.innerHTML = '';

        if (this.value == '1') {

            fetchFromAPI();

        } else if (this.value == '2') {

            fillViaFrom();
        }

        function fetchFromAPI() {
            let selectPlayer = document.createElement('select');
            let BtnContainer = document.createElement('div');
            let addDiv = document.createElement('div');
            let cancelDiv =  document.createElement('div');
            let ajouteBtn = document.createElement('button');
            let cancelBtn = document.createElement('button');

            selectPlayer.classList.add('px-5', 'py-1', 'rounded-lg', 'w-96', 'h-16', 'text-2xl');
            
            fetch("../js/players.json")
            .then(res => res.json())
            .then(data => {
                data.players.forEach((obj, index) => {
                    let tmpOption = document.createElement('option');
                    tmpOption.textContent = obj.name;
                    tmpOption.value = index + 1;
                    tmpOption.setAttribute('data-name', obj.name);
                    tmpOption.setAttribute('data-photo', obj.photo);
                    tmpOption.setAttribute('data-position', obj.position);
                    tmpOption.setAttribute('data-nationality', obj.nationality);
                    tmpOption.setAttribute('data-flag', obj.flag);
                    tmpOption.setAttribute('data-club', obj.club);
                    tmpOption.setAttribute('data-logo', obj.logo);
                    tmpOption.setAttribute('data-rating', obj.rating);

                    BtnContainer.classList.add('flex', 'justify-center');
                    ajouteBtn.classList.add('text-4xl', 'border-2', 'px-2', 'rounded-lg', 'text-white', 'bg-green-400', 'hover:bg-green-700', 'hover:duration-500');
                    ajouteBtn.id = "add";
                    cancelBtn.classList.add('text-4xl', 'border-2', 'px-2', 'rounded-lg', 'text-white', 'bg-red-400', 'hover:bg-red-700', 'hover:duration-500');
                    cancelBtn.id = "cancel";
                    ajouteBtn.textContent = "Ajouter";
                    cancelBtn.textContent = "Cancel";

                    addDiv.appendChild(ajouteBtn);
                    cancelDiv.appendChild(cancelBtn);

                    BtnContainer.appendChild(addDiv);
                    BtnContainer.appendChild(cancelBtn);
                    
                    if(obj.position == "GK") {
                        tmpOption.setAttribute('data-diving', obj.diving);
                        tmpOption.setAttribute('data-handling', obj.handling);
                        tmpOption.setAttribute('data-kicking', obj.kicking);
                        tmpOption.setAttribute('data-reflexes', obj.reflexes);
                        tmpOption.setAttribute('data-speed', obj.speed);
                        tmpOption.setAttribute('data-positioning', obj.positioning);
                    } else {
                        tmpOption.setAttribute('data-pace', obj.pace);
                        tmpOption.setAttribute('data-shooting', obj.shooting);
                        tmpOption.setAttribute('data-passing', obj.passing);
                        tmpOption.setAttribute('data-dribbling', obj.dribbling);
                        tmpOption.setAttribute('data-defending', obj.defending);
                        tmpOption.setAttribute('data-physical', obj.physical);
                    }
                    selectPlayer.appendChild(tmpOption);
                });
            });
            dynamicFields.appendChild(selectPlayer);
            dynamicFields.appendChild(BtnContainer);

            ajouteBtn.addEventListener('click', (event) => operations(event));
            cancelBtn.addEventListener('click', (event) => operations(event));
        }

        function fillViaFrom() {
            let formHTML = `
                <div class="grid grid-cols-2 overflow-auto h-96 max-md:flex max-md:flex-col max-sm:flex max-sm:flex-col">
                    <div class="flex flex-col">
                        <input id="name" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" id="fullname" type="text" placeholder="FullName">
                        <span id="ErrorName" class="hidden text-xl text-bold text-red-600">Error name</span>
                    </div>
                    <div class="flex flex-col">
                        <input id="photo" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" id="photo" type="url" placeholder="photoURL">
                        <span id="ErrorPhoto" class="hidden text-xl text-bold text-red-600">Error photo</span>
                    </div>
                    <div class="flex flex-col">
                        <input id="nationality" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="nationality">
                        <span id="ErrorNational" class="hidden text-xl text-bold text-red-600">Error Nationality</span>
                    </div>
                    <div class="flex flex-col">
                        <input id="flag" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="url" placeholder="flag" >
                        <span id="ErrorFlag" class="hidden text-xl text-bold text-red-600">Flag Error</span>
                    </div>
                    <div class="flex flex-col">
                        <input id="club" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="club" >
                        <span id="ErrorClub" class="hidden text-xl text-bold text-red-600">Club Error</span>
                    </div>
                    <div class="flex flex-col">
                        <input id="logo" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="url" placeholder="logoURL" >
                        <span id="ErrorLogo" class="hidden text-xl text-bold text-red-600">Logo Error</span>
                    </div>
                    <div class="flex flex-col">
                        <input id="rating" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="number" placeholder="rating" >
                        <span id="ErrorRating" class="hidden text-xl text-bold text-red-600">Enter a rating</span>
                    </div>
                    <div class="flex flex-col">
                        <select id="playerType" class="py-1 rounded-lg w-96 h-16 text-2xl">
                            <option value="0">Select Position</option>
                            <option value="1">Joueur</option>
                            <option value="2">Gardient</option>
                        </select>
                        <span id="ErrorSelect" class="hidden text-xl text-bold text-red-600">Choisir Un type</span>
                    </div>
                    <div id="stats-form" class="col-span-2 place-items-center">
                    </div>
                </div>

                <div class="flex justify-center items-center">
                        <div>
                            <button id="add" class="text-4xl border-2 px-2 rounded-lg text-white bg-green-400 hover:bg-green-700 hover:duration-500" type="submit" >Ajouter</button>
                        </div>
                        <div>
                            <button id="cancel" class="text-4xl border-2 px-2 rounded-lg text-white bg-red-400 hover:bg-red-700 hover:duration-500" type="submit" >Cancel</button>
                        </div>
                    </div>`;
            dynamicFields.innerHTML = formHTML;

            document.getElementById('add').addEventListener('click', (event) => {
                event.preventDefault();
                operations(event);
            });
            document.getElementById('cancel').addEventListener('click', (event) => operations(event));

            let stats = document.getElementById('playerType');
            stats.addEventListener('change',  function () {
                let statsInputs = document.getElementById('stats-form');
                statsInputs.innerHTML = '';
                if(this.value == '1') {
                    statsInputs.innerHTML += `
                        <div class="grid grid-cols-2 w-96 place-items-center">
                            <div class="col-span-2">
                                <label><input id="position" type="radio" name="position" value="CB" checked> CB</label>
                                <label><input id="position" type="radio" name="position" value="LB"> LB</label>
                                <label><input id="position" type="radio" name="position" value="RB"> RB</label>
                                <label><input id="position" type="radio" name="position" value="CM"> CM</label>
                                <label><input id="position" type="radio" name="position" value="CDM"> CDM</label>
                                <label><input id="position" type="radio" name="position" value="LW"> LW</label>
                                <label><input id="position" type="radio" name="position" value="RW"> RW</label>
                                <label><input id="position" type="radio" name="position" value="ST"> ST</label>
                            </div>
                            <input id="pace" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="pace">
                            <input id="shooting" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="shooting">
                            <input id="passing" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="passing">
                            <input id="dribbling" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="dribbling">
                            <input id="defending" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="defending">
                            <input id="physical" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="physical">
                            <span id="stats" class="text-center hidden text-xl text-bold text-red-600">remplir les stats</span>
                        </div>
                    `
                } else if (this.value == '2') {
                    statsInputs.innerHTML += `
                        <div class="grid grid-cols-2 w-96 place-items-center">
                            <input id="diving" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="diving">
                            <input id="handling" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="handling">
                            <input id="kicking" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="kicking">
                            <input id="reflexes" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="reflexes">
                            <input id="speed" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="speed">
                            <input id="positioning" name="stats" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="99" step="1" placeholder="positioning">
                            <span id="stats" class="hidden text-xl text-bold text-red-600">remplir les stats</span>
                        </div>
                    `
                }             
            });

        }
    });


    function operations(event) {
        let operation = event.target
        if(operation.id == 'add') {
            ajouteNewPlayer(event);
        } else if ( operation.id == 'cancel') {
            clearInputs(event)
        }
    }

    function ajouteNewPlayer(event) {
        let formtype = document.getElementById('sourceSelect').value;
        let storage = JSON.parse(localStorage.getItem('playerDB')) || [];
        let form = event.target.parentElement.parentElement.parentElement;
        let data = {};
        let status = true;

        let ExistsPlayer = [];

        storage.forEach((player) => {
            ExistsPlayer.push(player.name);
        })
        if (formtype == '1') {
            let player =  form.querySelector('option:checked');
            data.name = player.dataset.name;
            data.photo = player.dataset.photo;
            data.flag = player.dataset.flag;
            data.club = player.dataset.club;
            data.logo = player.dataset.logo;
            data.rating = player.dataset.rating;
            if (player.dataset.position == 'GK') {
                data.diving =  player.dataset.diving;
                data.handling = player.dataset.handling;
                data.kicking = player.dataset.kicking;
                data.reflexes = player.dataset.reflexes;
                data.speed = player.dataset.speed;
                data.positioning = player.dataset.positioning;
            } else {
                data.pace = player.dataset.pace;
                data.shooting = player.dataset.shooting;
                data.passing = player.dataset.passing;
                data.dribbling = player.dataset.dribbling;
                data.defending = player.dataset.defending;
                data.physical = player.dataset.physical;
            }
            data.position = player.dataset.position;
        }

        if(formtype == '2') {
            let inputs = form.querySelectorAll('input[type="text"], input[type="url"], input[type="number"], input:checked');
            inputs.forEach((input) => {
                data[input.id] = input.value;
            });

            status = formValidation(data);
        }
        
        if(status) {
            if(!ExistsPlayer.includes(data.name)) {
                storage.push(data);
                localStorage.setItem('playerDB', JSON.stringify(storage));
                createPlayerCard(data);
                document.getElementById('modal').classList.add('hidden');
            }
        }
    }

    function createPlayerCard(obj) {
        let playercontainer = document.getElementById('playerContainer');
        let newCard;
        if (obj.position == 'GK') {
            newCard = `
            <div class="w-44 h-72 bg-white rounded-lg shadow-md px-2 py-2 m-2 hover:scale-110 hover:duration-500 hover:shadow-lg hover:shadow-black">
                <button id="remove" class="text-end text-2xl h-1 remove">&times</button>
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
            </div>
        `;
        } else {
            newCard = `
            <div class="w-44 h-72 bg-white rounded-lg shadow-md px-2 py-2 m-2 hover:scale-110 hover:duration-500 hover:shadow-lg hover:shadow-black">
                <button id="remove" class="text-end text-2xl h-1 remove">&times</button>
                <img src="${obj.photo}" alt="Player Image" class="w-full h-32 object-cover rounded-t-lg">
                <div class="p-2 space-y-1">
                    <p class="font-bold text-center name">${obj.name}</p>
                    <div class="flex justify-evenly">
                        <span class="text-gray-600 text postion">${obj.position}</span>
                        <span class="text-gray-600 rating">${obj.rating}</span>
                        <img src="${obj.flag}" alt="nation" width="20">
                        <img src="${obj.logo}" alt="club" width="20">
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
            </div>
        `;
        }
        playercontainer.insertAdjacentHTML('afterbegin', newCard);
    
    }

    document.getElementById('playerContainer').addEventListener('click', function(event) {
        if (event.target.classList.contains('remove')) {
            removePlayer(event);
        }
    });


    function formValidation(data) {
        let status = true;
        let AlphabetPattern = /^[a-zA-Z\s]+$/;
        let URLPattern = /^(https?:\/\/.*\.(?:png|jpg|webp))$/i;
        let numbersPattern = /^\d{2}$/;

        if (!AlphabetPattern.test(data.name)) {
            status = false;
            document.getElementById('ErrorName').classList.remove('hidden');
        } else {
            document.getElementById('ErrorName').classList.add('hidden');
        }
        console.log(data.photo);
        console.log(URLPattern.test(data.photo));
        if (!URLPattern.test(data.photo)) {
            status = false;
            document.getElementById('ErrorPhoto').classList.remove('hidden');
        } else {
            document.getElementById('ErrorPhoto').classList.add('hidden');
        }

        if (!AlphabetPattern.test(data.nationality)) {
            status = false;
            document.getElementById('ErrorNational').classList.remove('hidden');
        } else {
            document.getElementById('ErrorNational').classList.add('hidden');
        }

        if (!URLPattern.test(data.flag)) {
            status = false;
            document.getElementById('ErrorFlag').classList.remove('hidden');
        } else {
            document.getElementById('ErrorFlag').classList.add('hidden');
        }

        if (!AlphabetPattern.test(data.club)) {
            status = false;
            document.getElementById('ErrorClub').classList.remove('hidden');
        } else {
            document.getElementById('ErrorClub').classList.add('hidden');
        }

        if (!URLPattern.test(data.logo)) {
            status = false;
            document.getElementById('ErrorLogo').classList.remove('hidden');
        } else {
            document.getElementById('ErrorLogo').classList.add('hidden');
        }

        if (!numbersPattern.test(data.rating)) {
            status = false;
            document.getElementById('ErrorRating').classList.remove('hidden');
        } else {
            document.getElementById('ErrorRating').classList.add('hidden');
        }

        if(document.getElementById('playerType').value == '0') {
            status = false;
            document.getElementById('ErrorSelect').classList.remove('hidden');
        } else {
            document.getElementById('ErrorSelect').classList.add('hidden');
        }

        let stats = document.querySelectorAll('[name="stats"]');
        stats.forEach((stat) => {
            let num = parseInt(stat.value);
            if(!numbersPattern.test(num)) {
                status = false;
                document.getElementById('stats').classList.remove('hidden');
            } else {
                document.getElementById('stats').classList.add('hidden');
            }
        });

        return status;
    }

    function removePlayer(event) {
        let storage = JSON.parse(localStorage.getItem('playerDB')) || []
        let tmp = []
        let item = event.target.parentElement;
        let itemName = item.querySelector('.name').textContent;

        storage.forEach((element) => {
            if(element.name != itemName) {
                tmp.push(element);
            }
        });

        storage = tmp;

        if(item) {
            item.remove();
        } else {
            alert('no card Exist!');
        }

        localStorage.setItem('playerDB', JSON.stringify(storage));
    }

    function clearInputs() {
        let selectChoices = modal.querySelector('#sourceSelect');
        selectChoices.selectedIndex = 0;
        dynamicFields.innerHTML = '';
        modal.classList.add('hidden');
    }

    document.getElementById('addNewPlayer').addEventListener('click', (event) => {
        let modal = document.getElementById('modal');

        modal.classList.remove('hidden');

        window.onclick =  (event) => {
            if(event.target == modal) {
                let selectChoices = modal.querySelector('#sourceSelect');
                selectChoices.selectedIndex = 0;
                dynamicFields.innerHTML = '';
                modal.classList.add('hidden');
            }
        }
    });
})