let books = JSON.parse(localStorage.getItem("books")) || [];
let selectedRating = 0;
let editIndex = -1; // -1 means not editing

const addBtn = document.getElementById("addBtn");
const stars = document.querySelectorAll(".star");

// Save books
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Display books with numbers
function displayBooks() {
    const list = document.getElementById("bookList");
    list.innerHTML = "";

    books.forEach((book, index) => {
        const div = document.createElement("div");
        div.className = "book-item";

        const title = document.createElement("h3");
        title.textContent = `${index + 1}. ${book.name}`;

        const rating = document.createElement("p");
        rating.innerHTML = "Rating: " + "★".repeat(book.rating) + "☆".repeat(5 - book.rating);

        const comment = document.createElement("p");
        comment.textContent = "Comment: " + book.comment;

        // Buttons
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => editBook(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteBook(index);

        div.appendChild(title);
        div.appendChild(rating);
        div.appendChild(comment);
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);

        list.appendChild(div);
    });
}

// Add or Save book
function addBook() {
    const name = document.getElementById("bookName").value;
    const comment = document.getElementById("comment").value;

    if (name === "" || selectedRating === 0) {
        alert("Please enter book name and select rating");
        return;
    }

    if (editIndex >= 0) {
        // Save edited book
        books[editIndex] = { name, rating: selectedRating, comment };
        editIndex = -1;
        addBtn.textContent = "Add Book";
    } else {
        books.push({ name, rating: selectedRating, comment });
    }

    saveBooks();
    displayBooks();

    document.getElementById("bookName").value = "";
    document.getElementById("comment").value = "";
    selectedRating = 0;
    updateStars(0);
}

// Delete book
function deleteBook(index) {
    books.splice(index, 1);
    saveBooks();
    displayBooks();
}

// Edit book
function editBook(index) {
    const book = books[index];
    document.getElementById("bookName").value = book.name;
    document.getElementById("comment").value = book.comment;
    selectedRating = book.rating;
    updateStars(selectedRating);

    editIndex = index;
    addBtn.textContent = "Save Changes"; // Change button text
}

// STAR RATING INTERACTIONS
stars.forEach(star => {
    star.addEventListener("mouseover", () => {
        const val = parseInt(star.dataset.value);
        updateStars(val);
    });

    star.addEventListener("mouseout", () => {
        updateStars(selectedRating);
    });

    star.addEventListener("click", () => {
        selectedRating = parseInt(star.dataset.value);
        updateStars(selectedRating);
    });
});

function updateStars(rating) {
    stars.forEach(star => {
        if (parseInt(star.dataset.value) <= rating) {
            star.classList.add("selected");
        } else {
            star.classList.remove("selected");
        }
    });
}

// Display books on load
displayBooks();

