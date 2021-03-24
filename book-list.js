/*1. Consider the following books as the default items of the book list:
JavaScript: The Good Parts | Douglas Crockford | unread
You Don’t Know JS | Kyle Simpson | read
JavaScript for Kids: A Playful Introduction to Programming | Nick Morgan | read*/

var books = [
	{
		title: 'JavaScript: The Good Parts',
		author: 'Douglas Crockford',
		isRead: false,
	},

	{ title: 'You Don’t Know JS', author: 'Kyle Simpson', isRead: true },

	{ title: 'JavaScript for Kids: A Playful Introduction to Programming', author: 'Nick Morgan', isRead: true },
];

//2. Display the default book list

window.addEventListener('load', function () {
	var bookListSection = document.getElementById('bookList');
	var bookList = document.createElement('ul');

	bookListSection.appendChild(bookList);

	for (var i = 0; i < books.length; i++) {
		displayBook(books[i], bookList);
	}

	var addBookButton = document.getElementById('addNewBook');
	var form = document.getElementById('book-form');
	var titleInput = document.getElementsByName('title')[0];
	var authorInput = document.getElementsByName('author')[0];
	var titleError = document.getElementById('title-error');
	var authorError = document.getElementById('author-error');
	var duplicateBookError = document.getElementById('duplicate-book-error');

	function hideError(errorElement) {
		errorElement.style.display = 'none';
	}

	function displayError(errorElement) {
		errorElement.style.display = 'block';
	}

	titleInput.onkeyup = function () {
		hideError(titleError);

		var isDuplicate = identifyDuplicate(books, titleInput.value, authorInput.value);
		if (!isDuplicate) {
			hideError(duplicateBookError);
		} else {
			displayError(duplicateBookError);
		}
	};

	authorInput.onkeyup = function () {
		hideError(authorError);

		var isDuplicate = identifyDuplicate(books, titleInput.value, authorInput.value);
		if (!isDuplicate) {
			hideError(duplicateBookError);
		} else {
			displayError(duplicateBookError);
		}
	};

	addBookButton.onclick = function () {
		if (identifyDuplicate(books, titleInput.value, authorInput.value)) {
			displayError(duplicateBookError);
		} else {
			if (titleInput.value === '' && authorInput.value !== '') {
				displayError(titleError);
				hideError(authorError);
			} else if (authorInput.value === '' && titleInput.value !== '') {
				displayError(authorError);
				hideError(titleError);
			} else if (titleInput.value === '' && authorInput.value === '') {
				displayError(titleError);
				displayError(authorError);
			} else {
				var newBook = { title: titleInput.value, author: authorInput.value, isRead: false };
				//books.push(newBook);
				displayBook(newBook, bookList);
				books.push(newBook);
				form.reset();
				hideError(titleError);
				hideError(authorError);
			}
		}
	};
});
function identifyDuplicate(books, title, author) {
	var isDuplicate = false;

	for (var i = 0; i < books.length; i++) {
		if (books[i].title === title && books[i].author === author) {
			isDuplicate = true;
		}
	}
	return isDuplicate;
}

function displayBook(book, list) {
	var listItem = document.createElement('li');
	var bookTitle = document.createElement('p');
	var bookAuthor = document.createElement('p');
	var isReadLabel = document.createElement('label');
	var isRead = document.createElement('input');
	isRead.setAttribute('type', 'checkbox');

	bookTitle.innerText = 'Title: ' + book.title;
	bookAuthor.innerText = 'Author: ' + book.author;
	isReadLabel.innerText = 'Already Read';

	isRead.check = isRead.check;

	listItem.append(bookTitle, bookAuthor, isRead, isReadLabel);

	list.appendChild(listItem);
}
