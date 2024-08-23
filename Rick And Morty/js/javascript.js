// app.js
let characters = []; // نگهداری شخصیت‌ها در یک متغیر جهانی

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => {
            characters = data.results; // ذخیره شخصیت‌ها در متغیر جهانی
            displayCharacters(characters); // نمایش شخصیت‌ها
            loadFavorites();
        });

    document.getElementById('search-input').addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const filteredCharacters = characters.filter(character =>
            character.name.toLowerCase().includes(query)
        );
        displayCharacters(filteredCharacters);
    });
});

function displayCharacters(characterList) {
    const characterContainer = document.getElementById('character-list');
    characterContainer.innerHTML = ''; // پاک کردن محتوا قبلی

    characterList.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');
        characterDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p>${character.name}</p>
            <button>&#9733;</button>
        `;
        characterDiv.addEventListener('click', () => showCharacterDetails(character));
        characterDiv.querySelector('button').addEventListener('click', (event) => {
            event.stopPropagation();
            toggleFavorite(character);
        });
        characterContainer.appendChild(characterDiv);
    });
}

function showCharacterDetails(character) {
    const characterDetails = document.getElementById('character-details');
    characterDetails.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Gender: ${character.gender}</p>
        <p>Origin: ${character.origin.name}</p>
    `;
    characterDetails.style.display = 'block';
}

function toggleFavorite(character) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(fav => fav.id === character.id);

    if (index < 0) {
        favorites.push(character);
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteList = document.getElementById('favorite-list');
    favoriteList.innerHTML = '';

    favorites.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');
        characterDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p>${character.name}</p>
        `;
        characterDiv.addEventListener('click', () => showCharacterDetails(character));
        favoriteList.appendChild(characterDiv);
    });
}