const bookSection = document.querySelector(".book-list");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const addBtn = document.querySelector("#submit");

const bookObjects = JSON.parse(localStorage.getItem("book-collection")) || [];

function createBook() {
  bookSection.innerHTML = "";
  for (let i = 0; i < bookObjects.length; i += 1) {
    const bookContainer = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("h2");
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "deletebtn");
    deleteBtn.setAttribute("data", i);

    title.textContent = bookObjects[i].title;
    author.textContent = bookObjects[i].author;
    deleteBtn.textContent = "Delete";

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(deleteBtn);
    bookSection.appendChild(bookContainer);
  }
  deleteBook();
}

createBook();

function addBook(bookTitle, bookAuthor) {
  let obj = {};
  obj.title = bookTitle.value;
  obj.author = bookAuthor.value;
  bookObjects.push(obj);
  createBook();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (bookTitle.value === "" || bookAuthor.value === "") {
    return;
  }
  addBook(bookTitle, bookAuthor);
  localStorage.setItem("book-collection", JSON.stringify(bookObjects));
});

function deleteBook() {
  [...document.querySelectorAll(".deletebtn")].map((element) => {
    const elementIndex = parseInt(element.getAttribute("data"));
    element.addEventListener("click", () => {
      bookObjects.splice(elementIndex, 1);
      localStorage.setItem("book-collection", JSON.stringify(bookObjects));
      createBook();
    });
  });
}
