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
                            label: "BTCUSD",
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
                                label: "ETHUSD",
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
                                label: "LTCUSD",
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
            time: undefined,
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
        let arrTimeBtc = [];
        let arrTimeE = [];
        let arrAverageE = [];
        let arrTimeL = [];
        let arrAverageL = [];

        fetch('https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=alltime&format=json').then(r => r.json()).then(data => {
            //console.log(data);
            for (let i = 0; i < data.length; i++) {
                //dataArr.push(data[i]);

                arrTimeBtc.push(data[i].time);

            }

            let index = arrTimeBtc.indexOf("2016-03-07 00:00:00");

            data.splice(index);


            let newArr = [];
            for (let i = 0; i < data.length - 1; i++) {


                let curr = data[i];
                let next = data[i + 1];

                let date = new Date(curr.time);
                let endDate = new Date(next.time);

                date = date.setDate(date.getDate() - 1);
                endDate = endDate.setDate(endDate.getDate());

                if (date == endDate) {
                    newArr.push(curr);
                }


                else if (date !== endDate) {

                    function fillDates(start, end) {
                        let output = [];

                        do {
                            output.push({
                                "time": start.toISOString().substring(0, 10),
                                "average": undefined
                            });
                            start.setDate(start.getDate() - 1);

                        } while (start >= end);

                        for (let i = 0; i < output.length; i++) {
                            newArr.push(output[i]);
                        }
                    }

                    let start = new Date(date);
                    let end = new Date(endDate);
                    fillDates(start, end);
                }

            }
            newArr.push(data[data.length - 1]);


            for (let i = 0; i < newArr.length; i++) {
                arrTimeB.push(newArr[i].time.substring(0, 10));
                arrAverageB.push(newArr[i].average);
            }

            this.setState({
                time: arrTimeB,
                average: arrAverageB
            })
        }).catch(e => {
            console.log('Błąd!', e)
        });

        fetch('https://apiv2.bitcoinaverage.com/indices/global/history/ETHUSD?period=alltime&format=json').then(r => r.json()).then(data => {
            //console.log(data);

            let newArr = [];
            for (let i = 0; i < data.length - 1; i++) {


                let curr = data[i];
                let next = data[i + 1];

                let date = new Date(curr.time);
                let endDate = new Date(next.time);

                date = date.setDate(date.getDate() - 1);
                endDate = endDate.setDate(endDate.getDate());

                if (date == endDate) {
                    newArr.push(curr);
                }


                else if (date !== endDate) {

                    function fillDates(start, end) {
                        let output = [];

                        do {

                            output.push({
                                "time": start.toISOString().substring(0, 10),
                                "average": undefined
                            });
                            start.setDate(start.getDate() - 1);

                        } while (start >= end);

                        for (let i = 0; i < output.length; i++) {
                            newArr.push(output[i]);
                        }
                    }

                    let start = new Date(date);
                    let end = new Date(endDate);
                    fillDates(start, end);
                }

            }
            newArr.push(data[data.length - 1]);

            for (let i = 0; i < newArr.length; i++) {
                arrAverageE.push(newArr[i].average);
            }

            this.setState({
                averageE: arrAverageE
            })
        }).catch(e => {
            console.log('Błąd!', e)
        });

        fetch('https://apiv2.bitcoinaverage.com/indices/global/history/LTCUSD?period=alltime&format=json').then(r => r.json()).then(data => {
            console.log(data);

            let newArr = [];
            for (let i = 0; i < data.length - 1; i++) {

                let curr = data[i];
                let next = data[i + 1];

                let date = new Date(curr.time);
                let endDate = new Date(next.time);

                date = date.setDate(date.getDate() - 1);
                endDate = endDate.setDate(endDate.getDate());

                if (date == endDate) {
                    newArr.push(curr);
                }


                else if (date !== endDate) {

                    function fillDates(start, end) {
                        let output = [];

                        do {

                            output.push({
                                "time": start.toISOString().substring(0, 10),
                                "average": undefined
                            });
                            start.setDate(start.getDate() - 1);

                        } while (start >= end);

                        for (let i = 0; i < output.length; i++) {
                            newArr.push(output[i]);
                        }
                    }

                    let start = new Date(date);
                    let end = new Date(endDate);
                    fillDates(start, end);
                }

            }
            newArr.push(data[data.length - 1]);

            //console.log(newArr);

            for (let i = 0; i < newArr.length; i++) {
                //arrTimeE.push(newArr[i].time.substring(0, 10));
                arrAverageL.push(newArr[i].average);
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