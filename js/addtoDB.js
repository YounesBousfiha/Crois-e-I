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
                        <input class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" id="fullname" type="text" placeholder="FullName">
                    </div>
                    <div>
                        <input class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" id="photo" type="text" placeholder="photoURL">
                    </div>
                    <div>
                        <input class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="nationality">
                    </div>
                    <div>
                        <input class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="flag">
                    </div>
                    <div>
                        <input class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="club">
                    </div>
                    <div>
                        <input class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="logoURL">
                    </div>
                    <div>
                        <input class="px-2 rounded-lg border-2 w-96 h-16 text-2xl" type="text" placeholder="rating">
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

            document.getElementById('add').addEventListener('click', (event) => operations(event));
            document.getElementById('cancel').addEventListener('click', (event) => operations(event));

            let stats = document.getElementById('playerType');
            stats.addEventListener('change',  function () {
                let statsInputs = document.getElementById('stats-form');
                statsInputs.innerHTML = '';
                if(this.value == '1') {
                    statsInputs.innerHTML += `
                        <div class="grid grid-cols-2 w-96 place-items-center">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="pace">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="shooting">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="passing">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="dribbling">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="defending">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="physical">
                        </div>
                    `
                } else if (this.value == '2') {
                    statsInputs.innerHTML += `
                        <div class="grid grid-cols-2 w-96 place-items-center">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="diving">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="handling">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="kicking">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="reflexes">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="speed">
                            <input class="border-2 rounded-lg px-2 w-44  text-2xl" type="number" min="0" max="100" step="1" placeholder="positioning">
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
        // open localStorage
        // take information from the form
        // groupe the information inside an object
        // pass the object to createPlayerCard function
        // stat field take them from the form
        // save data into localStorage
        let data = {

        }
        createPlayerCard(data);
    }

    function createPlayerCard(obj) {
        // recoit player data
        // create the common element
        // fill element based on obj.position
    }

    function removePlayer(event) {}

    function clearInputs(event) {}

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