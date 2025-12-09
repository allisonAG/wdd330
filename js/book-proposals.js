import { setLocalStorage, getLocalStorage } from "./utils.mjs"
import { truncate } from "./bookList.mjs";

function proposalsBookTemplate(book) {
    const shortDescription = book.description ?
        truncate(book.description, 25) : "No description available.";

    return `
    <li class="book-card" data-id="${book.id}">
    <span class="remove-button" title="Remove proposal" data-id=${book.id}>&#10005;</span>
    <img src="${book.cover}" alt="${book.title}">
    <h2>${book.title || "Untitled"}</h2>
    <p>${shortDescription}</p>
    <a href="/book_pages/index.html?book=${book.id}">See more...</a>
    <p class="votes">Votes: ${book.votes || 0}</p>
    <div class="vote-book">
        <button class="vote_book" data-id="${book.id}">Vote</button>
    </div>
    </li>
    `;
}

function renderProposals() {
    const proposals = getLocalStorage("so-proposals") || [];

    const bookList = document.querySelector("#bookProposals");

    if (proposals.length === 0) {
        bookList.innerHTML = `<li>You don't have any books on list.</li>`;
    } else {
        const htmlBooks = proposals.map((book) => proposalsBookTemplate(book));
        bookList.innerHTML = htmlBooks.join("");
    }

    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => addRemoveListener(button));

    const voteButtons = document.querySelectorAll(".vote_book");
    voteButtons.forEach((button) => addVoteListener(button));
}

function addRemoveListener(buttonElement) {
    buttonElement.addEventListener("click", () => {
        const deletedBookId = buttonElement.getAttribute("data-id");

        const proposals = getLocalStorage("so-proposals") || [];
        const deleteIndex = proposals.findIndex((element) => element.id === deletedBookId);

        proposals.splice(deleteIndex, 1);
        setLocalStorage("so-proposals", proposals);

        renderProposals();

    })
}

function addVoteListener(vote_button) {
    
    vote_button.addEventListener("click", () => {

        const thisBookId = vote_button.getAttribute("data-id");
        
        const proposals = getLocalStorage("so-proposals") || [];

        const proposedBook = proposals.find((book) => book.id === thisBookId);

        if (!proposedBook.votes) {
            Object.assign(proposedBook, { votes: 0 });
        }

        proposedBook.votes++;
        
        setLocalStorage("so-proposals", proposals);

        renderProposals();

    });
}

renderProposals();