import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import BookList from "./bookList.mjs";

const genreButtons = document.querySelectorAll("#genreButtons button");

genreButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const genre = btn.dataset.genre;
        window.location.href = `/books/index.html?genre=${genre}`;
    });
});

// New Releases
const listElement = document.querySelector("#releasesList");
const dataSource = new ExternalServices();
const bookList = new BookList(dataSource, listElement)



bookList.init();
loadHeaderFooter();