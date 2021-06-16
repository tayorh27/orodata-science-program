import { Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { africaMap, nigeriaMap, worldMap } from "../../world-map";
import * as $ from 'jquery'
import { MapsTheme, Legend, Maps, Bubble, Zoom, IBubbleRenderingEventArgs, MapsTooltip, ILoadEventArgs, DataLabel, ITooltipRenderEventArgs, ISelectionEventArgs, Selection, Highlight, } from '@syncfusion/ej2-angular-maps';
Maps.Inject(Legend, Bubble, MapsTooltip, Selection, DataLabel, Zoom);
import { DummyData } from '../../population-data';
import { HttpClient } from '@angular/common/http';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
// import { isNullOrUndefined } from '@syncfusion/ej2-base';

export interface Data { value?: number; }
export interface Vaccines {
  name: string//country name
  value: number//bubble size
  color: string//color
  total_vaccination: string
  total_vaccine_delivered?: string
  total_cost_vaccine?: string
  total_confirmed?: string
  total_death?: string
  total_recover?: string
  total_population?: string
  total_poverty_pop?: string
  date: string
  value_string: string
}
declare var require: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    // var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
    //   type: 'line',
    //   options: chartExample1.options,
    //   data: chartExample1.data
    // });
    ////////////////////////////////////////
    new DummyData().mapData.forEach(dt => {
      const vac: Vaccines = {
        date: "",
        color: "#333333",// this.generateColor(),
        name: dt.x,
        total_vaccination: this.formatNumbers(dt.y),
        value: dt.y,//this.bubblesize(dt.y),
        value_string: (dt.y < 5000) ? "Low" : (dt.y > 5001 && dt.y < 20000) ? "Moderate" : "High",
        total_vaccine_delivered: this.formatNumbers(dt.delivered),
        total_cost_vaccine: this.formatNumbers(dt.cost),
        total_confirmed: this.formatNumbers(dt.cases),
        total_death: this.formatNumbers(dt.death),
        total_recover: this.formatNumbers(dt.recover),
        total_population: this.formatNumbers(dt.population),
        total_poverty_pop: this.formatNumbers(dt.poverty),
      }
      this.vaccinesNig.push(vac)
    })
    this.tooltipVac = this.vaccinesNig.find((val, ind, arr) => {
      return val.name === "Federal Capital Territory"
    })
    this.loaded = true
  }

  last_update = ""
  worldwide_vaccine = "0"
  africa_vaccine = "0"
  nigeria_vaccine = "0"


  vaccines: Vaccines[] = []
  vaccinesNig: Vaccines[] = []
  loaded = false
  showHTML = false

  tooltipVac:Vaccines
  currentState = "Federal Capital Territory"

  @ViewChild('maps') public maps: Maps;
  // custom code start
  public load = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
  }

  public tooltipRender = (args: ITooltipRenderEventArgs) => {
    if(args.options["data"]) {
      const data = args.options["data"]
      const state = data.name
      this.currentState = state
      this.tooltipVac = this.vaccinesNig.find((val, ind, arr) => {
        return val.name === state
      })
    }
  }

  public itemSelection = (args: ISelectionEventArgs) => {
    if(args.shapeData !== undefined) {
      const data = args.data
      console.log(data)
      const state = data["name"]
      this.currentState = state
      this.tooltipVac = this.vaccinesNig.find((val, ind, arr) => {
        return val.name === state
      })
    }
  }


  // custom code end
  public zoomSettings: object = {
    enable: true,
    toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'],
    horizontalAlignment: 'Near',
    toolBarOrientation: 'Vertical',
    pinchZooming: true
  }

  public legendSettings: object = {
    visible: true,
    position: 'Bottom',
    height: '10',
    width: '80%',
    mode: 'Interactive',
    titleStyle: {
      size: '18px'
    },
    title: {
      text: 'Total Vaccination'
    },
  }

  public titleSettings: object = {
    text: 'Click on each state to view more info', //Covid-19 Vaccinations in Nigeria
    titleStyle: {
      size: '16px'
    }
  }

  public layers: object[] = [
    {
      dataSource: this.vaccinesNig,
      shapeDataPath: 'name',
      shapePropertyPath: 'name',
      shapeData: nigeriaMap,
      shapeSettings: {
        colorValuePath: 'value',
        fill: '#167086',
        border: {
          color: 'white',
          width: 1.5
        },
        colorMapping: [
          {
            from: 0, to: 1000, color: '#DEEBAE', label: 'Low'
          },
          {
            from: 1001, to: 20000, color: '#A4D6AD', label: 'Moderate'
          },
          {
            from: 20001, to: 40000, color: '#37AFAB', label: 'High'
          },
        ],
      },
      dataLabelSettings: {
        visible: true,
        labelPath: 'name',
        smartLabelMode: 'Hide',
        fill: '#ffffff'
      },
      highlightSettings: {
        enable: true,
        fill: '#cccccc'
      },
      selectionSettings: {
        enable: true,
        fill: '#4c515b',
        opacity: 1
      },
      tooltipSettings: {
        visible: true,
        valuePath: 'total_vaccination',
        // template: '<div id="my-template"> <div class="my-toolback"> <div class="listing2"> <center> ${name} </center> </div> <hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"> <div> <span class="listing1">Total Vaccination : </span><span class="listing2">${total_vaccination}</span> <br> <span class="listing1">Total Vaccine Delivered : </span><span class="listing2">${total_vaccine_delivered}</span> <br> <span class="listing1">Cost to Deliver Vaccines : </span><span class="listing2">₦${total_cost_vaccine}</span> <br> <span class="listing1">Total Confirmed Cases : </span><span class="listing2">${total_confirmed}</span> <br> <span class="listing1">Total Confirmed Deaths : </span><span class="listing2">${total_death}</span> <br><span class="listing1">Total Confirmed Recovery : </span><span class="listing2">${total_recover}</span> <br><span class="listing1">Total Population : </span><span class="listing2">${total_population}</span><br> <span class="listing1">Total Population Living in Extreme Poverty : </span><span class="listing2">${total_poverty_pop}</span></div> </div> </div>'
      },
    }
  ]

  formatNumbers(value: number) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    })
    const f = formatter.format(value)
    return f.substring(4, f.length - 3)
  }

}
