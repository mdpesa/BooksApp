{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
    },
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

  render();
}
