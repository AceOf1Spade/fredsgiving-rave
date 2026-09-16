const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", function () {
    mobileMenu.classList.add("active");
});

closeMenu.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
});

const mobileLinks = document.querySelectorAll(".mobile-menu-links a");

mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
    });

});