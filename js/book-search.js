import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import BookList from "./bookList.mjs";

const query = getParam("query");

if (query) {
    const listElement = document.querySelector("#bookSearch");
    const dataSource = new ExternalServices();
    const bookList = new BookList(dataSource, listElement)


    bookList.search(query);
}
