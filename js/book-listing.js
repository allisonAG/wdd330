import { loadHeaderFooter, formatGenre, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import BookList from "./bookList.mjs";

//Dynamic Title
const genre = getParam("genre");
const titleElement = document.querySelector("#categoryTitle");
titleElement.textContent = `${formatGenre(genre)} Books`;

const listElement = document.querySelector("#bookList");
const dataSource = new ExternalServices();
const bookList = new BookList(dataSource, listElement)



bookList.init(genre);

loadHeaderFooter();