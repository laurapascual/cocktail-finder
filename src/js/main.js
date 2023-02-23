'use strict';

const inputText = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const btnReset = document.querySelector('.js-btnReset');
const listResults = document.querySelector('.js-results');


fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
.then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.drinks.map((drink) => {
        listResults.innerHTML +=
        /* const liEl = document.createElement('li');
        const liContent = document.createTextNode(`${drink.strDrink}`);
        liEl.setAttribute('class', 'title-drink');
        results.appendChild(liEl);
        liEl.appendChild(liContent); */
        `<li class= "title-drink">${drink.strDrink}</li>
        <img src= ${drink.strDrinkThumb} alt= "foto cocktail" class= "img-drink"/>`;
      });
    }
    );




function handleSearchClick() {
  const url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText.value}`;

  fetch(url).then((response) => response.json())
    .then((data) => {
      console.log(data);
      listResults.innerHTML = 'Resultados';
      data.drinks.map((drink) => {
        listResults.innerHTML +=
        /* const liEl = document.createElement('li');
        const liContent = document.createTextNode(`${drink.strDrink}`);
        liEl.setAttribute('class', 'title-drink');
        results.appendChild(liEl);
        liEl.appendChild(liContent); */
        `<li class= "title-drink">${drink.strDrink}</li>
        <img src= ${drink.strDrinkThumb} alt= "foto cocktail" class= "img-drink"/>`;
      });
    }
    );
}

function handleResetClick() {
  listResults.innerHTML = 'Resultados';
  inputText.value = '';
}


btnSearch.addEventListener('click', handleSearchClick);
btnReset.addEventListener('click', handleResetClick);
