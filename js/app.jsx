import React from 'react';
import ReactDOM from 'react-dom';


class Data extends React.Component {

    render() {
        return (
            <div className="info">
                <p><span>czas</span>{this.props.time}</p>
                <p><span>średnia</span>{this.props.average}</p>
            </div>
        )
    }
}

class DataButton extends React.Component {

    render() {
        return (
            <button onClick={this.props.getData}>Get Weather</button>
        )
    }
}


class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            time: undefined,
            average: undefined,
            error: undefined
        }
    }

    getData = (e) => {
        e.preventDefault();

        fetch('https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=daily&?format=json\n').then(r => r.json()).then(data => {
            console.log(data);
        }).catch(e => {
            console.log('Błąd!', e)
        });
    };

    render() {

        return (
            <div>
                <DataButton getData={this.getData}/>
                <Data
                    time={this.state.time}
                    average={this.state.average}
                    error={this.state.error}
                />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',
    function () {
        ReactDOM.render(
            <App/>,
            document.getElementById('app')
        );
    });