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
    const bookList = document.querySelector(select.containerOf.booksList);
    // addEventListener to bookList
    bookList.addEventListener('dblclick', function (event) {
      //prevent default action
      event.preventDefault();
      const clickOnBook = event.target;
      if (clickOnBook.offsetParent.classList.contains('book__image')) {
        const bookId = clickOnBook.offsetParent.getAttribute('data-id');
        //check... if array doesn't contains bookId...
        if (!favoriteBooks.includes(bookId)) {
          //add class 'favorite'...
          clickOnBook.offsetParent.classList.add(classFav.favorite);
          //...and add bookId to favoriteBooks array
          favoriteBooks.push(bookId);
          //..else it already contains
        } else {
          //remove class 'favorite'...
          clickOnBook.offsetParent.classList.remove(classFav.favorite);
          //..and remove bookID from array favoriteBooks
          const bookIndex = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(bookIndex, 1);
        }
      }
    });
  }

  render();
  initActions();
}
