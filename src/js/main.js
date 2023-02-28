'use strict';

const inputText = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const btnReset = document.querySelector('.js-btnReset');
const cocktailsList = document.querySelector('.js-results');
const listFavorites = document.querySelector('.js-favs');
const btnFavorites = document.querySelector('.js-button');
const msgError = document.querySelector('.js-msg-error');
const btnLog = document.querySelector('.js-btnLog');
let cocktailsDataList = [];
let listDataFavorites = [];

//Recoger lista de favoritos en el Local Storage
const cocktailsStored = JSON.parse(localStorage.getItem('cocktails'));
if(cocktailsStored) {
  listDataFavorites = cocktailsStored;
  hideFavBtn();
  renderListFavorites(listDataFavorites);
}

//Fetch + Mensaje de error si no hay resultados
function fetchCocktails(url) {
  fetch(url).then((response) => response.json())
    .then((data) => {
      if(data.drinks) {
        cocktailsDataList = data.drinks;
        renderCocktailList(cocktailsDataList);
        msgError.innerHTML = '';
      }
      else {
        msgError.innerHTML = 'No se han encontrado resultados para esa búsqueda';
        cocktailsDataList = [];
        renderCocktailList(cocktailsDataList);
      }
    }
    );
}

//Busca entre todos los cocktails
function handleSearchClick() {
  const url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText.value}`;
  fetchCocktails(url);
}

//Margaritas por defecto
fetchCocktails('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

//Pintar todos los elementos
function renderCocktailList(cocktailsDataList) {
  cocktailsList.innerHTML = '';
  for (const cocktail of cocktailsDataList) {
    renderCocktail(cocktail);
  }
  addEventToCocktail();
}

//Pintar elementos favoritos
function renderListFavorites(listDataFavorites) {
  listFavorites.innerHTML = '';
  for (const cocktail of listDataFavorites) {
    renderCocktailFav(cocktail);
  }
  addEventToIcon();
}


//Pintar un elemento de la lista
function renderCocktail(cocktail) {
  const selectedFavorite = listDataFavorites.find(cocktailFav => cocktailFav.strDrink === cocktail.strDrink);
  const liElement = document.createElement('li');
  liElement.setAttribute('class', `js-li-cocktails title-drink title-hover ${selectedFavorite && 'selected'}`); //Marcar como seleccionado
  liElement.setAttribute('id', cocktail.idDrink);
  const liContent = document.createTextNode(cocktail.strDrink);
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', cocktail.strDrinkThumb || 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
  imgElement.setAttribute('alt', 'foto cocktail');
  imgElement.setAttribute('class', 'img-drink');
  const pElement = document.createElement('p');
  const pContent = document.createTextNode(cocktail.strInstructions);
  pElement.setAttribute('class', 'letter');

  liElement.appendChild(liContent);
  liElement.appendChild(pElement);
  pElement.appendChild(pContent);
  liElement.appendChild(imgElement);
  cocktailsList.appendChild(liElement);
}

//Pintar un elemento de la lista de favoritos
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
  listDataFavorites = [];
  cocktailsDataList = [];
  inputText.value = '';
  msgError.innerHTML = '';
  hideFavBtn();
  localStorage.removeItem('cocktails');
  renderListFavorites(listDataFavorites);
  renderCocktailList(cocktailsDataList);
}

//Esconder el btn de eliminar fav
function hideFavBtn() {
  if(listDataFavorites.length === 0) {
    btnFavorites.classList.add('hidden');
  } else {
    btnFavorites.classList.remove('hidden');
  }
}

//Función seleccionar cocktail y añadir a fav
function handleLiClick(ev) {
  ev.currentTarget.classList.toggle('selected');
  const idSelected = ev.currentTarget.id;
  const selectedCocktail = cocktailsDataList.find(cocktail => cocktail.idDrink === idSelected);
  //Comprobar si ya existe el fav y sino añadirlo
  const indexCocktail = listDataFavorites.findIndex(cocktail => cocktail.idDrink === idSelected);
  if(indexCocktail === -1) {
    listDataFavorites.push(selectedCocktail);
  } else { //Si esta en el listado de favoritos, elimínalo
    listDataFavorites.splice(indexCocktail, 1);
  }
  hideFavBtn();
  renderListFavorites(listDataFavorites);
  localStorage.setItem('cocktails', JSON.stringify(listDataFavorites));
}

//Clickar sobre el cocktail de resultados
function addEventToCocktail() {
  const liElementsList = document.querySelectorAll('.js-li-cocktails');
  for (const li of liElementsList) {
    li.addEventListener('click', handleLiClick);
  }
}

//Clickar sobre el icono x
function addEventToIcon() {
  const icons = document.querySelectorAll('.js-icons');
  for (const icon of icons) {
    icon.addEventListener('click',handleIconClick);
  }
}

//Eliminar de la lista pulsando el icono
function handleIconClick(ev) {
  const idSelected = ev.currentTarget.id;
  const indexCocktail = listDataFavorites.findIndex(cocktail => cocktail.idDrink === idSelected);
  if(indexCocktail !== -1) {
    listDataFavorites.splice(indexCocktail, 1);
  }
  hideFavBtn();
  renderListFavorites(listDataFavorites);
  renderCocktailList(cocktailsDataList);
  localStorage.setItem('cocktails', JSON.stringify(listDataFavorites));
}

//Eliminar todos los fav del botón
function handleDeleteClick() {
  listDataFavorites = [];
  localStorage.removeItem('cocktails');
  hideFavBtn();
  renderListFavorites(listDataFavorites);
  renderCocktailList(cocktailsDataList);
}


//Función enter, evitar refrescar
function handleEnterInput(ev) {
  if(ev.key === 'Enter') {
    handleSearchClick();
    ev.preventDefault();
  }
}

function handleFavConsole() {
  for ( const item of listDataFavorites) {
    console.log(item.strDrink);
  }
}

btnSearch.addEventListener('click', handleSearchClick);
btnReset.addEventListener('click', handleResetClick);
inputText.addEventListener('keydown', handleEnterInput);
btnFavorites.addEventListener('click', handleDeleteClick);
btnLog.addEventListener('click', handleFavConsole);