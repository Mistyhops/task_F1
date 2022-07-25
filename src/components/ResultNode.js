import React from "react";

// Styles
import "/src/styles/ResultNode.scss";


class ResultNode extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {(this.props.weather.type === "current_weather") ? <>
                    <p>Район: {this.props.weather.region}</p>
                    <p>Время восхода: {this.props.weather.sunrise}</p>
                    <p>Время заката: {this.props.weather.sunset}</p>
                    <p>Погода: {this.props.weather.weather.description}</p>
                    <p>Температура: {this.props.weather.weather.temp}&deg;C
                        ({this.props.weather.weather.temp_min}&deg;C-{this.props.weather.weather.temp_max}&deg;C)</p>
                    <p>Ощущается как: {this.props.weather.weather.feels_like}&deg;C</p>
                    <p>Влажность: {this.props.weather.weather.humidity}%</p>
                    <p>Ветер: {this.props.weather.weather.wind_speed} м/с</p>
                </> : (this.props.weather.type === "5days_forecast") ? <>
                    <p>Район: {this.props.weather.region}</p>
                    <ul>
                        {this.props.weather.weather_list.map(item => <li key={item.date}>
                            Погода на {item.date}: {item.description}. Температура: {item.temp}
                        </li>)}
                    </ul>
                </> : (this.props.weather.type === "error") ? <>
                    <p>Возникла ошибка</p>
                </> : (this.props.weather.type === "no_support") ? <>
                    <p>Браузер не поддерживает определение геолокации</p>
                </> : <></>}
            </>
        );
    }
}

export default ResultNode;
