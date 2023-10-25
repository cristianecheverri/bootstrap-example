document.addEventListener('DOMContentLoaded', async function () {

    const saveBookButton = document.getElementById('saveBookButton');
    saveBookButton.addEventListener('click', function () {
        const bookName = document.getElementById('name').value;
        const bookAuthor = document.getElementById('author').value;
        const bookGenre = document.getElementById('genre').value;
        saveBook({ bookName, bookAuthor, bookGenre });
    });

    try {
        let response = await fetch('http://localhost:3000/books');
        let data = await response.json();
        showBooks(data);
    } catch (error) {
        console.log(error);
        showBooks(null);
    }
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
            </tr>`;
        });
    } else {
        arrayBooks = `<tr class="table-warning">
            <td colspan="4" class="text-center">No hay libros</td>
        </tr>`;
    }

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = arrayBooks;
}

async function saveBook({ bookName, bookAuthor, bookGenre }) {
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

        hideModal('createBook');
    } catch (error) {

    }
}

function hideModal(modalId) {
    const existingModal = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(existingModal);
    modal.hide();
}