'use strict'




document.addEventListener('DOMContentLoaded', event => {
    
     const initialIndexCity= 0 
    const initialIndexCountry= 1

    

    let countries = new Request('./data/countryprueba.json')
    let cities = new Request('./data/cities.json')

    
    fetch(countries)
        .then(response => response.json())
        .then(countries => {
           
            populateSelectList('#country', countries, 'code','name')
            const countryList = document.querySelector('#country')
            countryList.selectedIndex= initialIndexCountry

            fetch(cities)
                .then(response => response.json())
                .then(cities => {
                    populateSelectList('#cities', cities, 'name','name')
                    const cityList = document.querySelector('#cities')
                    cityList.selectedIndex= initialIndexCity
                    filterWeather(cities[initialIndexCity].lat,cities[initialIndexCity].lng)

                    cityList.addEventListener('change', e=>{
                        const list = e.target;
                        const item = list.options[list.selectedIndex]
                        filterWeather(cities[list.selectedIndex].lat,cities[list.selectedIndex].lng)
                        console.log(`Seleccionó el elemento [${list.selectedIndex}] - (${item.value})`)
                    })
                })

           
        })
    
})


function filterWeather(lat,lng){
    const apikey = '464151eb193d1f14dd3c3626fdafbeb6' //APIKEY ENTRE COMILLAS SIMPLES PREFERIBLEMENTE
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apikey}`
    const request = new Request(url)
       
    fetch(request)
        .then(response => response.json())
        .then(weather => showWeather(weather))
                   
}

function populateSelectList(selector, items = [], value = '', text = '') {
    let lista = document.querySelector(selector)
    lista.options.length = 0
    items.forEach(item => lista.add(new Option(item[text], item[value])))
}
function showWeather(weather) {
    console.log(weather)
    if(weather.cod == 200) {
        document.querySelector('#infow').innerHTML = ''
         createWeather(weather.main,weather.name)
    } else{
        console.log('Tenemos problemas')
    }        

}

function createWeather(main= {},name) {
    console.log(main);
    const weather=`      
    <h1 class="text-lg">${name? name:"Nombre no reconocido por la API"}</h1>
        <p class="text-lg">Temperatura: ${main.temp} Grados Kelvin</p>
        <p class="text-lg">Temperatura Máxima: ${main.temp_max} Grados Kelvin</p>
        <p class="text-lg">Temperatura Mínima: ${main.temp_min} Grados Kelvin</p>
        <p class="text-lg">Humedad: ${main.humidity} Grados Kelvin </p>
        
    `
    document.querySelector('#infow').insertAdjacentHTML('beforeend', weather)
}





