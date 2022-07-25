import React from "react";

// Styles
import "/src/styles/Main.scss";

// Components
import InputSearch from "./InputSearch";
import ResultNode from "./ResultNode";


class Main extends React.Component {

    state = {weather: {}};

    // Function to lift weather data from InputSearch
    liftingWeather = (weather) => this.setState({weather: weather});

    render() {
        return (
            <main>
                Нажмите для просмотра погоды по вашему текущему местоположению.
                <InputSearch liftingWeather={this.liftingWeather.bind(this)}/>
                <ResultNode weather={this.state.weather}/>
            </main>
        );
    }
}

export default Main;
