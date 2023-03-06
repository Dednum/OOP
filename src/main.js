

function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "9fd7a449d055dba26a982a3220f32aa2";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},Poland&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherData = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
                <p>Description: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind speed: ${data.wind.speed} m/s</p>
                <p>Pressure: ${data.main.pressure} hPa</p>
                <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            `;
            document.getElementById("weather").innerHTML = weatherData;
        })
        .catch(error => console.error(error));
}



  function fetchMeals() {
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Polish';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const meals = data.meals.slice(0, 5); // limit to first 5 meals
  
        meals.forEach(meal => {
          // create a div for each meal
          const mealDiv = document.createElement('div');
          mealDiv.classList.add('meal');
  
          // add meal title
          const mealName = document.createElement('h2');
          mealName.textContent = meal.strMeal;
          mealDiv.appendChild(mealName);
  
          // add meal image
          const mealImage = document.createElement('img');
          mealImage.src = meal.strMealThumb;
          mealImage.alt = meal.strMeal;
          mealDiv.appendChild(mealImage);
  
          // add ingredients
          const ingredientsList = document.createElement('ul');
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient) {
              const listItem = document.createElement('li');
              listItem.textContent = `${ingredient} - ${measure}`;
              ingredientsList.appendChild(listItem);
            } else {
              break; // no more ingredients
            }
          }
          mealDiv.appendChild(ingredientsList);
  
          // add meal div to the DOM
          document.getElementById('meals').appendChild(mealDiv);
        });
      })
      .catch(error => console.error(error));
  }