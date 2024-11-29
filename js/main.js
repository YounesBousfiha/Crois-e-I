document.getElementById('burgerMenu').addEventListener('click', function() {
    let mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
});



let openModalButton = document.getElementById('terrain');
let playerPlaceholders = document.querySelectorAll('.player-placeholder');
let closeModalButton = document.getElementById('closeModal');
let modal = document.getElementById('modal');

playerPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });
});

closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});