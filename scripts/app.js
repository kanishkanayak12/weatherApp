const cityForm=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.details');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img');
const currTime=document.querySelector('.currTime');

const updateUI=(data)=>{
    const cityDets=data.cityDets;
    const weather=data.weather;

    details.innerHTML=`
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span> 
    </div>
    `;
    
    const iconSrc = `images/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc=null;
    let presentTime=weather.LocalObservationDateTime;
    currTime.innerHTML=`<span class="currTime">${presentTime}</span>`;

    if(weather.IsDayTime){
        timeSrc='images/day.svg';
    }else{
        timeSrc='images/night.svg';
    }

    time.setAttribute('src',timeSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}; 
 


const updateCity=async(city)=>{
    const cityDets=await getCity(city);
    const weather=await getWeather(cityDets.Key);

    return { cityDets , weather };
};


cityForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const city=cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
    .then(data=>updateUI(data))
    .catch(err=>console.log(err));
}); 