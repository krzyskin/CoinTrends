import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';


class Chart extends React.Component {


    render() {
        console.log(this.props.time);
        return (
            <div className="chart">
                <Line
                    data={{
                        labels: this.props.time,
                        datasets: [{
                            label: "My First dataset",
                            //linia
                            //borderDash: [3, 3], //jezeli ustawione to przerywana linia
                            borderColor: 'rgba(236,115,87, 0.7)',
                            pointBorderColor: 'rgba(236,115,87, 0.7)',
                            borderWidth: 2,
                            //kolor tla i legendy
                            fill: true, //czy wypelnic zbior
                            backgroundColor: 'rgba(236,115,87, 0.1)', //wplywa tez na kolor w legendzie
                            //ustawienia punktu
                            pointRadius: 4,
                            pointBorderWidth: 1,
                            pointBackgroundColor: 'rgba(255,255,255,1)',
                            //ustawienia punktu hover
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 3,
                            pointHoverBackgroundColor: 'rgba(255,255,255,1)',
                            pointHoverBorderColor: 'rgba(236,115,87, 1)',
                            data: this.props.average
                        }]
                    }}
                    width={600}
                    height={400}
                    options={{
                        maintainAspectRatio: false
                    }}

                />
            </div>
        )
    }
}

class DataButton extends React.Component {

    render() {
        return (
            <button onClick={this.props.getData}>Get Data</button>
        )
    }
}


class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            time: [],
            average: [],
            error: undefined
        }
    }

    getData = (e) => {
        e.preventDefault();
        let tabAverageB = [];
        let tabTimeB = [];
        fetch('https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=alltime&format=json').then(r => r.json()).then(data => {
            //console.log(data);
            for (let i = 0; i < data.length; i++) {

                tabAverageB.push(data[i].average);
                tabTimeB.push(data[i].time);

            }
            console.log(tabAverageB);
            console.log(tabTimeB);
            this.setState({
                time: tabTimeB,
                average: tabAverageB
            })
        }).catch(e => {
            console.log('Błąd!', e)
        });
    };

    render() {

        return (
            <div>
                <DataButton getData={this.getData}/>

                <Chart time={this.state.time}
                       average={this.state.average}
                       error={this.state.error}/>
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