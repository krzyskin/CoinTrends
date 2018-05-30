import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';


class Chart extends React.Component {


    render() {
        //console.log(this.props.time);
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
                        },
                            {
                                label: "My Second dataset",
                                borderColor: 'rgba(75,192,192, 0.7)',
                                pointBorderColor: 'rgba(75,115,87, 0.7)',
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

                                data: this.props.averageL
                            },
                            {
                                label: "My Third dataset",
                                borderColor: 'rgba(132,177,237, 0.7)',
                                pointBorderColor: 'rgba(132,115,87, 0.7)',
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

                                data: this.props.averageE
                            }
                        ]
                    }}
                    width={600}
                    height={400}
                    options={{
                        scales: {
                            yAxes: [{
                                type: 'logarithmic',
                                ticks: {
                                    min: 0,
                                    max: 20000
                                }
                            }]
                        }

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
            averageL: [],
            averageE: [],
            error: undefined
        }
    }

    getData = (e) => {
        e.preventDefault();
        let dataArr = [];
        let arrAverageB = [];
        let arrTimeB = [];
        let arrTimeE = [];
        let arrAverageE = [];
        let arrTimeL = [];
        let arrAverageL = [];
        fetch('https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=alltime&format=json').then(r => r.json()).then(data => {
            //console.log(data);
            for (let i = 0; i < data.length; i++) {
                dataArr.push(data[i]);
                arrAverageB.push(data[i].average);
                arrTimeB.push(data[i].time);
            }

            let index = arrTimeB.indexOf("2016-03-07 00:00:00");
            arrTimeB.splice(index);
            console.log(arrTimeB);
            //console.log(arrAverageB);
            //console.log(arrTimeB);
            this.setState({
                time: arrTimeB,
                average: arrAverageB
            })
        }).catch(e => {
            console.log('Błąd!', e)
        });

        fetch('https://apiv2.bitcoinaverage.com/indices/global/history/ETHUSD?period=alltime&format=json').then(r => r.json()).then(data => {
            //console.log(data);
            for (let i = 0; i < data.length; i++) {
                arrAverageE.push(data[i].average);
                arrTimeE.push(data[i].time);

            }

            this.setState({
                averageE: arrAverageE
            })
        }).catch(e => {
            console.log('Błąd!', e)
        });

        fetch('https://apiv2.bitcoinaverage.com/indices/global/history/LTCUSD?period=alltime&format=json').then(r => r.json()).then(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                arrAverageL.push(data[i].average);
                arrTimeL.push(data[i].time);

            }
            //console.log(arrTimeL);
            //console.log(arrAveragL);
            this.setState({
                averageL: arrAverageL
            })
        }).catch(e => {
            console.log('Błąd!', e)
        });

    };

    render() {

        return (
            <div>
                <DataButton getData={this.getData}/>

                <Chart
                    time={this.state.time}
                    average={this.state.average}
                    averageL={this.state.averageL}
                    averageE={this.state.averageE}
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