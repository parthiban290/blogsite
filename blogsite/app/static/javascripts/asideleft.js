const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {

    if (item.pathname === window.location.pathname) {
        item.classList.add("active");
    }
    else{
        item.classList.remove("active")
    }

});