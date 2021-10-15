import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { IPointRenderEventArgs, ILoadedEventArgs, ChartTheme, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { forecastData } from "src/app/forecast-data";

import * as xlsx from 'xlsx';
// core components

@Component({
    selector: 'forecast-root',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.css'],
    // encapsulation: ViewEncapsulation.None
})

export class ForeCastComponent implements OnInit {

    showHTML = false

    states:any = {}

    @ViewChild('chart') public chart: ChartComponent;

    constructor() {

    }

    ngOnInit() {
        const data = forecastData.split('\n')
        for(var i = 0; i < data.length; i++) {

            const ln = data[i].split(',')
            var start_date = ""
            var end_date = ""
            var count = 0
            var casesCount = 0

            const cases = Number(ln[0])
            const date = ln[1]
            // const state = ln[3]
            const county = ln[4]

            if(this.states[county] === undefined) {
                if(i !== 0) {
                    const ln = data[i - 1].split(',')
                    const state = ln[3]
                    const county = ln[4]
                    const avg = casesCount/count
                    this.data.push({state: state, county: county, dates: `${start_date}-${end_date}`, avg:avg, size: avg/100000})
                }


                this.states[county] = cases
                casesCount = cases
                count = 1
                start_date = date
            } else {
                this.states[county] = this.states[county] + cases
                casesCount = casesCount + cases
                count = count + 1
                end_date = date
            }
            // this.chart.refresh()
            if(i === data.length - 1) {
                console.table(this.data)
                this.chart.refresh()
            }

        }
        // this.chart.refresh()
    }

    public data: Object[] = []

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'County',
        minimum: 60,
        maximum: 100,
        interval: 5
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Avg Estimated Cases',
        minimum: 0,
        maximum: 10,
        interval: 2.5
    };

    public marker: Object = {
        dataLabel: { name: 'county' }
    };
    //Initializing Tooltip
    public tooltip: Object = {
        enable: true,
        format: "${point.county}<br/>State : <b>${point.state}</b>" +
            "<br/>Dates : <b>${point.dates}</b><br/>Average Estimate : <b>${point.avg}</b>"
    };
    public minRadius: number = 3;
    public maxRadius: number = Browser.isDevice ? 6 : 8;
    public pointRender(args: IPointRenderEventArgs): void {
        let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
            '#ea7a57', '#404041', '#00bdae'];
        let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
            '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
        let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
            '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
        let highContrastColors: string[] = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773', '#BA98FF',
            '#FA83C3', '#00C27A', '#43ACEF', '#D681EF', '#D8BC6E'];
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        } else if (selectedTheme === 'highcontrast') {
            args.fill = highContrastColors[args.point.index % 10];
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    };

    public legend: Object = {
        visible: false
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public width: string = Browser.isDevice ? '100%' : '60%';

    public title: string = 'Facebook Covid-19 Forecasted Data';
}

