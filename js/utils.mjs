export function renderWithTemplate(template, parentElement, clear = false) {
    if (clear) {
        parentElement.innerHTML = "";
    }

    parentElement.innerHTML = template;
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("/wdd330/templates/header.html");
    const footerTemplate = await loadTemplate("/wdd330/templates/footer.html");
    
    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");
    
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}


export function renderListWithTemplate(
    template,
    parentElement,
    list,
    position = "afterbegin",
    clear = false,
) {
    const htmlStrings = list.map(template);
    // if clear is true we need to clear out the contents of the parent.
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function formatGenre(genre) {
    return genre
        .replace(/-/g, " ") //replaces dashes with spaces
        .replace(/\b\w/g, c => c.toUpperCase()); //Capitalizes every word
}


export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const book = urlParams.get(param);
    return book;
}