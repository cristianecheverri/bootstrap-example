document.addEventListener('DOMContentLoaded', async function () {

    await getBooksRequest();

    const saveBookButton = document.getElementById('saveBookButton');
    saveBookButton.addEventListener('click', function () {
        const bookName = document.getElementById('name').value;
        const bookAuthor = document.getElementById('author').value;
        const bookGenre = document.getElementById('genre').value;
        saveBookRequest({ bookName, bookAuthor, bookGenre });
    });

});

function showBooks(books) {
    let arrayBooks = '';
    if (!!books) {
        books.forEach(book => {
            arrayBooks += `<tr>
                <td scope="row">${book.id}</td>
                <td>${book.title}</td>
                <td>${book.genre}</td>
                <td>${book.author}</td>
                <td>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                    data-bs-target="#editBookModal">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                    data-bs-target="#editBookModal">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>`;
        });
    } else {
        arrayBooks = `<tr class="table-warning">
            <td colspan="6" class="text-center">No hay libros</td>
        </tr>`;
    }

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = arrayBooks;
}

async function getBooksRequest() {
    try {
        let response = await fetch('http://localhost:3000/books');
        let data = await response.json();
        showBooks(data);
    } catch (error) {
        console.log(error);
        showBooks(null);
    }
}

async function saveBookRequest({ bookName, bookAuthor, bookGenre }) {
    try {
        let request = await fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                title: bookName,
                author: bookAuthor,
                genre: bookGenre
            })
        });
        let data = await request.json();

        if (data.ok) {
            alert('Book created successfully');
        } else {
            alert('Failed to create book');
        }

        hideModal('createBook');
        location.reload();
    } catch (error) {

    }
}

function hideModal(modalId) {
    const existingModal = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(existingModal);
    modal.hide();
}