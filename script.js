document.addEventListener("DOMContentLoaded", function() {
    loadProfile();
    displayProducts(products);

    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfile();
    });

    document.getElementById('filterButton').addEventListener('click', function() {
        filterProducts();
    });
    document.getElementById('searchButton').addEventListener('click', function() {
        searchProducts();
    });
});

const products = [
    { id: 1, name: 'Товар 1', height: 170, footSize: 42 },
    { id: 2, name: 'Товар 2', height: 160, footSize: 38 },
    { id: 3, name: 'Товар 3', height: 175, footSize: 40 },
    { id: 4, name: 'Товар 4', height: 180, footSize: 43 },
    { id: 5, name: 'Товар 5', height: 165, footSize: 37 },
    { id: 6, name: 'Товар 6', height: 158, footSize: 36 },
    { id: 7, name: 'Товар 7', height: 182, footSize: 44 },
    { id: 8, name: 'Товар 8', height: 155, footSize: 35 },
    { id: 9, name: 'Товар 9', height: 190, footSize: 45 },
    { id: 10, name: 'Товар 10', height: 150, footSize: 34 }
];

function saveProfile() {
    const height = document.getElementById('height').value;
    const footSize = document.getElementById('footSize').value;

    const profile = { height, footSize };
    localStorage.setItem('profile', JSON.stringify(profile));
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
        document.getElementById('height').value = profile.height;
        document.getElementById('footSize').value = profile.footSize;
    }
}

function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${product.name}</h3><p>Рост: ${product.height} см</p><p>Размер стопы: ${product.footSize}</p>`;
        grid.appendChild(card);
    });
}

function filterProducts() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (!profile) {
        alert('Пожалуйста, сохраните ваш профиль.');
        return;
    }

    const filteredProducts = products.filter(product => 
        product.height === parseInt(profile.height) && product.footSize === parseInt(profile.footSize)
    );

    displayProducts(filteredProducts);
}
function searchProducts() {
    const searchProduct = document.getElementById('searchInput').value;
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase()===searchProduct.toLowerCase()
    );
    displayProducts(filteredProducts);
}
