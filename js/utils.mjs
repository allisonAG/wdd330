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

export async function loadHeaderFooter(callback) {
    const headerTemplate = await loadTemplate("/wdd330/templates/header.html");
    const footerTemplate = await loadTemplate("/wdd330/templates/footer.html");
    
    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");
    
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

    if (callback) {
        callback();
    }
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

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Active Page
export function setActiveNavLink() {
    const currentPath = window.location.pathname;

    document.querySelectorAll("nav a").forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") && currentPath.endsWith(link.getAttribute("href"))) {
            link.classList.add("active");
        }
    });
}