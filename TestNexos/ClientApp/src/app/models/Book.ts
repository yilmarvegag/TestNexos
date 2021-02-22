import { Author } from "./Author";
import { Publisher } from "./Publisher";

export class Book {
  id: number;
  year: string;
  title: string;
  gender: string;
  numberOfPages: string;
  publisher: Publisher;
  author: Author;
}
