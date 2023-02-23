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
}


//pintar un elemento de la lista
function renderCocktail(cocktail) {
  let html =  `<li class= "title-drink">${cocktail.strDrink}</li>
    <img src= ${cocktail.strDrinkThumb} alt= "foto cocktail" class= "img-drink"/>`;
  return html;
}


function handleResetClick() {
  cocktailsList.innerHTML = 'Resultados';
  inputText.value = '';
}


btnSearch.addEventListener('click', handleSearchClick);
btnReset.addEventListener('click', handleResetClick);
