const filterButtons = document.querySelectorAll(".filter-btn");
const storyCards = document.querySelectorAll(".story-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        const selectedType = button.dataset.type;
        storyCards.forEach(card => {
            if (
                selectedType === "all" ||
                card.dataset.type === selectedType
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});


const moreButtons = document.querySelectorAll(".more-action-btn");

moreButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const deletePost = button.nextElementSibling;
        deletePost.classList.toggle("show")
    });

});