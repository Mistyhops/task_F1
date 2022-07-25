import React from "react";

// Styles
import "/src/styles/App.scss";

// Components
import Header from "./Header";
import Main from "./Main";


class App extends React.Component {
    render() {
        return (
            <>
                <Header/>
                <Main/>
            </>
        );
    }
}

export default App;
