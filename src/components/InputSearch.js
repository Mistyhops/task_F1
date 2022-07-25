import React from "react";
import axios from "axios";

// Styles
import "/src/styles/InputSearch.scss";


class InputSearch extends React.Component {

    constructor(props) {
        super(props);
        this.getGeolocation = this.getGeolocation.bind(this);
    }

    // Function to lift weather data to Main.js
    liftingWeather = this.props.liftingWeather;

    // Function to get user geolocation
    getGeolocation(e) {

        const onSuccess = (geolocationData) => {
            const result = {
                latitude: geolocationData.coords.latitude,
                longitude: geolocationData.coords.longitude,
            };
            this.getWeather(result, e.target.innerText);
        };

        const onError = () => {
            this.liftingWeather({type: "error"});
        };

        if (!navigator.geolocation) {
            this.liftingWeather({type: "no_support"});
        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }

    // Function to get weather data from API
    getWeather(coords, type) {
        const APIKey = '5d8489aec6e9a3d8cf062a4721fe396b';

        function getDate(time) {
            const date = new Date(time * 1000);

            return date.toLocaleString("ru-RU", {timeZone: "UTC"});
        }

        switch (type) {
            case "Показать текущую погоду": {
                const APILink = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=\
${coords.longitude}&appid=${APIKey}&units=metric&lang=ru`;

                axios.get(APILink)
                    .then((data) => {
                        const weatherData = data.data;

                        const result = {
                            region: weatherData.name,
                            sunrise: getDate(weatherData.sys.sunrise),
                            sunset: getDate(weatherData.sys.sunset),
                            weather: {
                                description: weatherData.weather[0].description,
                                temp: weatherData.main.temp,
                                temp_min: weatherData.main.temp_min,
                                temp_max: weatherData.main.temp_max,
                                feels_like: weatherData.main.feels_like,
                                humidity: weatherData.main.humidity,
                                wind_speed: weatherData.wind.speed,
                            },
                            type: "current_weather",
                        };

                        this.liftingWeather(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        this.liftingWeather({type: "error"});
                    });

                break;
            }

            case "Показать прогноз погоды на 5 дней": {
                const APILink = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=\
${coords.longitude}&appid=${APIKey}&units=metric&lang=ru`;

                axios.get(APILink)
                    .then((data) => {
                        const weatherData = data.data;

                        const result = {
                            region: weatherData.city.name,
                            weather_list: weatherData.list.map(item => Object({
                                date: getDate(item.dt),
                                description: item.weather[0].description,
                                temp: item.main.temp,
                                temp_min: item.main.temp_min,
                                temp_max: item.main.temp_max,
                                feels_like: item.main.feels_like,
                            })),
                            type: "5days_forecast",
                        };

                        this.liftingWeather(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        this.liftingWeather({type: "error"});
                    });

                break;
            }
        }
    }

    render() {
        return (
            <>
                <div className={"input-search"}>
                    <button onClick={this.getGeolocation}>Показать текущую погоду</button>
                    <button onClick={this.getGeolocation}>Показать прогноз погоды на 5 дней</button>
                </div>
            </>
        );
    }
}

export default InputSearch;
