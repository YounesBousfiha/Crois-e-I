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
            selectPlayer.classList.add('px-5', 'py-1', 'rounded-lg', 'w-96', 'h-16', 'text-2xl');
    
            fetch("./js/players.json")
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
                </div>`;
            dynamicFields.innerHTML = formHTML;

            let stats = document.getElementById('playerType');
            stats.addEventListener('change',  function () {
                let statsInputs = document.getElementById('stats-form');
                statsInputs.innerHTML = '';
                if(this.value == '1') {
                    statsInputs.innerHTML += `
                        <div class="grid grid-cols-2 w-96 place-items-center">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="pace">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="shooting">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="passing">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="dribbling">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="defending">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="physical">
                        </div>
                    `
                } else if (this.value == '2') {
                    statsInputs.innerHTML += `
                        <div class="grid grid-cols-2 w-96 place-items-center">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="diving">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="handling">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="kicking">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="reflexes">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="speed">
                            <input class="border-2 rounded-lg px-2 w-36  text-2xl" type="number" min="0" max="100" step="1" placeholder="positioning">
                        </div>
                    `
                }

                
            })

        }

    });

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

})