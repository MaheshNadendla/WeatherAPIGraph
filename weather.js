var temp = document.getElementById('temp');
var cityName = document.getElementById('city');
var humidity = document.getElementById('humidity');
var windspeed = document.getElementById('windspeed');
var searchinput = document.getElementById('searchinput');
var serchbox = document.getElementById('serchbox');
var body_img = document.getElementById('body_img');
var body_data = document.getElementById('body_data');
var deatil = document.getElementById('deatil');
var error = document.getElementById('error');

document.querySelector('.BgVedio').playbackRate = 1.0;

// function clearCanvas() {
//     const canvas = document.getElementById('weatherGraph');
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// function clearCanvas2() {
//     const canvas2 = document.getElementById('weatherGraph2');
//     const ctx = canvas2.getContext('2d');
//     ctx.clearRect(0, 0, canvas2.width, canvas2.height);
// }

let myChart,myChart2;

async function checkWeather(city) {
    let Upi_key = 'f27b269d54e4fa1e72993364a80fa8bd';
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Upi_key}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        let data = await response.json();
        console.log(data);

        temp.innerHTML = Math.floor(data.main.temp) + '°C';
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + "%";
        windspeed.innerHTML = data.wind.speed + 'km/h';
        console.log(data);

        switch (data.weather[0].main) {
            case 'Clouds':
                body_img.src = 'cloud.png';
                clearInterval(Gap);
                changeVedio('clouds.mp4'); 
                break;
            case 'Clear':
                body_img.src = 'clear.png';
                clearInterval(Gap);
                changeVedio('Clearsky.mp4');
                break;
            case 'Rain':
                body_img.src = 'rain.png';
                clearInterval(Gap);
                changeVedio('Rain2.mp4');
                break;
            case 'Drizzle':
                body_img.src = 'drizzle.png';
                clearInterval(Gap);
                changeVedio('Dizzle.mp4');
                break;
            case 'Mist':
                body_img.src = 'misty.png';
                clearInterval(Gap);
                changeVedio('Mist.mp4');
                break;
            case 'Haze':
                body_img.src = 'haze.png';
                clearInterval(Gap);
                changeVedio('Haze.mp4');
                break;
            default:
                body_img.src = '404.png';
                clearInterval(Gap);
                changeVedio('Rain3.mp4');
        }

        body_data.style.display = 'flex';
        deatil.style.display = 'flex';
        error.style.display = 'none'; // Hide error message

        document.querySelector('#ColorGraph').style.display="block";

        if (myChart) {
            myChart.destroy();
        }

        if (myChart2) {
            myChart2.destroy();
        }


        const ctx = document.getElementById('weatherGraph').getContext('2d');

        myChart =new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['humidity','pressure','grnd_level',                'sea_level'],

            datasets: 
            [{
                label: 'Weather Level',
                data: [data.main.humidity,data.main.pressure,
                    data.main.grnd_level,data.main.sea_level
                ],
                backgroundColor: [
                    'green',
                    'red',
                    'yellow',
                    'pink'
                    
                ],
                borderColor: [
                    'red',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 12, 235, 1)',
                    'rgba(54, 12, 435, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
        });

        const ctx2 = document.getElementById('weatherGraph2').getContext('2d');

        
        myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['temp', 'mintemp','maxtemp','humidity'],
            datasets: 
            [{
                label: 'Weather Temp',
                data: [data.main.temp,data.main.temp_min
                    ,data.main.temp_max,data.main.humidity
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'aqua',
                    'rgba(54, 12, 235, 1)',
                    'green'
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'red'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
        });


    } catch (err) {
        startInterval();
        error.innerHTML = err.message;
        error.style.display = 'block'; // Show error message
        document.querySelector('#ColorGraph').style.display="block";
        body_data.style.display = 'none';
        deatil.style.display = 'none';
        body_img.src = '404.png';
    }
}



serchbox.addEventListener('click', () => {
    let cityIn = searchinput.value;
    checkWeather(cityIn);
});

let count=0;


function changeVedio(clip)
{

    var video = document.querySelector('.BgVedio');
    var source = document.querySelector('.videoSource');
        
    source.src = clip;
    video.load();


}

let Gap;
function startInterval()
{
        clearInterval(Gap);
        Gap = setInterval(() => {

        count=count+1;
        console.log(count);

        if (count%6==1) {
            changeVedio('Rain2.mp4'); 
        }

        else if (count%6==2) {
            changeVedio('Mist.mp4'); 
        }

        else if (count%6==3) {
            changeVedio('Dizzle.mp4'); 
        }
        else if (count%6==4) {
            changeVedio('Clearsky.mp4'); 
        }
        else if (count%6==5) {
            changeVedio('Rain3.mp4'); 
        }
        else if (count%6==0) {
            changeVedio('clouds.mp4');
            count=0; 
        }
    }, 2500);

}

startInterval();
