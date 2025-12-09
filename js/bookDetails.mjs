import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export function bookDetailsTemplate(book) {
    return `
    <section class="book-details">
        <div class="book-container">
            <img class="book-cover" src="${book.cover}" alt="${book.title}">

            <div class="book-info">
                <h1>${book.title}</h1>
                <p class="book-authors"><strong>Author(s):</strong> ${book.authors}</p>
                <p class="book-year"><strong>Published:</strong> ${book.year}</p>

                <h3>Description</h3>
                <p class="book-description">${book.description}</p>
            </div>
        </div>
        
        <div class="propose-book">
            <button id="proposeBook" data-id="${book.Id}">Propose Book</button>
        </div>
    </section>
    `; 
}

function animateProposeButton(btn) {
    btn.classList.add("button-shake");

    const originalText = btn.textContent;
    btn.textContent = "Added!";

    setTimeout(() => {
        btn.classList.remove("button-shake");
        btn.textContent = originalText;
    }, 1000);
}

export default class BookDetails {
    constructor(bookId, dataSource) {
        this.bookId = bookId;
        this.dataSource = dataSource;
        this.book = {};
    }

    async init() {

        const raw = await this.dataSource.findBookById(this.bookId);

        this.book = await this.prepareBookDetailsData(raw);

        this.renderBookDetails();

        document.getElementById("proposeBook")
            .addEventListener("click", (event) => {
                this.addBookToProposalsList();  

                animateProposeButton(event.currentTarget); 
            });
    }

    addBookToProposalsList() {
        const bookProposalsItems = getLocalStorage("so-proposals") || [];

        const bookProposalsItemsIds = bookProposalsItems.map(bookProposalsItem => bookProposalsItem.id);

        if (!bookProposalsItemsIds.includes(this.bookId)) {
            bookProposalsItems.push(this.book);
        } 
        
        setLocalStorage("so-proposals", bookProposalsItems);

    }

    renderBookDetails() {
        const container = document.querySelector("#bookDetails");
        container.innerHTML = bookDetailsTemplate(this.book);
        
    }   

    async prepareBookDetailsData(book) {
        const info = book.volumeInfo || {};
        const images = info.imageLinks || {};

        //Google Books Data
        let cover =
            images.thumbnail ||
            images.smallThumbnail ||
            null;

        let description = info.description || null;
        let authors = info.authors?.join(", ") || null;
        let year = info.publishedDate?.slice(0, 4) || null;

        // If there is no cover or description search in Open Library
        if (!cover || !description || !authors || !year) {
            const fallback = await this.dataSource.getOpenLibraryFallback(book);

            if (fallback) {
                if (!cover && fallback.cover) {
                    cover = fallback.cover;
                }
                if (!description && fallback.description) {
                    description = fallback.description;
                }
                if (!authors && fallback.author_name) {
                    authors = fallback.author_name.join(", ");
                }
                if (!year && fallback.first_publish_year) {
                    year = fallback.first_publish_year;
                }
            }
        }

        return {
            id: book.id,
            title: info.title || "Untitled",
            subtitle: info.subtitle || "",
            authors: authors || "Unknown author",
            year: year || "Unknown",
            cover: cover || "./images/no-cover.png",
            description: description || "No description available."
        };

    }
    


}

