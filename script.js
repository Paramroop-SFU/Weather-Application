const URLWeather = 'https://api.openweathermap.org/data/2.5/weather?q='; // api to get the weather data
const URlCountry = 'https://restcountries.com/v2/name/' // api to get the country code
var nationCode = ''; // holds the value of the country code
let country = ''; // holds the value of the choosen city
let apikey = '&appid=8756697960aa755485cba7e5edbe8e75&units=metric'; // api key for the weather 
var searchButton = document.getElementById('searchButtons'); // gets the em
var input = document.querySelector('.text');
var countryButton = document.querySelector('#countryButton');
let switchInput = 0

document.querySelector("#countryButton").style.display = 'none'


async function checkweather2(city, country) {
    const response = await fetch(URLWeather + city + ',' + country + apikey);
    if (response.status == 404) {
        document.querySelector(".Weather").style.display = 'none'
        return;
    }

    var data = await response.json();
    console.log(data);
    console.log(country);
    document.querySelector(".Weather").style.display = 'block'
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + '°C';
    document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
    document.querySelector(".wind").innerHTML = data.wind.speed + 'km/h';
    var icon = document.querySelector(".weather-icon");
    if (data.weather[0].main == 'Clear')
        icon.src = 'images/clear.png'
    if (data.weather[0].main == 'Clouds')
        icon.src = 'images/clouds.png'
    if (data.weather[0].main == 'Drizzle')
        icon.src = 'images/drizzle.png'
    if (data.weather[0].main == 'Mist')
        icon.src = 'images/mist.png'
    if (data.weather[0].main == 'Rain')
        icon.src = 'images/rain.png'
    if (data.weather[0].main == 'Snow')
        icon.src = 'images/snow.png'
    if (data.weather[0].main == 'Wind')
        icon.src = 'images/wind.png'




}

async function countryCode(name)
{
    const response = await fetch(URlCountry + name);
    var data = await response.json();
    console.log(data);
    let tempCode = data[0].alpha2Code;

    nationCode = tempCode;
    //console.log(nationCode)
    checkweather2(input.value, nationCode);
}



searchButton.addEventListener('click', function () {
    if (switchInput == 0)
    {
        country = input.value;
        input.value = ''
        input.placeholder = 'Enter City name'
        switchInput = 1
        document.querySelector("#countryButton").style.display = 'block'
        document.querySelector(".switchLocations").innerHTML = country;     

        return;
    }
    else
    {
        countryCode(country)
        
         console.log(nationCode + 'hi');
        //checkweather2(input.value, nationCode);
    }
                                             });


input.addEventListener('keypress', function (event) {  // searches if user presses enter

    if (event.keyCode === 13) {

        searchButton.click();
    }
                                                    });


countryButton.addEventListener('click',function(){
    input.value = ''
    input.placeholder = 'Enter Country name'
    document.querySelector("#countryButton").style.display = 'none'
    switchInput = 0
})
