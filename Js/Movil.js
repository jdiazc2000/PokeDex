const navtoogle = document.querySelector(".nav-toogle"),
    navmenu = document.querySelector(".nav-menu");
navtoogle.addEventListener("click", () => { navmenu.classList.toggle("nav-menu_visible"), navmenu.classList.contains("nav-menu_visible") ? document.getElementById("pokebola").style.animation = "none" : document.getElementById("pokebola").style.animation = "rotate 1.5s linear infinite" });