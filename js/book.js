import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import BookDetails from "./bookDetails.mjs";

const bookId = getParam("book");
const dataSource = new ExternalServices();
const bookDetails = new BookDetails(bookId, dataSource)

bookDetails.init();