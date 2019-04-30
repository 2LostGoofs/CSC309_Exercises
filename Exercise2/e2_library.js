/* E2 Library - JS */

/*-----------------------------------------------------------*/
/* Starter code - DO NOT edit the code below.*/
/*-----------------------------------------------------------*/

// global counts
let numberOfBooks = 0; // total number of books
let numberOfPatrons = 0; // total number of patrons

// global arrays
const libraryBooks = [] // Array of books owned by the library (whether they are loaned or not)
const patrons = [] // Array of library patrons.

// Book 'class'
class Book {
	constructor(title, author, genre) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.patron = null; // will be the patron object

		// set book ID
		this.bookId = numberOfBooks;
		numberOfBooks++;
	}

	setLoanTime() {
		// Create a setTimeout that waits 3 seconds before indicating a book is overdue

		const self = this; // keep book in scope of anon function (why? the call-site for 'this' in the anon function is the DOM window)
		setTimeout(function() {

			console.log('overdue book!', self.title)
			changeToOverdue(self);

		}, 3000)

	}
}

// Patron constructor
const Patron = function(name) {
	this.name = name;
	this.cardNumber = numberOfPatrons;

	numberOfPatrons++;
}


// Adding these books does not change the DOM - we are simply setting up the
// book and patron arrays as they appear initially in the DOM.
libraryBooks.push(new Book('Harry Potter', 'J.K. Rowling', 'Fantasy'));
libraryBooks.push(new Book('1984', 'G. Orwell', 'Dystopian Fiction'));
libraryBooks.push(new Book('A Brief History of Time', 'S. Hawking', 'Cosmology'));

patrons.push(new Patron('Jim John'))
patrons.push(new Patron('Kelly Jones'))

// Patron 0 loans book 0
libraryBooks[0].patron = patrons[0]
// Set the overdue timeout
libraryBooks[0].setLoanTime()  // check console to see a log after 3 seconds


/* Select all DOM form elements you'll need. */
const bookAddForm = document.querySelector('#bookAddForm');
const bookInfoForm = document.querySelector('#bookInfoForm');
const bookLoanForm = document.querySelector('#bookLoanForm');
const patronAddForm = document.querySelector('#patronAddForm');

/* bookTable element */
const bookTable = document.querySelector('#bookTable')
/* bookInfo element */
const bookInfo = document.querySelector('#bookInfo')
/* Full patrons entries element */
const patronEntries = document.querySelector('#patrons')

/* Event listeners for button submit and button click */

bookAddForm.addEventListener('submit', addNewBookToBookList);
bookLoanForm.addEventListener('submit', loanBookToPatron);
patronAddForm.addEventListener('submit', addNewPatron)
bookInfoForm.addEventListener('submit', getBookInfo);

/* Listen for click patron entries - will have to check if it is a return button in returnBookToLibrary */
patronEntries.addEventListener('click', returnBookToLibrary)

/*-----------------------------------------------------------*/
/* End of starter code - do *not* edit the code above. */
/*-----------------------------------------------------------*/


/** ADD your code to the functions below. DO NOT change the function signatures. **/


/*** Functions that don't edit DOM themselves, but can call DOM functions
     Use the book and patron arrays appropriately in these functions.
 ***/

// Adds a new book to the global book list and calls addBookToLibraryTable()
function addNewBookToBookList(e) {
	e.preventDefault();

	// Add book book to global array
	const newBookName = document.querySelector('#newBookName').value;
	const newBookAuthor = document.querySelector('#newBookAuthor').value;
	const newBookGenre = document.querySelector('#newBookGenre').value;
	var book = new Book(newBookName, newBookAuthor, newBookGenre);
	libraryBooks.push(book);


	// Call addBookToLibraryTable properly to add book to the DOM
	addBookToLibraryTable(book);
}

// Changes book patron information, and calls
function loanBookToPatron(e) {
	e.preventDefault();

	// Get correct book and patron
	const loanBookId = parseInt(document.querySelector('#loanBookId').value);
	const loanCardNum = parseInt(document.querySelector('#loanCardNum').value);

	// Add patron to the book's patron property
	libraryBooks[loanBookId].patron = patrons[loanCardNum];

	// Add book to the patron's book table in the DOM by calling addBookToPatronLoans()
	addBookToPatronLoans(libraryBooks[loanBookId]);

	// Start the book loan timer.
	libraryBooks[loanBookId].setLoanTime();

}

// Changes book patron information and calls returnBookToLibraryTable()
function returnBookToLibrary(e){
	e.preventDefault();
	// check if return button was clicked, otherwise do nothing.
	if(e.target.classList.contains('return')){

		console.log('remove book');
		// const tableRow = patronEntries.
		const bookRemoved = parseInt(e.target.parentElement.parentElement.firstElementChild.innerText);
		const bookReturned = libraryBooks[bookRemoved];
		removeBookFromPatronTable(libraryBooks[bookRemoved]);
		bookReturned.patron = null;
	}
	// Call removeBookFromPatronTable()


	// Change the book object to have a patron of 'null'


}

