
async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: "servicesError", message: jsonResponse };
    }
}

export default class ExternalServices {
    constructor() {
        this.googleApi = "https://www.googleapis.com/books/v1/volumes";
        this.openLibraryApi = "https://openlibrary.org";
    }

    
    //GOOGLE BOOKS

    // Search by genre
    async searchGoogleBooksByGenre(genre, limit = 20) {
        const url = `${this.googleApi}?q=subject:${encodeURIComponent(genre)}&maxResults=${limit}&langRestrict=en`;
        const response = await fetch(url);
        const data = await convertToJson(response);

        return data.items || [];
    }

    // New Releases
    async getAuthor(limit = 12) {
        const url = `${this.googleApi}?q=inauthor:Stephen King&maxResults=${limit}`;
        const response = await fetch(url);
        const data = await convertToJson(response);

        return data.items || [];
    }

    // Find book by ID
    async findBookById(id) {
        const url = `${this.googleApi}/${id}`;
        const response = await fetch(url);
        const data = await convertToJson(response);

        return data;
    }

    //OPEN lIBRARY 
    async getFromOpenLibraryByTitle(title) {
        
        // Make petition to Open Library
        const url = `${this.openLibraryApi}/search.json?title=${encodeURIComponent(title)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) return null;
            
            const data = await response.json();
            if (!data.docs || data.docs.length === 0) return null;

            const book = data.docs[0];  

            // Cover
            let cover = null;
            if (book.cover_i) {
                cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
            }

            // Description
            const description = book.first_sentence || null;

            return {
                cover,
                description,
            };
        } catch (err) {
            console.error("Error fetching Open Library:", err);
            return null;
        }
    }

    async getOpenLibraryFallback(book) {
        const info = book.volumeInfo;
        if (!info || !info.title) return null;

        return await this.getFromOpenLibraryByTitle(info.title);
    }


}