document.addEventListener('DOMContentLoaded' , function () {
    let addBtn = document.getElementById('addNewPlayer');

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
                <div class="space-y-3 flex flex-col items-center">
                    <div>
                        <input id="name" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" id="fullname" type="text" placeholder="FullName">
                    </div>
                    <div>
                        <input id="photo" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" id="photo" type="text" placeholder="photoURL">
                    </div>
                    <div>
                        <input id="nationality" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="nationality">
                    </div>
                    <div>
                        <input id="flag" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="flag">
                    </div>
                    <div>
                        <input id="club" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="club">
                    </div>
                    <div>
                        <input id="logo" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="logoURL">
                    </div>
                    <div>
                        <input id="rating" class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="rating">
                    </div>
                    <div>
                        <select id="playerType" class="py-1 rounded-lg w-96 h-16 text-2xl">
                            <option value="0">Select Position</option>
                            <option value="1">Joueur</option>
                            <option value="2">Gardient</option>
                        </select>
                    </div>
                    <div id="stats-form">
                    </div>

                    <div class="flex">
                        <div>
                            <button id="add" class="text-4xl border-2 px-2 rounded-lg text-white bg-green-400 hover:bg-green-700 hover:duration-500" type="submit" >Ajouter</button>
                        </div>
                        <div>
                            <button id="cancel" class="text-4xl border-2 px-2 rounded-lg text-white bg-red-400 hover:bg-red-700 hover:duration-500" type="submit" >Cancel</button>
                        </div>
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
                                <label><input id="CB" type="radio" name="position" value="CB"> CB</label>
                                <label><input id="LB" type="radio" name="position" value="LB"> LB</label>
                                <label><input id="RB" type="radio" name="position" value="RB"> RB</label>
                                <label><input id="CM" type="radio" name="position" value="CM"> CM</label>
                                <label><input id="CDM" type="radio" name="position" value="CDM"> CDM</label>
                                <label><input id="LW" type="radio" name="position" value="LW"> LW</label>
                                <label><input id="RW" type="radio" name="position" value="RW"> RW</label>
                                <label><input id="ST" type="radio" name="position" value="ST"> ST</label>
                            </div>
                            <input id="pace" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="pace">
                            <input id="shooting" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="shooting">
                            <input id="passing" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="passing">
                            <input id="dribbling" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="dribbling">
                            <input id="defending" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="defending">
                            <input id="physical" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="physical">
                        </div>
                    `
                } else if (this.value == '2') {
                    statsInputs.innerHTML += `
                        <div class="grid grid-cols-2 w-96 place-items-center">
                            <input id="diving" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="diving">
                            <input id="handling" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="handling">
                            <input id="kicking" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="kicking">
                            <input id="reflexes" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="reflexes">
                            <input id="speed" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="speed">
                            <input id="positioning" class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="positioning">
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
        let storage = JSON.parse(localStorage.getItem('palyers')) || [];
        let form = event.target.parentElement.parentElement.parentElement;
        let data = {}

        if (formtype == '1') {
            let player =  form.querySelector('option:checked');
            data.name = player.dataset.name;
            data.photo = player.dataset.photo;
            data.nationality = player.dataset.nationality;
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
            let inputs = form.querySelectorAll('input[type="text"], input[type="number"], input:checked');
            inputs.forEach((input) => {
                data[input.id] = input.value;
            });

            console.log(data);
        }
        storage.push(data);
        localStorage.setItem('palyers', JSON.stringify(storage));
        createPlayerCard(data);
    }

    function createPlayerCard(obj) {
        // recoit player data
        // create the common element
        // fill element based on obj.position
    }

    function removePlayer(event) {}

    function clearInputs(event) {
        console.log('canceled!');
    }

    /*addBtn.addEventListener('click', () => {
        let playerContainer = document.getElementById('playerContainer');




        // call a function show form
        // select player from API or Fill Form for new One
        // take on consideration the state of Player & Goal Keeper
        // inside that function call a validation form
        // return Object Contain all the validated Data
        // place all the element inside the Card
        let tempdiv = addBtn.cloneNode(true);
        console.log(tempdiv);

        playerContainer.insertAdjacentElement('beforebegin', tempdiv);
    });*/

    document.getElementById('addNewPlayer').addEventListener('click', (event) => {
        let modal = document.getElementById('modal');

        modal.classList.remove('hidden');

        window.onclick =  (event) => {
            if(event.target == modal) {
                modal.classList.add('hidden');
            }
        }
    });
})