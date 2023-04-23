"use strict";const inputText=document.querySelector(".js-input"),btnSearch=document.querySelector(".js-btnSearch"),btnReset=document.querySelector(".js-btnReset"),cocktailsList=document.querySelector(".js-results"),listFavorites=document.querySelector(".js-favs"),btnFavorites=document.querySelector(".js-button"),msgError=document.querySelector(".js-msg-error");let cocktailsDataList=[],listDataFavorites=[];const cocktailsStored=JSON.parse(localStorage.getItem("cocktails"));function fetchCocktails(t){fetch(t).then(t=>t.json()).then(t=>{t.drinks?(cocktailsDataList=t.drinks,renderCocktailList(cocktailsDataList),msgError.innerHTML=""):(msgError.innerHTML="No se han encontrado resultados para esa búsqueda",cocktailsDataList=[],renderCocktailList(cocktailsDataList))})}function handleSearchClick(){fetchCocktails("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+inputText.value)}function renderCocktailList(t){cocktailsList.innerHTML="";for(const e of t)renderCocktail(e);addEventToCocktail()}function renderListFavorites(t){listFavorites.innerHTML="";for(const e of t)renderCocktailFav(e);addEventToIcon()}function renderCocktail(t){const e=listDataFavorites.find(e=>e.strDrink===t.strDrink),i=document.createElement("li");i.setAttribute("class","js-li-cocktails title-drink title-hover "+(e&&"selected")),i.setAttribute("id",t.idDrink);const a=document.createTextNode(t.strDrink),s=document.createElement("img");s.setAttribute("src",t.strDrinkThumb||"https://via.placeholder.com/210x295/ffffff/666666/?text=TV"),s.setAttribute("alt","foto cocktail"),s.setAttribute("class","img-drink"),i.appendChild(a),i.appendChild(s),cocktailsList.appendChild(i)}function renderCocktailFav(t){const e=document.createElement("li");e.setAttribute("class","title-drink"),e.setAttribute("id",t.idDrink);const i=document.createTextNode(t.strDrink),a=document.createElement("img");a.setAttribute("src",t.strDrinkThumb||"https://via.placeholder.com/210x295/ffffff/666666/?text=TV"),a.setAttribute("alt","foto cocktail"),a.setAttribute("class","img-drink");const s=document.createElement("i");s.setAttribute("class","fa-solid fa-circle-xmark js-icons"),s.setAttribute("id",t.idDrink),e.appendChild(i),e.appendChild(s),e.appendChild(a),listFavorites.appendChild(e)}function handleResetClick(){listDataFavorites=[],cocktailsDataList=[],inputText.value="",msgError.innerHTML="",hideFavBtn(),localStorage.removeItem("cocktails"),renderListFavorites(listDataFavorites),renderCocktailList(cocktailsDataList)}function hideFavBtn(){0===listDataFavorites.length?btnFavorites.classList.add("hidden"):btnFavorites.classList.remove("hidden")}function handleLiClick(t){t.currentTarget.classList.toggle("selected");const e=t.currentTarget.id,i=cocktailsDataList.find(t=>t.idDrink===e),a=listDataFavorites.findIndex(t=>t.idDrink===e);-1===a?listDataFavorites.push(i):listDataFavorites.splice(a,1),hideFavBtn(),renderListFavorites(listDataFavorites),localStorage.setItem("cocktails",JSON.stringify(listDataFavorites))}function addEventToCocktail(){const t=document.querySelectorAll(".js-li-cocktails");for(const e of t)e.addEventListener("click",handleLiClick)}function addEventToIcon(){const t=document.querySelectorAll(".js-icons");for(const e of t)e.addEventListener("click",handleIconClick)}function handleIconClick(t){const e=t.currentTarget.id,i=listDataFavorites.findIndex(t=>t.idDrink===e);-1!==i&&listDataFavorites.splice(i,1),hideFavBtn(),renderListFavorites(listDataFavorites),renderCocktailList(cocktailsDataList),localStorage.setItem("cocktails",JSON.stringify(listDataFavorites))}function handleDeleteClick(){listDataFavorites=[],localStorage.removeItem("cocktails"),hideFavBtn(),renderListFavorites(listDataFavorites),renderCocktailList(cocktailsDataList)}function handleEnterInput(t){"Enter"===t.key&&(handleSearchClick(),t.preventDefault())}cocktailsStored&&(listDataFavorites=cocktailsStored,hideFavBtn(),renderListFavorites(listDataFavorites)),fetchCocktails("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"),btnSearch.addEventListener("click",handleSearchClick),btnReset.addEventListener("click",handleResetClick),inputText.addEventListener("keydown",handleEnterInput),btnFavorites.addEventListener("click",handleDeleteClick);