import { loadHeaderFooter, setActiveNavLink } from "./utils.mjs";

loadHeaderFooter(() => {

    setActiveNavLink();
    
    const searchInput = document.querySelector("#searchInput");
    const searchButton = document.querySelector("#searchBtn");

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const query = searchInput.value.trim();

            if (query) {
                window.location.href = `/book_search/index.html?query=${encodeURIComponent(query)}`;
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                searchButton.click();
            }
        });
    }
});
