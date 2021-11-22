// // api key
// 01cfaa66a3fa54a9e24c6ec7f9430473

// // api call 
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={01cfaa66a3fa54a9e24c6ec7f9430473}

// grab the user input
const input = document.querySelector('input')
const searchBtn = document.getElementById('searchBtn')
const cityNameEl = document.getElementById('name')
const cityTempEl = document.getElementById('temp')
const cityHumidityEl = document.getElementById('humid')
const cityUvindexEl = document.getElementById('uv')
const asideEl = document.querySelector('aside')
const searchesDiv = document.getElementById('searches')
let searches = localStorage.getItem('mySearches')
						? JSON.parse(localStorage.getItem('mySearches'))
						: localStorage.setItem('mySearches', JSON.stringify([]))
// if (searches) {
// 	searches = JSON.parse(localStorage.getItem('mySearches'))
// } else {
// 	localStorage.setItem('mySearches', JSON.stringify([]))
// }
function populateCities(cities) {
	let divArray = [...searchesDiv.children]
	if (searchesDiv.hasChildNodes()) {
		divArray.forEach(element => {
			element.remove()
		});
	}
	if (cities.length > 0) {
		cities.forEach(city => {
			let aEl = document.createElement('a')
			aEl.setAttribute('class', 'block mt-2 bg-green-400 text-center rounded p-1 search')
			aEl.innerText = city
			searchesDiv.appendChild(aEl)
		})
	}
}
populateCities(searches)
function handleSearch() {
	// let cityId = input.value.toUpperCase()
	let city = input.value.toUpperCase()
	let url = 'api.openweathermap.org/data/2.5/weather?q={getCityData}&appid=01cfaa66a3fa54a9e24c6ec7f9430473'
	
	if (cityId) {
		// make a fetch call => function
		getCityData(url)
	}
	
	input.value = ''
}
function getCityData(url) {
	fetch(url)
	.then(response => response.json())
	.then(data => {
		console.log('data: ', data);
		let city = data[0]
		populateData(city)
		let searches = JSON.parse(localStorage.getItem('mySearches'))
		searches.push(city.id)
		let uniqueSearches =Array.from(new Set(searches))
		console.log('uniqueSearches: ', uniqueSearches);
		localStorage.setItem('mySearches', JSON.stringify(uniqueSearches))
		// let aEl = document.createElement('a')
		// aEl.setAttribute('class', 'block mt-2 bg-gray-300 text-center rounded p-1')
		// aEl.innerText = city.id
		// asideEl.appendChild(aEl)
		populateCities(uniqueSearches)
	})
	.catch(err => {
		if (err) alert('bad input')
	})
}
function populateData(city) {
	// populate the main section with the data
	cityNameEl.textContent = `Name: ${city.name}`
	cityTempEl.textContent = `Price: ${city.temp}`
	cityHumidityEl.textContent = `Humidity: ${city.humid}`
	cityUvindexEl.textContent = `UV Index: ${city.uv}`
	
	let cityLogoEl = document.getElementById('logo')
	cityLogoEl.setAttribute('src', city.logo_url)
	cityLogoEl.setAttribute('alt', city.name + 'logo')
	cityLogoEl.removeAttribute('hidden')
}
function refetchCity(event) {
	if (event.target.classList.value.includes('search')) {
		let city = event.target.innerText
	
		let url = `api.openweathermap.org/data/2.5/weather?q={city}&appid=01cfaa66a3fa54a9e24c6ec7f9430473`
	
		getCityData(url)
	}
}
asideEl.addEventListener('click', refetchCity)
searchBtn.addEventListener('click', handleSearch)