/* scripts.js */

// Login form submission
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
        window.location.href = '/panel.html';
    } else {
        alert('Error: ' + data.message);
    }
});

// Register link
document.getElementById('registerLink')?.addEventListener('click', () => {
    alert('Aquí se puede redirigir al formulario de registro o mostrarlo dinámicamente.');
});

// Fetch and display items
async function fetchItems(category = '') {
    const response = await fetch(`/items?category=${category}`);
    const items = await response.json();

    const itemsList = document.querySelector('.items-list');
    itemsList.innerHTML = '';

    items.forEach((item) => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item';
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        itemsList.appendChild(itemCard);
    });
}

// Category filter change
document.getElementById('category')?.addEventListener('change', (e) => {
    fetchItems(e.target.value);
});

// Add item form submission
document.getElementById('addItemForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const response = await fetch('/items', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (data.success) {
        alert('¡Objeto publicado exitosamente!');
        window.location.href = '/items.html';
    } else {
        alert('Error: ' + data.message);
    }
});

// Edit profile button
document.getElementById('editProfileBtn')?.addEventListener('click', () => {
    alert('Aquí puedes mostrar un formulario para editar el perfil.');
});

// Register form submission
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (data.success) {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        window.location.href = 'index.html';
    } else {
        alert('Error: ' + data.message);
    }
});
