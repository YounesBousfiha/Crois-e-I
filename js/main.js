document.getElementById('burgerMenu').addEventListener('click', function() {
    let mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
});


let modal = document.getElementById('modal');
document.getElementById('closeModal').addEventListener('click', () => {
    modal.classList.add('hidden');
})