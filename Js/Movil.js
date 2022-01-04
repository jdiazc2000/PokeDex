//Nav Variables//
const navtoogle = document.querySelector(".nav-toogle");
const navmenu = document.querySelector(".nav-menu");

//Nav Function
navtoogle.addEventListener("click", () =>{
    navmenu.classList.toggle("nav-menu_visible");
    if (navmenu.classList.contains("nav-menu_visible")) {
        document.getElementById('pokebola').style.animation = 'none'
    } else {
        document.getElementById('pokebola').style.animation = 'rotate 1.5s linear infinite'  
    }
})



