document.addEventListener('DOMContentLoaded', async function () {

    let response = await fetch('http://localhost:3000/books');
    let data = await response.json();
    showBooks(data);
});

function showBooks(books) {
    let arrayBooks = '';
    books.forEach(book => {
        arrayBooks += `<tr>
            <td scope="row">${book.id}</td>
            <td>${book.title}</td>
            <td>${book.genre}</td>
            <td>${book.author}</td>
        </tr>`;
    });
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = arrayBooks;
}