'use strict';

const inputText = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const btnReset = document.querySelector('.js-btnReset');
const results = document.querySelector('.js-results');


function handleSearchClick() {
  const url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText.value}`;
  /* const urlMargarita =' https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'; */

  fetch(url).then((response) => response.json())
    .then((data) => {
      console.log(data);
      results.innerHTML = 'Resultados';
      data.drinks.map((drink) => {
        results.innerHTML +=
        `<li class= "title-drink">${drink.strDrink}</li>
        <img src= ${drink.strDrinkThumb} alt= "foto cocktail" class= "img-drink"/>`;
      });
    }
    );
}

function handleResetClick() {
  results.innerHTML = 'Resultados';
  inputText.value = '';
}


btnSearch.addEventListener('click', handleSearchClick);
btnReset.addEventListener('click', handleResetClick);
