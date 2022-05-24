window.addEventListener('DOMContentLoaded', () => {
    toggleMenu();
});

function toggleMenu(){
    document.querySelector(".burger_icon").addEventListener('click', (e) => {
        document.querySelector(".navigation").classList.toggle("active");
    });
}

