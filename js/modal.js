document.getElementById('openModalBtn').addEventListener('click', function () {
    document.getElementById('myModal').style.display = 'block';
});

document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('myModal').style.display = 'none';
});

document.getElementById('myModal').addEventListener('click', function (event) {
    if (event.target === this) {
        document.getElementById('myModal').style.display = 'none';
    }
});