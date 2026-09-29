const savedraft = document.querySelector(".savedraft");
const publishpost = document.querySelector(".publishpost");

const publishedGrid = document.querySelector(".published-grid");
const draftsGrid = document.querySelector(".drafts-grid");

savedraft.addEventListener("click", () => {
    publishedGrid.style.display = "none";
    draftsGrid.style.display = "grid";
    savedraft.classList.add("active")
    publishpost.classList.remove("active")
});

publishpost.addEventListener("click", () => {
    draftsGrid.style.display = "none";
    publishedGrid.style.display = "grid";
    savedraft.classList.remove("active")
    publishpost.classList.add("active")
});


const moreButtons = document.querySelectorAll(".more-action-btn");

moreButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const deletePost = button.nextElementSibling;
        deletePost.classList.toggle("show")
    });

});