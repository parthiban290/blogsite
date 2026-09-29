const editor = document.querySelector(".editor-content");
const contentInput = document.querySelector("#content-input");

editor.addEventListener("input", () => {
    contentInput.value = editor.innerHTML;
});

const buttons = document.querySelectorAll(".post-type-btn");
const postTypeInput = document.querySelector("#post-type-input");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active")
        postTypeInput.value = button.value;
    });
});

const imageInput = document.querySelector("#cover-image-input");
const imagePreview = document.querySelector("#cover-preview");

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (file) {
        imagePreview.src = URL.createObjectURL(file);
        imagePreview.hidden = false;
    }

});