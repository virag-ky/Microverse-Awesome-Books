import Book from './book.js';

window.addEventListener('DOMContentLoaded', () => {
  const bookSection = document.querySelector('.book-list');
  const bookTitle = document.querySelector('#title');
  const bookAuthor = document.querySelector('#author');
  const addBtn = document.querySelector('#submit');
  const navItems = Array.from(
    document.querySelectorAll('.navItems')[0].children
  );
  const bookList = document.querySelector('.book-list');
  const header = document.querySelector('.header');
  const newBook = document.querySelector('.add-new');
  const contact = document.querySelector('.contact-section');
  const siteDate = document.querySelector('#date');

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
        bookContainer.setAttribute('class', 'container');
        const bookDescription = document.createElement('h2');
        bookDescription.setAttribute('class', 'width');
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
      [...document.querySelectorAll('.deletebtn')].forEach((element) => {
        const elementIndex = parseInt(element.getAttribute('data'), 10);
        element.addEventListener('click', () => {
          this.library.splice(elementIndex, 1);
          localStorage.setItem('book-collection', JSON.stringify(this.library));
          this.createBook();
        });
      });
    }
  }

  const myLibrary = new Library();

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

  function navigate(key) {
    switch (key) {
      case 'list':
        bookList.classList.remove('hide');
        header.classList.remove('hide');
        newBook.classList.add('hide');
        contact.classList.add('hide');
        break;
      case 'add-new':
        bookList.classList.add('hide');
        header.classList.add('hide');
        newBook.classList.remove('hide');
        contact.classList.add('hide');
        break;
      case 'contact-section':
        bookList.classList.add('hide');
        header.classList.add('hide');
        newBook.classList.add('hide');
        contact.classList.remove('hide');
        break;
      default:
        break;
    }
  }

  function time() {
    const date = new Date();
    const locale = navigator.language;
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: 'false',
    };
    siteDate.textContent = `${date.toLocaleTimeString(locale, options)}`;
  }

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      navigate(e.target.parentElement.id);
    });
  });

  setInterval(time, 1000);
});

/* REMOVE COMMENT BEFORE SUBMITTING 
1.  I added new DOM elements on line 8-15
2. On Line 77-100 I created a function navigate that accepts a key argument 
(which should be the name of the class we wish to display), 
a switch case checks to see if it matches any of the classes and then hides 
every other section by adding the hide class (check the css file) to that class
3. on line 102-115 I created a time string of the current time with the Date object and then add it to date element on our HTML
4. line 117-122 the navigate function is added to all three element with a forEach loop, the argument pass to the function is gotten 
by checking the source of the event (the target), the parent of the target (the li elements) and then the id which has the same name as
the classes of the section. we then check for this names in the switch case in the navigate function
4. line 123, the time function only return the current time when ever it is called, so we need to call it everytime to update the time,
we do this with a setInterval function (which is a built in function), the first argument is a function we want to call, the second argument 1000
is the time interval in milliseconds, so the time function gets called every one second and the time gets updated as a result.

*/
