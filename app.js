let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, readBookOrNo(read));

  myLibrary.push(newBook)
}

function readBookOrNo(read) {
  if (read === true)
  {
    return 'Yes';
  }
  else
  {
    return 'No';
  }
}

const bookContainer = document.querySelector('.grid-container');

function displayBook() {
  let newCard = document.createElement('div');
  newCard.classList = 'book-card';

  bookContainer.appendChild(newCard);
  let card = document.querySelector('.book-card:last-child');

  let titleElement = document.createElement('h1');
  titleElement.classList = 'book-title';
  titleElement.textContent = myLibrary[myLibrary.length - 1].title;

  let authorElement = document.createElement('h2');
  authorElement.classList = 'book-author';
  authorElement.textContent = "by " + myLibrary[myLibrary.length - 1].author;

  let pagesElement = document.createElement('p');
  pagesElement.classList = 'book-pages';
  pagesElement.textContent = "Pages: " + myLibrary[myLibrary.length - 1].pages;

  let readElement = document.createElement('p');
  readElement.classList = 'book-read-status';
  readElement.textContent = "Read: " + myLibrary[myLibrary.length - 1].read;

  let removeBookBtn = document.createElement('button');
  removeBookBtn.classList = 'book-btn remove-book-btn';
  removeBookBtn.textContent = 'Delete';

  let changeReadBtn = document.createElement('button');
  changeReadBtn.classList = 'book-btn change-read-btn';
  changeReadBtn.textContent = 'Change Read Status';



  card.append(titleElement, authorElement, pagesElement, readElement, removeBookBtn, changeReadBtn);
}

function clearModule(title, author, page, read) {
  title.value = '';
  author.value = '';
  page.value = '';
  read.checked = false;
}

function removeBook() {
  const deleteButton = document.querySelectorAll('.book-btn.remove-book-btn');
  deleteButton.forEach(button => {
    button.addEventListener("click", () => {
    let currentBookTitle = button.parentNode.firstChild;
    searchBookArray(currentBookTitle.textContent)
    removeBookDisplay(currentBookTitle);
    })
  });
}

function searchBookArray(currentBook) {
  for (let i = 0; i < myLibrary.length; i++)
  {
    if (myLibrary[i].title == currentBook)
    {
      myLibrary.splice(i, 1);
    }
  }
}

function removeBookDisplay(currentBook) {
  parentElement = currentBook.parentNode;

  parentElement.innerHTML = '';
  parentElement.remove();
}

function addClickChangeRead() {
  const changeRead = document.querySelectorAll('.book-btn.change-read-btn');

  changeRead.forEach(button => {
    button.addEventListener("click", () => {
      let readElement = button.previousElementSibling.previousElementSibling;

      if (readElement.textContent == 'Read: Yes') {
        readElement.textContent = 'Read: No';
      }
      else {
        readElement.textContent = 'Read: Yes';
      }
      console.log(readElement);
    })
  });
}


const addBookBtn = document.querySelector('.add-book-btn');
const exitBookBtn = document.querySelector('.exit-module-btn');
const bookModule = document.querySelector('.newbook-module');
const submitBtn = document.querySelector('.submit-module-btn');
const filterBtn = document.querySelector('.filter-button');
const filterDropdown = document.querySelector('.filter-items');


submitBtn.addEventListener("click", () => {
  const title = document.querySelector('#title-input');
  const author = document.querySelector('#author-input');
  const pageNumber = document.querySelector('#page-input');
  const readStatus = document.querySelector('#read-status');
  addBookToLibrary(title.value, author.value, pageNumber.value, readStatus.checked);
  clearModule(title, author, pageNumber, readStatus);
  bookModule.classList.add("hidden-display");
  displayBook();
  removeBook();
  addClickChangeRead();
});

addBookBtn.addEventListener("click", () => {
  bookModule.classList.remove("hidden-display");
});

exitBookBtn.addEventListener("click", () => {
  bookModule.classList.add("hidden-display");
});

filterBtn.addEventListener("click", () => {
  filterDropdown.classList.add('show-dropdown');
});

window.onclick = function(event) {
  if (!event.target.matches('.filter-button')) {
    if (filterDropdown.classList.contains('show-dropdown'))
    {
      filterDropdown.classList.remove('show-dropdown');
    }
  }
};


