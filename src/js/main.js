'use strict';

const inputText = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const btnReset = document.querySelector('.js-btnReset');
const cocktailsList = document.querySelector('.js-results');
const listFavorites = document.querySelector('.js-favs');
const btnFavorites = document.querySelector('.js-button');
let cocktailsDataList = [];
let listDataFavorites = [];

const cocktailsStored = JSON.parse(localStorage.getItem('cocktails'));
if(cocktailsStored) {
  listDataFavorites = cocktailsStored;
  renderListFavorites(listDataFavorites);
}

function fetchCocktails(url) {
  fetch(url).then((response) => response.json())
    .then((data) => {
      cocktailsDataList = data.drinks;
      renderCocktailList(cocktailsDataList);
    }
    );
}

//Busca entre todos los cocktails
function handleSearchClick() {
  const url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText.value}`;
  fetchCocktails(url);
}

fetchCocktails('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

//pintar todos los elementos
function renderCocktailList(cocktailsDataList) {
  cocktailsList.innerHTML = '';
  for (const cocktail of cocktailsDataList) {
    renderCocktail(cocktail);
  }
  addEventToCocktail();
}

//pintar elementos favoritos
function renderListFavorites(listDataFavorites) {
  listFavorites.innerHTML = '';
  for (const cocktail of listDataFavorites) {
    renderCocktailFav(cocktail);
  }
  addEventToIcon();
}


//pintar un elemento de la lista
function renderCocktail(cocktail) {
  const selectedFavorite = listDataFavorites.find(cocktailFav => cocktailFav.strDrink === cocktail.strDrink);
  const liElement = document.createElement('li');
  liElement.setAttribute('class', `js-li-cocktails title-drink ${selectedFavorite && 'selected'}`);
  liElement.setAttribute('id', cocktail.idDrink);
  const liContent = document.createTextNode(cocktail.strDrink);
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', cocktail.strDrinkThumb || 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
  imgElement.setAttribute('alt', 'foto cocktail');
  imgElement.setAttribute('class', 'img-drink');
  liElement.appendChild(liContent);
  liElement.appendChild(imgElement);
  cocktailsList.appendChild(liElement);
  
}

function renderCocktailFav(cocktail) {
  const liElement = document.createElement('li');
  liElement.setAttribute('class', 'title-drink');
  liElement.setAttribute('id', cocktail.idDrink);
  const liContent = document.createTextNode(cocktail.strDrink);
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', cocktail.strDrinkThumb || 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
  imgElement.setAttribute('alt', 'foto cocktail');
  imgElement.setAttribute('class', 'img-drink');
  const iconElement = document.createElement('i');
  iconElement.setAttribute('class','fa-solid fa-circle-xmark js-icons');
  iconElement.setAttribute('id', cocktail.idDrink);

  liElement.appendChild(liContent);
  liElement.appendChild(iconElement);
  liElement.appendChild(imgElement);
  listFavorites.appendChild(liElement);
}

//Botón de reset
function handleResetClick() {
  cocktailsList.innerHTML = '';
  listFavorites.innerHTML = '';
  inputText.value = '';
  localStorage.removeItem('cocktails');
}

//función seleccionar cocktail y añadir a fav
function handleLiClick(ev) {
  ev.currentTarget.classList.toggle('selected');
  const idSelected = ev.currentTarget.id;
  const selectedCocktail = cocktailsDataList.find(cocktail => cocktail.idDrink === idSelected);
  //comprobar si ya existe el fav y sino añadirlo
  const indexCocktail = listDataFavorites.findIndex(cocktail => cocktail.idDrink === idSelected);
  if(indexCocktail === -1) {
    listDataFavorites.push(selectedCocktail);
  } else { //si esta en el listado de favoritos, eliminalo
    listDataFavorites.splice(indexCocktail, 1);
  }
  renderListFavorites(listDataFavorites);
  localStorage.setItem('cocktails', JSON.stringify(listDataFavorites));
}

//clickar sobre el cocktail de resultados
function addEventToCocktail() {
  const liElementsList = document.querySelectorAll('.js-li-cocktails');
  for (const li of liElementsList) {
    li.addEventListener('click', handleLiClick);
  }
}

//clickar sobre el icono x
function addEventToIcon() {
  const icons = document.querySelectorAll('.js-icons');
  for (const icon of icons) {
    icon.addEventListener('click',handleIconClick);
  }
}

function handleIconClick(ev) {
  const idSelected = ev.currentTarget.id;
  const indexCocktail = listDataFavorites.findIndex(cocktail => cocktail.idDrink === idSelected);
  if(indexCocktail !== -1) {
    listDataFavorites.splice(indexCocktail, 1);
  }
  renderListFavorites(listDataFavorites);
  renderCocktailList(cocktailsDataList);
  localStorage.setItem('cocktails', JSON.stringify(listDataFavorites));
}

function handleDeleteClick() {
    listFavorites.innerHTML = '';
}


//función enter
function handleEnterInput(ev) {
  if(ev.key === 'Enter') {
    handleSearchClick();
    ev.preventDefault();
  }
}

btnSearch.addEventListener('click', handleSearchClick);
btnReset.addEventListener('click', handleResetClick);
inputText.addEventListener('keydown', handleEnterInput);
btnFavorites.addEventListener('click', handleDeleteClick);