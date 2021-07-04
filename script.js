const mealContainer = document.querySelector(".mealContainer");
const body = document.querySelector("body");

async function getMeals() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const respData = await resp.json();
    console.log(respData.categories)
    mealContainer.innerHTML = ``;
    for(var i=0;i<14;i++){
        var meal = document.createElement("div");
        meal.classList.add("mealBox");
        meal.innerHTML = `
            <img src="${respData.categories[i].strCategoryThumb}" class="mealImgs" id="${respData.categories[i].strCategory}"></img>
            <span class="mealName">${respData.categories[i].strCategory}</span>
        `;
        meal.addEventListener("click",(e)=>{
            for(var i=0;i<10;i++){
                getRes(i);
            }
        });
        mealContainer.appendChild(meal);
        console.log(respData.categories[i].strCategoryThumb);
    };
}

getMeals();

async function getRes(i){
    mealContainer.innerHTML = ``;
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await resp.json();
    console.log(respData.meals[0]);
    var meal = document.createElement("div");
    meal.classList.add("mealBox");
    var rating = getRating();
    if(i>6){
        meal.classList.add("Grey");
    }
    meal.innerHTML = `
        <img src="${respData.meals[0].strMealThumb}" class="mealImgs" id="${respData.meals[0].strCategory}"></img>
        <div class="info">
            <div class="mealName">Restuarant ${respData.meals[0].strCategory}</div>
            <div class="Rate">
                <div class="rating">${rating}</div>
                <div class=${getstar(rating)}><span class="fa fa-star"></span></div>
            </div>
        </div>
    `;
    mealContainer.appendChild(meal);
}

function getRating(){
    const rating = (5*(Math.random())).toFixed(1);
    return rating;
}

function getstar(rating){
    var color = "green";
    if(rating <= 3.5){
        color = "red";
    }
    return color;
}