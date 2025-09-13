
// const topweatherEl = document.getElementById('top-weather');
// const selectEl = document.querySelector('.select-city') ;


var latitude = 64.15 ;
var longitude = -21.94 ;
var data = '' ;
var towns=[] ;
let regionNum = 0 ;
let weatherMode = false ;
let cent_coords = [[44.651,-63.5923],[40.6782, -73.9442]];
let wmodata_ok ;

fetch ('data/descriptions.json')
        
        .then(res =>res.json()).then (wmodata=> {
            console.log(wmodata[0].day) ;
            wmodata_ok = wmodata ;  
        }) ;

// var selectHTML = function loadSelect(){

    
//     $ajaxUtils.sendGetRequest ('data/itin.txt', function(responseText){
//         console.log(responseText);
//         var lines = responseText.split('\n');
        
//         for (var icity=1 ; icity<lines.length; icity++){
//             var cells = lines[icity].split(',');
//             let town={
//                 "id": cells[0],
//                 "name": cells[2],
//                 "lat":cells[4],
//                 "lon":cells[5]
                
//             };
//             towns.push(town);
//             var selEl = document.createElement('option');
//             selEl.value= cells[0] ;
//             selEl.text=cells[2];
//             selectEl.appendChild(selEl);
//             selectEl.value = 1 ;
            
//         };
//     },false);
// }

var updateWeather = function getWeather (latitude, longitude){
    // var loc = navigator.geolocation.getCurrentPosition((success)=>{
    //     let {latitude,longitude} = success.coords ;
        // console.log ("0  "+latitude+" "+longitude)
        latitude = latitude * 1. ;
        longitude = longitude * 1. ;
        console.log (latitude+ "  "+ longitude )
        fetch(`https://api.open-meteo.com/v1/forecast?wind_speed_unit=mph&timezone=auto&weather_code,precipitation_unit=inch&temperature_unit=fahrenheit&latitude=${latitude}&longitude=${longitude}&current=precipitation,temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max`)
        // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly,minutely&appid=${apikey}`)
        .then(res =>res.json()).then (data=> {
            showWeatherData(data) ;
                
            }) 

        
        // console.log (wdata) ;
        
        
};


