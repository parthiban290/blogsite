const text = document.querySelector(".form-textarea");
 const charcount = document.querySelector(".char-count")
text.addEventListener("input", () => {
    const count1 = text.value.trim()
    if(count1 === ""){
        return charcount.textContent = `0 / 100`;
    }
    const textcount = count.split(/\s+/)
    charcount.textContent = `${textcount.length} / 100`;
});