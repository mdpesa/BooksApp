/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
    },

    book: {
      image: '.books-list .book__image',
    },
  };

  const classFav = {
    favorite: 'favorite',
  };

  const templates = {
    books: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    ),
  };

  const render = function () {
    for (const book of dataSource.books) {
      /* generate HTML based on template */
      const generatedHTML = templates.books(book);
      /* create DOM element using utils.createElementFromHTML */
      const generateDOMElement = utils.createDOMFromHTML(generatedHTML);
      /* find books container */
      const booksContainer = document.querySelector(
        select.containerOf.booksList
      );
      /* add DOM element to booksList */
      booksContainer.appendChild(generateDOMElement);
    }
  };

  const favoriteBooks = [];

  function initActions() {
    const bookList = document.querySelectorAll(select.book.image);

    for (let book of bookList) {
      //add event listener
      book.addEventListener('dblclick', function (event) {
        //prevent default action
        event.preventDefault();
        //add .favorite
        book.classList.add(classFav.favorite);
        // get book attribute from data-id
        const bookId = book.getAttribute('data-id');
        //add book to array
        favoriteBooks.push(bookId);
      });
    }
  }

  render();
  initActions();
}
