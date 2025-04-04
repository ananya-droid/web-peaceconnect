document.addEventListener("DOMContentLoaded", function () {
    const rights = document.querySelectorAll(".right");
    rights.forEach((right, index) => {
        right.addEventListener("mouseover", function () {
            this.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        });
        right.addEventListener("mouseout", function () {
            this.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        });
    });
});