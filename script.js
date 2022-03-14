const bookSection = document.querySelector(".book-list");

const bookObjects = [
  {
    title: "Book1",
    author: "author1",
  },
  {
    title: "Book2",
    author: "author2",
  },
];

function createBook() {
  for (let i = 0; i < bookObjects.length; i += 1) {
    const bookContainer = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("h2");
    const deleteBtn = document.createElement("button");

    title.textContent = bookObjects[i].title;
    author.textContent = bookObjects[i].author;
    deleteBtn.textContent = "Delete";

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(deleteBtn);

    bookSection.appendChild(bookContainer);
  }
}

createBook();
