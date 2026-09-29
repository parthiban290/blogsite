const filtertag = document.querySelectorAll(".filter-btn");
const articlecard = document.querySelectorAll(".article-card");

filtertag.forEach((button) => {

    button.addEventListener("click", () => {

        filtertag.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const select = button.dataset.type;

        articlecard.forEach((card) => {

            if (select === "all" || card.dataset.type === select) {
                card.style.display = "block";
            }
            else {
                card.style.display = "none";
            }

        });

    });

});