function showWeatherData (data){
    console.log(data);
    let curicon = "" ;
    let day1icon = "" ;
    let day2icon = "" ;
    let day3icon = "" ;
    
    console.log (wmodata_ok[0].day.image) ;

    let temp = data.daily.temperature_2m_max;
    let outstring = 'Maxstring : '+temp+' '+regionNum ;
    let curtime = data.current.time ;
    let curtemp = "Temp : " + data.current.temperature_2m ;
    let curwind = "Wind Speed : "+data.current.wind_speed_10m ;
    let currelh = "Relative Humidity : " + data.current.relative_humidity_2m ;
    let curprecip ="Precip past hour : " + data.current.precipitation  ;
    
    curicon=wmodata_ok[data.daily.weather_code[0]].day.image ;
    curdesc=wmodata_ok[data.daily.weather_code[0]].day.description ;
    day1desc=wmodata_ok[data.daily.weather_code[1]].day.description ;
    day2desc=wmodata_ok[data.daily.weather_code[2]].day.description ;
    day3desc=wmodata_ok[data.daily.weather_code[3]].day.description ;
    day1icon=wmodata_ok[data.daily.weather_code[1]].day.image ;
    day2icon=wmodata_ok[data.daily.weather_code[2]].day.image ;
    day3icon=wmodata_ok[data.daily.weather_code[3]].day.image ;
    
    let day1time = data.daily.time[1];
    let day2time = data.daily.time[2];
    let day3time = data.daily.time[3];
    let day1precip = "Precip : " + data.daily.precipitation_sum[1] ;
    let day1temphi = "Temp High : "+data.daily.temperature_2m_max[1] ;
    let day1templo = "Temp Low  : " + data.daily.temperature_2m_min[1] ;
    let day2precip = "Precip : " + data.daily.precipitation_sum[2] ;
    let day2temphi = "Temp High : "+data.daily.temperature_2m_max[2];
    let day2templo = "Temp Low  : " + data.daily.temperature_2m_min[2];
    let day3precip = "Precip : " + data.daily.precipitation_sum[3] ;
    let day3temphi = "Temp High : "+data.daily.temperature_2m_max[3];
    let day3templo = "Temp Low  : " + data.daily.temperature_2m_min[3];
    
    mainEl.innerHTML = `
    <div><h2>Weather for Town</h2><div>
    <div class="weather-tile">

    <div class="weather-item-first">
        <h4>Currently</h4>
        <img src=${curicon}  class="weather-icon" alt='Icon depicting current weather.'>
        <div>${curdesc}</div>
        <div>${curtime}</div>
        <div>${curtemp}&#176;F</div>
        <div>${curprecip}"</div>
        <div>${currelh}%</div>
        <div>${curwind} MPH</div>

    </div>
    <div class="weather-item">
        <h4>Tomorrow: </h4>
        <img src=${day1icon}  class="weather-icon" alt='Icon depicting tomorrow weather.'>
        <div>${day1desc}</div>
        <div>${day1time}</div>
        <div>${day1templo}&#176;F</div>
        <div>${day1temphi}&#176;F</div>
        <div>${day1precip}"</div>
    </div>
    <div class="weather-item">
        <h4>Day 2: </h4>
        <img src=${day2icon}  class="weather-icon" alt='Icon depicting tomorrow weather.'>
        <div>${day2desc}</div>
        <div>${day2time}</div>
        <div>${day2templo}&#176;F</div>
        <div>${day2temphi}&#176;F</div>
        <div>${day2precip}"</div>
    </div>
    <div class="weather-item">
    <h4>Day 3: </h4>
    <img src=${day3icon}  class="weather-icon" alt='Icon depicting tomorrow weather.'>
    <div>${day3desc}</div>
    <div>${day3time}</div>
    <div>${day3templo}&#176;F</div>
    <div>${day3temphi}&#176;F</div>
    <div>${day3precip}"</div>
</div>

    </div>

   `
   // <div class="weather-item">
//     <div>Temp</div>
//     <div>${temp} &#176;F</div>
//     </div>
//     <div class="weather-item">
//         <div>Humidity</div>
//         <div>${humidity}%</div>
//     </div>
//     <div class="weather-item">
//         <div>Pressure</div>
//         <div>${pressure} MBars</div>
//     </div>
//     <div class="weather-item">
//         <div>Wind Speed</div>
//         <div>${wind_speed} MPH</div>
//     </div>`;
//     // <div class="weather-item">
//     //     <div>Sunrise</div>
        
//     //     <div>${sunrise_convert}</div>
//     // </div>
}


// function showWeatherData (data){
//     // get current conditions from data.current
//     let {humidity, pressure, sunrise, wind_speed, temp} = data.current ;     
//     const curdesc = data.current.weather[0].description ;

//     // var selecthtml = `<div class="weather-select">
//     // <label>Weather for : </label>
//     // <select class="select-city" >`;

    


//     topweatherEl.innerHTML =
    
//     // <div class="weather-select">
//     //     <label>Weather for : </label>
//     //     <select class="select-city" >

//     //     </select> 
//     //     <input type="Submit" value="Update"> 

//     // </div>
//     `
//     <br>
//     <div class="weather-item">
//     <div>Currently: </div>
//     <div>${curdesc}</div>
//     </div>
//     <div class="weather-item">
//     <div>Temp</div>
//     <div>${temp} &#176;F</div>
//     </div>
//     <div class="weather-item">
//         <div>Humidity</div>
//         <div>${humidity}%</div>
//     </div>
//     <div class="weather-item">
//         <div>Pressure</div>
//         <div>${pressure} MBars</div>
//     </div>
//     <div class="weather-item">
//         <div>Wind Speed</div>
//         <div>${wind_speed} MPH</div>
//     </div>`;
//     // <div class="weather-item">
//     //     <div>Sunrise</div>
        
//     //     <div>${sunrise_convert}</div>
//     // </div>
//     // <div class="weather-item">
//     //     <div>Sunset</div>
//     //     <div>${sunset_convert}</div>
//     // </div>` ;

// }




// function newcity () {
//     let index = selectEl.value ;
//     // console.log ("index is "+index);
//     // console.log ("town arr lat is "+townArr[index].lat);
//     townLat= towns[index].lat ;
//     townLon = towns[index].lon ;
//     console.log("townLat is ",townLat);
//     updateWeather (townLat, townLon) ;

// }

