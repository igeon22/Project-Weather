
// import '../sass/styles.scss';
import  "./style.css";

var searchField = document.querySelector(".w-input")
var searchBtn = document.querySelector(".w-btn")

var Container = document.querySelector(".w-container")
var title = document.querySelector(".w-title")
var image = document.querySelector(".w-im")
var temp = document.querySelector(".w-temp")
var firstInfos = document.querySelector(".w-first")
var secInfos = document.querySelector(".w-sec")
var errorDisplay = document.querySelector(".err")
var search = ""

searchBtn.addEventListener("click",(e)=>{
	errorDisplay.textContent = "Searching..."
	if(searchField.validity.valid){
		e.preventDefault()
		search = `https://api.openweathermap.org/data/2.5/weather?q=${searchField.value}&APPID=5cb78cf7e8162a357ceef3ffbb46c9a4`
		Search(search)
		
	}
})


function Search(link){
	// fetch(`https://api.openweathermap.org/data/2.5/weather?q=Libye&APPID=5cb78cf7e8162a357ceef3ffbb46c9a4`)
	fetch(link)
	
	.then(function(response) {

		return response.json();
		})
	.then(function(response){
		errorDisplay.textContent = ""
		title.textContent = response.name +", "+ response.sys.country
		temp.textContent = Math.round((parseFloat(response.main.temp)-273.15)) + "°C"
		let feelsLikeTemp =  Math.round((parseFloat(response.main.feels_like)-273.15))
		DisplayImage(response.weather[0].main)
		firstInfos.textContent = `Feels like: ${feelsLikeTemp} °C|${response.weather[0].main}`
		secInfos.textContent = `Wind Speed: ${response.wind.speed}m/s|Humidity: ${response.main.humidity}%`
		searchField.value = ""
		
	})
	.catch(()=>{
		
		errorDisplay.textContent = "There's an error somewhere. Try Again!"
	})

}



function DisplayImage(target){
	if(target == "Clouds" || target == "Fog"){
		image.src = "./cloud.svg"
	}
	else if(target == "Rain"){
		image.src = "./rain.svg"
	}
	else if(target == "Snow"){
		image.src = "./snow.svg"
	}
	else if(target == "Clear"){
		image.src = "./clear.svg"
	}
	else if(target == "Mist" || target == 'Drizzle'){
		image.src = "./haze.svg"
	}
	else if(target == "Thunderstorm"){
		image.src = "./storm.svg"
	}
	else{
		image.src = "./clear.svg"
	}
	
}