// Creates and adds a new patron
function addNewPatron(e) {
	e.preventDefault();

	// Add a new patron to global array
	const newPatronName = document.querySelector('#newPatronName').value;
	const new_patron = new Patron(newPatronName);
	patrons.push(new_patron);

	// Call addNewPatronEntry() to add patron to the DOM
	addNewPatronEntry(new_patron);
}

// Gets book info and then displays
function getBookInfo(e) {
	e.preventDefault();

	// Get correct book
	const bookInfoId = parseInt(document.querySelector('#bookInfoId').value);
	const newbookInfo = libraryBooks[bookInfoId];
	// Call displayBookInfo()
	displayBookInfo(newbookInfo);
}


/*-----------------------------------------------------------*/
/*** DOM functions below - use these to create and edit DOM objects ***/

// Adds a book to the library table.
function addBookToLibraryTable(book) {
	// Add code here
	var table = document.getElementById("bookTable");
	var row = table.insertRow(table.rows.length);
	var tableBookID = row.insertCell(0);
	var tableBookTitle = row.insertCell(1);
	var tablePatronCardNumber = row.insertCell(2);
	tableBookID.innerHTML = book.bookId;
	tableBookTitle.innerHTML = "<strong>" + book.title + "</strong>";
	tablePatronCardNumber = book.patron;


}


// Displays detailed info on the book in the Book Info Section
function displayBookInfo(book) {
	// Add code here
	const myNodeList = document.querySelector('#bookInfo');
	myNodeList.children[0].innerHTML = "<p> Book Id:\n" + "<span>" + book.bookId + "</span>";
	myNodeList.children[1].innerHTML = "<p> Title:\n" + "<span>" + book.title + "</span>";
	myNodeList.children[2].innerHTML = "<p> Author:\n" + "<span>" + book.author + "</span>";
	myNodeList.children[3].innerHTML = "<p> Genre:\n" + "<span>" + book.genre + "</span>";
	myNodeList.children[4].innerHTML = "<p> Currently loaned out to:\n" + "<span> </span>";

}

// Adds a book to a patron's book list with a status of 'Within due date'.
// (don't forget to add a 'return' button).
function addBookToPatronLoans(book) {
	// Add code here
	const patronBookList = document.getElementById('patrons');
	const currentPatron = book.patron;
	const changePatron = patronBookList.children[currentPatron.cardNumber];
	const newRow = document.createElement("TR");
	newRow.innerHTML =	"<tr>\n"
										+ "<td>\n" +  book.bookId + "\n</td>\n"
										+ "<td>\n<strong>" +  book.title + "</strong>\n</td>\n"
										+ "<td>\n <span class=\"green\">Within due date</span>\n</td>\n"
										+ "<td>\n<button class=\"return\">return</button>\n</td>\n"
										+ "</tr>\n";

	changePatron.lastElementChild.children[0].appendChild(newRow);
}

// Adds a new patron with no books in their table to the DOM, including name, card number,
// and blank book list (with only the <th> headers: BookID, Title, Status).
function addNewPatronEntry(patron) {
	// Add code here
	const patronList = document.getElementById('patrons');
	const newPatron = document.createElement('div');
	newPatron.className = 'patron';
	newPatron.innerHTML = "<p> Name:\n" + "<span>" + patron.name + "</span>"
											+ "<p> Card Number:\n" + "<span>" + patron.cardNumber + "</span>"
											+ "<h4> Books on loan:</h4>";

	const table = document.createElement("TABLE");
	table.className = 'patronLoansTable';
	table.innerHTML = "<tbody>\n"
									+ "<tr>\n"
									+ "<th>\n" + "BookID" + "\n</th>\n"
									+ "<th>\n" + "Title" + "\n</th>\n"
									+ "<th>\n" + "Status" + "\n</th>\n"
									+ "<th>\n" + "Return" + "\n</th>\n"
									+ "</tr>\n"
									+ "</tbody>\n";

	newPatron.appendChild(table);
	patronList.appendChild(newPatron);

}


// Removes book from patron's book table and remove patron card number from library book table
function removeBookFromPatronTable(book) {
	// Add code here
	const patronCardNumber = book.patron.cardNumber;
	const patronBookTable = patronEntries.children[patronCardNumber].lastElementChild.lastElementChild;
	patronBookTable.children[book.bookId+1].remove();
	const bookTableList = bookTable.children[0].children;
	bookTableList[book.bookId+1].lastElementChild.innerHTML = ""

}

// Set status to red 'Overdue' in the book's patron's book table.
function changeToOverdue(book) {
	// Add code here
	const patronBookTable = patronEntries.children[book.patron.cardNumber].lastElementChild.lastElementChild;
	patronBookTable.children[1].children[2].innerHTML = "<span class=\"red\">Overdue</span>";
}
