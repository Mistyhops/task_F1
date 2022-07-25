const resultNode = document.getElementById("result");


// if ("geolocation" in navigator) {
//     console.log(navigator);
//     navigator.geolocation.getCurrentPosition(position => {
//         const { coords } = position;
//         console.log(coords);
//     })
// }


function getCoords() {

    function displayResult(data) {
        resultNode.textContent = `Latitude: ${data.latitude}, longitude: ${data.longitude}`;
    }

    function getWeatherData(coords) {
        const lat = coords.latitude;
        const lon = coords.longitude;

        const APIKey = "5d8489aec6e9a3d8cf062a4721fe396b";
        const APILink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;

        console.log(APILink);

        fetch(APILink)
            .then(res => res.json())
            .then(data => console.log(data));

    }

    function onSuccess(geolocationData) {
        const result = {
            latitude: geolocationData.coords.latitude,
            longitude: geolocationData.coords.longitude,
        }

        displayResult(result);

        return getWeatherData(result);
    }

    function onError() {
        resultNode.textContent = "Error"
    }

    if (!navigator.geolocation) {
        resultNode.textContent = "Doesnt support geolocation";
    } else {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
}

// getCoords();

const APIKey = '5d8489aec6e9a3d8cf062a4721fe396b';
const lat = 55.8673761;
const lon = 37.5380633;

const APILink = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=\
${lon}&appid=${APIKey}&units=metric&lang=ru`;

fetch(APILink).then(res => res.json())
    .then(
        (data) => {
            console.log(data);

            const result = {
                region: data.city.name,
                weather: data.list.map(item => Object({
                    date: item.dt,
                    description: item.weather[0].description,
                    temp: item.main.temp,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                    feels_like: item.main.feels_like,
                })),
            };

            result.weather.map(item => {
                console.log(item.index);
            })
        }
    );

// let a = 1;
// a++;
// a++;
// a === 1 ? console.log(1) : console.log(2);
