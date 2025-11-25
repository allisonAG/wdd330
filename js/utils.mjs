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
    const headerTemplate = await loadTemplate("../templates/header.html");
    const footerTemplate = await loadTemplate("../templates/footer.html");
    
    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");
    
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}
