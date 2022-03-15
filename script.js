window.addEventListener('DOMContentLoaded', () => {
  const bookSection = document.querySelector('.book-list');
  const bookTitle = document.querySelector('#title');
  const bookAuthor = document.querySelector('#author');
  const addBtn = document.querySelector('#submit');

  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }

  class Library {
    constructor() {
      this.library = JSON.parse(localStorage.getItem('book-collection')) || [];
    }
    addBook(bookTitle, bookAuthor) {
      const selectedBook = new Book(bookTitle.value, bookAuthor.value);
      this.library.push(selectedBook);
      this.createBook();
    }

    createBook() {
      bookSection.innerHTML = '';
      for (let i = 0; i < this.library.length; i += 1) {
        const bookContainer = document.createElement('div');
        const bookDescription = document.createElement('h2');
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'deletebtn');
        deleteBtn.setAttribute('data', i);

        bookDescription.textContent = `${this.library[i].title} by ${this.library[i].author}`;
        deleteBtn.textContent = 'Delete';

        bookContainer.appendChild(bookDescription);
        bookContainer.appendChild(deleteBtn);
        bookSection.appendChild(bookContainer);
      }
      this.deleteBook();
    }

    deleteBook() {
      [...document.querySelectorAll('.deletebtn')].map((element) => {
        const elementIndex = parseInt(element.getAttribute('data'), 10);
        element.addEventListener('click', () => {
          this.library.splice(elementIndex, 1);
          localStorage.setItem('book-collection', JSON.stringify(this.library));
          this.createBook();
        });
      });
    }
  }

  let myLibrary = new Library();

  myLibrary.createBook();

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (bookTitle.value === '' || bookAuthor.value === '') {
      return;
    }
    myLibrary.addBook(bookTitle, bookAuthor);
    localStorage.setItem('book-collection', JSON.stringify(myLibrary.library));
    bookTitle.value = '';
    bookAuthor.value = '';
  });
});
