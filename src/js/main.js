'use strict';

const inputText = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const btnReset = document.querySelector('.js-btnReset');
const cocktailsList = document.querySelector('.js-results');
let cocktailsDataList = [];

//Fetch pinta margaritas por defecto
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then((response) => response.json())
  .then((data) => {
    cocktailsDataList = data.drinks;
    renderCocktailList(cocktailsDataList);
  });

//Busca entre todos los cocktails
function handleSearchClick() {
  const url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText.value}`;

  fetch(url).then((response) => response.json())
    .then((data) => {
      cocktailsList.innerHTML = 'Resultados';
      cocktailsDataList = data.drinks;
      renderCocktailList(cocktailsDataList);
    }
    );
}

//pintar todos los elementos
function renderCocktailList(cocktailsDataList) {
  for (const cocktail of cocktailsDataList) {
    cocktailsList.innerHTML += renderCocktail(cocktail);
  }
  addEventToCocktail();
}


//pintar un elemento de la lista
function renderCocktail(cocktail) {
  let html =  `<li class="js-li-cocktails title-drink" id=${cocktail.idDrink} > ${cocktail.strDrink}
    <img src= ${cocktail.strDrinkThumb || 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'}  alt= "foto cocktail" class= "img-drink"/></li>`;
  return html;
}

//Botón de reset
function handleResetClick() {
  cocktailsList.innerHTML = 'Resultados';
  inputText.value = '';
}

function handleLiClick(ev) {
  ev.currentTarget.classList.toggle('selected'); 
}

//clickar sobre el cocktail de resultados
function addEventToCocktail() {
  const liElementsList = document.querySelectorAll('.js-li-cocktails');
  for (const li of liElementsList) {
    li.addEventListener('click', handleLiClick);
}
}

function handleEnterInput(ev) {
  if(ev.key === 'Enter') {
    handleSearchClick();
    ev.preventDefault();
  }
} 


btnSearch.addEventListener('click', handleSearchClick);
btnReset.addEventListener('click', handleResetClick);
inputText.addEventListener('keydown', handleEnterInput);
