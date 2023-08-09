//getting most html element inorder to use them when displaying and updating fetched info
let searchInput = document.querySelector('#search-input')
let main = document.querySelector('main')
let region = document.querySelector('.region')
let date = document.querySelector('.date')
let temp = document.querySelector('.temp')
let image = document.querySelector('#image')
let condition = document.querySelector('.text-condition')
let sunRise = document.querySelector('#sunrise')
let sunSet = document.querySelector('#sunset')
let windSpeed = document.querySelector('#wind-speed')
let windDirection = document.querySelector('#wind-direction')
let visibility = document.querySelector('#visibility')
let humidity = document.querySelector('#humidity')
let uv = document.querySelector('#uv')
let cover = document.querySelector('#cloud-cover')
let hourlySection = document.querySelector('.forecast-details-hours')
let hourlyTemp = document.querySelector('.forecast-details-temp')
let searchBtn = document.querySelector('#search-btn')
let error = document.querySelector('#error')

//declaring async fectData() function

async function fetchData(){
    //getting input value (city name) to pass in url api
    let city = searchInput.value
    const key = '6d9e65dac56d40bf88b144355230508'
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${encodeURIComponent(city)}&days=1&aqi=no&alerts=no`
    
    //fetching data
    let promise = await fetch(url, {mode: 'cors'})

    //handling error if user passes in invalid location
     if(!promise.ok){
        main.style.display = 'none' ;
        error.style.display = 'block'
        searchInput.value = ''
     }else if(promise.status == 200){
        error.style.display = 'none'
        main.style.display = 'block'

        //converting resolved json data into object 
        let result = await promise.json();

        //displaying current weather data on webpage accodingly.
        searchInput.value = ''
        time = result.location.localtime
        region.textContent = `${result.location.country}, ${result.location.name}`
        date.textContent = `${ time}`
        temp.textContent = `${result.current.temp_c}°C`
        image.src = result.current.condition.icon
        condition.textContent = result.current.condition.text
        sunRise.textContent = result.forecast.forecastday[0].astro.sunrise
        sunSet.textContent = result.forecast.forecastday[0].astro.sunset
        windDirection.textContent = result.current.wind_dir
        windSpeed.textContent = `${result.current.wind_kph} kph`
        visibility.textContent = `${result.current.vis_km} km`
        humidity.textContent = result.current.humidity
        uv.textContent = result.current.uv
        cover.textContent = `${result.current.cloud}%`

        //getting forecast array of daily hours
        const foreCastArr = result.forecast.forecastday[0].hour

        //lopping through foreCastArr by creating new paragraph in each iteration and then pass iterated hour as textContent of the created paragraph
        foreCastArr.forEach(item => {
            let hour = item.time.slice(11)
            let timePara = document.createElement('p')
            timePara.textContent = hour
            hourlySection.appendChild(timePara)
         });
    
}
}