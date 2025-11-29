import { renderListWithTemplate } from "./utils.mjs";

// Short description
function truncate(text, limit = 20) {
    return text.split(" ").slice(0, limit).join(" ") + "...";
}

export function bookCardTemplate(book) {
    const shortDescription = book.description ?
        truncate(book.description, 25) : "No description available.";

    return `
    <li class="book-card" data-id="${book.id}">
    <img src="${book.cover}" alt="${book.title}">
    <h2>${book.title || "Untitled"}</h2>
    <p>${shortDescription}</p>
    <a href="./book_pages/index.html?book=${book.id}">See more...</a>
    </li>
    `; 
}

export default class BookList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.books = [];
    }

    async init(genre = null) {
        let books;

        if (genre) {
            books = await this.dataSource.searchGoogleBooksByGenre(genre);
        } else {
            books = await this.dataSource.getAuthor();
        }

        //Remove duplicates
        books = this.removeDuplicatesByTitle(books);

        //Limit to 20 results
        books = books.slice(0, 20);

        this.books = books;
        this.renderList(this.books, true);
    }



    async renderList(list, clear = false) {
    // Convert every book in the book list using prepareBookData
        const processedBooks = [];
        for (let book of list) {
            const cleanBook = await this.prepareBookData(book);
            processedBooks.push(cleanBook);
        }

        renderListWithTemplate(bookCardTemplate, this.listElement, processedBooks, "afterbegin", clear);
    }   
    
    async prepareBookData(book) {
        const info = book.volumeInfo || {};
        const images = info.imageLinks || {};

        //Google Books Data
        const cover = images.thumbnail || images.smallThumbnail || null;
        
        let description = info.description || null;

        // If there is no cover or description search in Open Library
        if (!cover || !description) {
            const fallback = await this.dataSource.getOpenLibraryFallback(book);

            if (fallback) {
                if (!cover) cover = fallback.cover;
                if (!description) description = fallback.description;
            }
        }

        return {
            id: book.id,
            title: info.title || "Untitled",
            cover: cover || "./images/no-cover.png",
            description: description || "No description available."
        };

    }

    removeDuplicatesByTitle(books) {
        const unique = new Map();

        for (const book of books) {
            const title = (book.volumeInfo?.title || "").toLowerCase().trim();

            if (!unique.has(title)) {
                unique.set(title, book);
            }
        }

        return [...unique.values()];
    }
    

}


   


