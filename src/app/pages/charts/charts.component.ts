import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
// import { EChartsOption } from "echarts";
// import LinearGradient from 'zrender/lib/graphic/LinearGradient';
import Chart from 'chart.js';
import { economicData, economicData2 } from "../../economy-data";
import { DummyData } from "../../population-data";
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { TreeMap, TreeMapTooltip, TreeMapLegend, TreeMapComponent } from '@syncfusion/ej2-angular-treemap';
import { IItemMoveEventArgs, ILoadEventArgs, TreeMapTheme, IItemClickEventArgs } from '@syncfusion/ej2-angular-treemap';
TreeMap.Inject(TreeMapTooltip, TreeMapLegend);

// import * as xlsx from 'xlsx';
// core components

@Component({
    selector: 'charts-root',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.css'],
})

export class MyChartComponent implements OnInit {

    //////////////////////////////////// TREEMAP STARTS ///////////////////////

    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    titleSettings: object = {
        text: '2019 External Debt (USD)',
        textStyle: {
            size: '15px'
        }
    };
    public tooltipSettings: object = {
        visible: true,
        format: 'State: ${state}<br>2019 External Debt (USD): ${data}'
    };
    public legendSettings: object = {
        visible: true,
        position: 'Top',
        shape: 'Rectangle'
    };
    dataSource: object[] = [];
    weightValuePath: string = 'data';
    treemapPalette: string[] = ['#C33764', '#AB3566', '#993367', '#853169', '#742F6A', '#632D6C', '#532C6D', '#412A6F', '#312870', '#1D2671'];
    leafItemSettings: object = {
        labelPath: '2019 External Debt (USD)',
        border: { color: 'white', width: 0.5 }
    };
    border: object = {
        color: 'white',
        width: 0.5
    };

    //////////////////////////////////// TREEMAP ENDS /////////////////////////

    showHTML = false
    options: any;

    source = "";

    source_link = ""

    last_update_date = ""

    clicked = false
    clicked1 = true

    dataSelection = ""

    @ViewChild('rechargetable', { static: false }) rtable: ElementRef;

    subDataTracker = [
        { "name": "health", "options": ["-", "Total Confirmed Covid-19 Cases", "Total Confirmed Deaths", "Vaccination Logistics Expenditure", "FGN Covid-19 Support to State"] },
        { "name": "demography", "options": ["-", "Life Expectancy", "Share of Population Living in Extreme Poverty", "Population Density", "Total Population"] },
        { "name": "economy", "options": ["-", "Revenue Analysis", "6-Year Growth Analyis", "Structure of State Available Revenue", "2019 Ability to Meet Recurrent Expenditure", "Actual Expenditure 2019", "Health Budget", "Actual Capital Expenditure", "Total Debt", "2019 Domestic Debt (NGN)", "2019 External Debt (USD)", "Debt Growth", "Debt Size", "Total Debt Trend (2014 - 2019)"] },
        { "name": "governance", "options": ["-", "State Budget Allocations", "Covid-Support Measures", "Income Support Measures"] },
        { "name": "food", "options": ["-", "Food Inflation", "People with Insufficient Food Intake", "Children under the age of 5 with acute malnutrition", "Children under 5 with chronic malnutrition"] }
    ]

    displayOptions = []

    dataAxis = [
        'Abia',
        'Adamawa',
        'Akwa Ibom',
        'Anambra',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Edo',
        'Ekiti',
        'Enugu',
        'Federal Capital Territory',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kaduna',
        'Kano',
        'Katsina',
        'Kebbi',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara'
    ];

    data = [];

    ordersChart: any

    chartType = "Column"

    @ViewChild('chart') public chart: ChartComponent;
    @ViewChild('treemap') public treemap: TreeMapComponent;

    onChartTypeChange(evt: any) {
        if (evt.target.value === "none") {
            return
        }
        this.chartType = evt.target.value
        this.chart.refresh()
    }

    exportChart() {
        this.chart.exportModule.export('PNG', `export-${new Date().toLocaleTimeString()}`);
    }

    onTrackerChange(evt: any) {
        const option = this.subDataTracker.find((val, arr, ind) => {
            return val.name === evt.target.value
        })
        this.displayOptions = option.options;
    }

    onSubTrackerChanged(evt: any) {
        this.dataSelection = evt.target.value
        this.chartData = []
        this.chartTitle = "No data available yet"
        this.source = ""
        this.source_link = ""
        this.last_update_date = ""
        this.stacked = false
        this.lineChart = false

        if (evt.target.value === "Total Confirmed Covid-19 Cases") {
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            // this.data = new DummyData().mapData.map((val) => val.cases)
            // this.ordersChart.destroy()
            // this.viewChartForGeneral("Total Confirmed Covid-19 Cases", "#de5460")
            this.chartTitle = "Total Confirmed Covid-19 Cases"
            new DummyData().mapData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.cases
                })
            })
            this.palette = ["#de5460"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "Total Confirmed Deaths") {
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            // this.data = new DummyData().mapData.map((val) => val.death)
            // this.ordersChart.destroy()
            // this.viewChartForGeneral("Total Confirmed Deaths", "#d93b4a")
            this.chartTitle = "Total Confirmed Deaths"
            new DummyData().mapData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.death
                })
            })
            this.palette = ["#d93b4a"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "Share of Population Living in Extreme Poverty") {
            this.source = "Statista"
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            // this.data = new DummyData().mapData.map((val) => val.poverty)
            // this.ordersChart.destroy()
            // this.viewChartForGeneral("Share of Population Living in Extreme Poverty", "#de5460")
            this.chartTitle = "Share of Population Living in Extreme Poverty"
            new DummyData().mapData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.poverty
                })
            })
            this.palette = ["#de5460"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "Total Population") {
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            // this.data = new DummyData().mapData.map((val) => val.population)
            // this.ordersChart.destroy()
            // this.viewChartForGeneral("Total Population", "#00aeaa")
            this.chartTitle = "Total Population"
            new DummyData().mapData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.population
                })
            })
            this.palette = ["#00aeaa"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "Vaccination Logistics Expenditure") {
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            this.source = "NPHCDA"
            // this.data = new DummyData().mapData.map((val) => val.cost)
            // this.ordersChart.destroy()
            // this.viewChartForGeneral("Vaccination Logistics Expenditure", "#00aeaa")
            this.chartTitle = "Vaccination Logistics Expenditure"
            new DummyData().mapData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.cost
                })
            })
            this.palette = ["#00aeaa"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "FGN Covid-19 Support to State") {
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            this.source = "NCDC"
            // this.data = new DummyData().mapData.map((val) => val.covid_support)
            // this.ordersChart.destroy()
            // this.viewChartForGeneral("FGN Covid-19 Support to State", "#00aeaa")
            this.chartTitle = "FGN Covid-19 support to state"
            new DummyData().mapData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.covid_support
                })
            })
            this.palette = ["#00aeaa"]
            // this.chart.refresh()
            return
        }

        //For Economy
        if (evt.target.value === "Revenue Analysis") {
            this.source = "Budgit"
            // const data1 = economicData.map((val) => val.Revenue_Analysis_IGR)
            // const data2 = economicData.map((val) => val.Revenue_Analysis_Net_FACC)
            // this.ordersChart.destroy()
            // // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            // this.viewChartForEconomyStacked("Revenue Analysis[2014 - 2019] - IGR (NGN)", "Revenue Analysis[2014 - 2019] - NET FACC (NGN)", data1, data2, false, false, ["#4bc0c0", "#36a2eb"])
            this.chartData = []
            this.stacked = true
            this.lineChart = false
            this.stackedTitle1 = "Revenue Analysis[2014 - 2019] - IGR (NGN)"
            this.stackedTitle2 = "Revenue Analysis[2014 - 2019] - NET FACC (NGN)"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Revenue_Analysis_IGR,
                    "data1": val.Revenue_Analysis_Net_FACC
                })
            })
            this.palette = ["#4bc0c0", "#36a2eb"]
            // this.chart.refresh()
            return
        }

        if (evt.target.value === "6-Year Growth Analyis") {
            this.source = "Budgit"
            // const data1 = economicData2.map((val) => val.Year_Growth_Analyis_IGR)
            // const data2 = economicData2.map((val) => val.Year_Growth_Analyis_Net_FACC)
            // this.ordersChart.destroy()
            // // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            // this.viewChartForEconomyStacked("6-Year Growth Analyis[2014 - 2019] - IGR (%)", "6-Year Growth Analyis[2014 - 2019] - NET FACC (%)", data1, data2, true, false, ["#4bc0c0", "#36a2eb"])
            this.chartData = []
            this.stacked = true
            this.lineChart = false
            this.stackedTitle1 = "6-Year Growth Analyis[2014 - 2019] - IGR (%)"
            this.stackedTitle2 = "6-Year Growth Analyis[2014 - 2019] - NET FACC (%)"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Year_Growth_Analyis_IGR,
                    "data1": val.Year_Growth_Analyis_Net_FACC
                })
            })
            this.palette = ["#4bc0c0", "#36a2eb"]
            // this.chart.refresh()
            return
        }

        if (evt.target.value === "Structure of State Available Revenue") {
            this.source = "Budgit"
            // const data1 = economicData2.map((val) => val.Structure_of_State_Available_Revenue_IGR)
            // const data2 = economicData2.map((val) => val.Structure_of_State_Available_Revenue_Net_FACC)
            // this.ordersChart.destroy()
            // // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            // this.viewChartForEconomyStacked("Structure of State Available Revenue[2019] - IGR (%)", "Structure of State Available Revenue[2019] - NET FACC (%)", data1, data2, true, false, ["#4bc0c0", "#36a2eb"])
            this.chartData = []
            this.stacked = true
            this.lineChart = false
            this.stackedTitle1 = "Structure of State Available Revenue[2019] - IGR (%)"
            this.stackedTitle2 = "Structure of State Available Revenue[2019] - NET FACC (%)"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Structure_of_State_Available_Revenue_IGR,
                    "data1": val.Structure_of_State_Available_Revenue_Net_FACC
                })
            })
            this.palette = ["#4bc0c0", "#36a2eb"]
            // this.chart.refresh()
            return
        }

        if (evt.target.value === "2019 Ability to Meet Recurrent Expenditure") {
            this.source = "Budgit"
            // const data1 = economicData.map((val) => val.Ability_to_meet_Recurrent_Expenditure_total_revenue)
            // const data2 = economicData.map((val) => val.Ability_to_meet_Recurrent_Expenditure_recurrent_expenditure)
            // this.ordersChart.destroy()
            // // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            // this.viewChartForEconomyStacked("Total Revenue (NGN)", "Recurrent Expenditure (NGN)", data1, data2, false, false, ["#4bc0c0", "#d93b4a"])
            this.chartData = []
            this.stacked = true
            this.lineChart = false
            this.stackedTitle1 = "Total Revenue (NGN)"
            this.stackedTitle2 = "Recurrent Expenditure (NGN)"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Ability_to_meet_Recurrent_Expenditure_total_revenue,
                    "data1": val.Ability_to_meet_Recurrent_Expenditure_recurrent_expenditure
                })
            })
            this.palette = ["#4bc0c0", "#d93b4a"]
            // this.chart.refresh()
            return
        }

        if (evt.target.value === "Actual Expenditure 2019") {
            this.source = "Budgit"
            // const data1 = economicData.map((val) => val.Actual_Expenditure_2019_Capital_Expenditure)
            // const data2 = economicData.map((val) => val.Actual_Expenditure_2019_Recurrent_Expenditure)
            // this.ordersChart.destroy()
            // // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            // this.viewChartForEconomyStacked("Capital Expenditure (NGN)", "Recurrent Expenditure (NGN)", data1, data2, false, false, ["#4bc0c0", "#d93b4a"])
            this.chartData = []
            this.stacked = true
            this.lineChart = false
            this.stackedTitle1 = "Capital Expenditure (NGN)"
            this.stackedTitle2 = "Recurrent Expenditure (NGN)"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Actual_Expenditure_2019_Capital_Expenditure,
                    "data1": val.Actual_Expenditure_2019_Recurrent_Expenditure
                })
            })
            this.palette = ["#4bc0c0", "#d93b4a"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "Health Budget") {
            this.source = "Budgit"
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            // this.data = economicData.map((val) => val.Health_Budget_per_capita)
            // this.ordersChart.destroy()
            // this.viewChartForEconomy("2020 Health Budget (per capita) - NGN", "#36a2eb")
            this.chartTitle = "2020 Health Budget (per capita) - NGN"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Health_Budget_per_capita
                })
            })
            this.palette = ["#36a2eb"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "Actual Capital Expenditure") {
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            this.source = "Budgit"
            // this.data = economicData.map((val) => val.Actual_Capital_Expenditure_per_capita)
            // this.ordersChart.destroy()
            // this.viewChartForEconomy("2020 Actual Capital Expenditure (per capita) - NGN", "#4bc0c0")
            this.chartTitle = "2020 Actual Capital Expenditure (per capita) - NGN"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Actual_Capital_Expenditure_per_capita
                })
            })
            this.palette = ["#4bc0c0"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "Total Debt") {
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            this.source = "Budgit"
            // this.data = economicData.map((val) => val.Total_Debt_per_capita)
            // this.ordersChart.destroy()
            // this.viewChartForEconomy("2020 Total Debt (per capita) - NGN", "#d93b4a")
            this.chartTitle = "2020 Total Debt (per capita) - NGN"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Total_Debt_per_capita
                })
            })
            this.palette = ["#d93b4a"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "2019 Domestic Debt (NGN)") {
            this.source = "Budgit"
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            // this.data = economicData.map((val) => val.Debt_Stock_2019_Domestic_Debt)
            // const data2 = economicData.map((val) => val.Debt_Stock_2019_External_Debt)//1000000000
            // this.ordersChart.destroy()
            // this.viewChartForEconomy("Domestic Debt (NGN)", "#d93b4a")
            // this.viewChartForEconomyStacked("Domestic Debt (NGN)", "External Debt (USD)", data1, data2, false, true, ["#","#d93b4a"])
            this.chartTitle = "2019 Domestic Debt (NGN)"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Debt_Stock_2019_Domestic_Debt
                })
            })
            this.palette = ["#d93b4a"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "2019 External Debt (USD)") {
            this.source = "Budgit"
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            // this.data = economicData.map((val) => val.Debt_Stock_2019_Domestic_Debt)
            // const data2 = economicData.map((val) => val.Debt_Stock_2019_External_Debt)//1000000000
            // this.ordersChart.destroy()
            // this.viewChartForEconomy("Domestic Debt (NGN)", "#d93b4a")
            // this.viewChartForEconomyStacked("Domestic Debt (NGN)", "External Debt (USD)", data1, data2, false, true, ["#","#d93b4a"])
            this.chartTitle = "2019 External Debt (USD)"
            economicData.forEach((val) => {
                this.dataSource.push({
                    "state": val.x,
                    "data": (val.x === "Lagos") ? 0 : val.Debt_Stock_2019_External_Debt
                })
            })
            this.treemap.refresh()
            this.palette = ["#d93b4a"]
            // this.chart.refresh()
            return
        }
        // if (evt.target.value === "Debt Stock 2019 - 2") {
        //     this.source = "Budgit"
        //     const data1 = economicData.map((val) => val.Debt_Stock_2019_Domestic_Debt)
        //     this.data = economicData.map((val) => val.Debt_Stock_2019_External_Debt / 1000000000)//1000000000
        //     this.ordersChart.destroy()
        //     this.viewChartForEconomy("External Debt (USD)", "#d93b4a")
        //     // this.viewChartForEconomyStacked("Domestic Debt (NGN)", "External Debt (USD)", data1, data2, false, true, ["#","#d93b4a"])
        //     return
        // }
        if (evt.target.value === "Debt Growth") {
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            this.source = "Budgit"
            this.last_update_date = ""
            // this.data = economicData.map((val) => val.Debt_Growth)
            // this.ordersChart.destroy()
            // this.viewChartForEconomy("Debt Growth[2014 - 2019] (%)", "#d93b4a")
            this.chartTitle = "Debt Growth[2014 - 2019] (%)"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Debt_Growth
                })
            })
            this.palette = ["#d93b4a"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "Debt Size") {
            this.chartData = []
            this.stacked = false
            this.lineChart = false
            this.source = "Budgit"
            // this.data = economicData.map((val) => val.Debt_Size)
            // this.ordersChart.destroy()
            // this.viewChartForEconomy("2020 Debt Size (position)", "#d93b4a")
            this.chartTitle = "2020 Debt Size (position)"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Debt_Size
                })
            })
            this.palette = ["#d93b4a"]
            // this.chart.refresh()
            return
        }
        if (evt.target.value === "Total Debt Trend (2014 - 2019)") {
            this.chartData = []
            this.lineChart = true
            this.source = "Budgit"
            // const data = economicData.map((val) => val.Total_Debt_Trend_2014_2019[0])
            // const data2 = economicData.map((val) => val.Total_Debt_Trend_2014_2019[1])
            // const data3 = economicData.map((val) => val.Total_Debt_Trend_2014_2019[2])
            // const data4 = economicData.map((val) => val.Total_Debt_Trend_2014_2019[3])
            // const data5 = economicData.map((val) => val.Total_Debt_Trend_2014_2019[4])
            // const data6 = economicData.map((val) => val.Total_Debt_Trend_2014_2019[5])
            // // console.log(data,data2,data3,data4,data5)
            // this.ordersChart.destroy()
            // this.viewChartForEconomyLine(data, data2, data3, data4, data5, data6)

            this.stackedTitle1 = "2014"
            this.stackedTitle2 = "2015"
            this.stackedTitle3 = "2016"
            this.stackedTitle4 = "2017"
            this.stackedTitle5 = "2018"
            this.stackedTitle6 = "2019"
            economicData.forEach((val) => {
                this.chartData.push({
                    "state": val.x,
                    "data": val.Total_Debt_Trend_2014_2019[0],
                    "data1": val.Total_Debt_Trend_2014_2019[1],
                    "data2": val.Total_Debt_Trend_2014_2019[2],
                    "data3": val.Total_Debt_Trend_2014_2019[3],
                    "data4": val.Total_Debt_Trend_2014_2019[4],
                    "data5": val.Total_Debt_Trend_2014_2019[5],
                })
            })
            this.palette = ["#172b4d", "#5e72e4", "#ff4500", "#11cdef", "#2dce89", "#a52a2a"]
            // this.chart.refresh()
            return
        }
        this.data = []
        this.ordersChart.destroy()
        this.viewChartForGeneral("No data available yet", "#")
    }

    chartTitle = "";
    public primaryXAxis: Object;
    public chartData: Object[] = [];
    public tooltip: Object = {};
    public zoom: Object = {};
    public legend: Object = {
        visible: true,
        toggleVisibility: false
    };
    public palette: string[] = []
    public stacked = false
    public lineChart = false

    public stackedTitle1 = ""
    public stackedTitle2 = ""
    public stackedTitle3 = ""
    public stackedTitle4 = ""
    public stackedTitle5 = ""
    public stackedTitle6 = ""

    ngOnInit() {
        // this.treemap.refresh()
        this.excelBlaise()
        const option = this.subDataTracker.find((val, arr, ind) => {
            return val.name === "health"
        })

        this.displayOptions = option.options;

        // this.data = new DummyData().mapData.map((val) => val.cases)
        // this.viewChartForGeneral("Total Confirmed Covid-19 Cases", "#de5460")
        this.chartTitle = "Total Confirmed Covid-19 Cases"
        new DummyData().mapData.forEach((val) => {
            this.chartData.push({
                "state": val.x,
                "data": val.cases
            })
        })
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.palette = ["#de5460"]
        this.tooltip = { enable: true }
        this.zoom = {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableSelectionZooming: true,
            enablePan: true
        };
    }


    excelBlaise() {
        var header = ""
        var items = ""

        for(const key in economicData[0]) {
            header += `${key},`
        }

        economicData.forEach(data => {
            for(const key in data) {
                if(key !== "Total_Debt_Trend_2014_2019") {
                    items += `${data[key]},`
                }else {
                    items += `${data[key].join(",")}\n`
                }
            }
        })

        console.log(header)
        console.log(items)
    }

    onChartEvent(event: any, type: string) {
        console.log('chart event:', type, event);
    }

    generalChart = {
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            callback: function (value) {
                                const formatter = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'NGN',
                                    minimumFractionDigits: 2
                                })
                                const f = formatter.format(value)
                                return f.substring(4, f.length - 3)
                            }
                        }
                    }
                ]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                },
                legend: {
                    title: {
                        display: true,
                        text: 'Legend Title',
                    }
                }
            },
            responsive: true,
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        const formatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'NGN',
                            minimumFractionDigits: 2
                        })
                        const f = formatter.format(item.yLabel)
                        var result = f.substring(4, f.length - 3)

                        if (`${item.yLabel}`.includes(".")) {
                            result = item.yLabel;
                        }
                        var label = data.datasets[item.datasetIndex].label || "";
                        var yLabel = (item.yLabel === 0) ? item.yLabel : result;
                        var content = "";
                        if (data.datasets.length > 1) {
                            content += label;
                        }
                        content += yLabel;
                        // console.log(item, data, content)
                        return content;
                    }
                }
            }
        },
    }

    economyChartStacked = {
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                },
                yAxes: [
                    {
                        ticks: {
                            callback: function (value) {
                                const formatter = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'NGN',
                                    minimumFractionDigits: 2
                                })
                                const f = formatter.format(value)
                                return `${f.substring(4, f.length - 3)}`
                            }
                        }
                    }
                ]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                },
                legend: {
                    title: {
                        display: true,
                        text: 'Legend Title',
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        const formatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'NGN',
                            minimumFractionDigits: 2
                        })
                        const f = formatter.format(item.yLabel)
                        const result = f.substring(4, f.length - 3)
                        var label = data.datasets[item.datasetIndex].label || "";
                        var yLabel = (item.yLabel === 0) ? item.yLabel : result;
                        var content = "";
                        if (data.datasets.length > 1) {
                            content += label;
                        }
                        content += `:\n${yLabel}`;
                        // console.log(item, data, content)
                        return content;
                    }
                }
            }
        },
    }

    economyChartStackedPercentage = {
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                },
                yAxes: [
                    {
                        ticks: {
                            callback: function (value) {
                                return value
                            }
                        }
                    }
                ]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                },
                legend: {
                    title: {
                        display: true,
                        text: 'Legend Title',
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        const result = item.yLabel;
                        var label = data.datasets[item.datasetIndex].label || "";
                        var yLabel = (item.yLabel === 0) ? item.yLabel : result;
                        var content = "";
                        if (data.datasets.length > 1) {
                            content += label;
                        }
                        content += `:\n${yLabel}`;
                        // console.log(item, data, content)
                        return content;
                    }
                }
            }
        },
    }

    economyChartStackedDebtStock = {
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                },
                yAxes: [
                    {
                        ticks: {
                            // stepSize: 5,
                            callback: function (value) {
                                const formatter = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'NGN',
                                    minimumFractionDigits: 2
                                })
                                const f = formatter.format(value)
                                return `${f.substring(4, f.length - 3)}`
                            }
                        }
                    }
                ]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                },
                legend: {
                    title: {
                        display: true,
                        text: 'Legend Title',
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        const formatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'NGN',
                            minimumFractionDigits: 2
                        })
                        const f = formatter.format(item.yLabel)
                        const result = f.substring(4, f.length - 3)
                        var label = data.datasets[item.datasetIndex].label || "";
                        var yLabel = (item.yLabel === 0) ? item.yLabel : result;
                        var content = "";
                        if (data.datasets.length > 1) {
                            content += label;
                        }
                        content += `:\n${yLabel}`;
                        // console.log(item, data, content)
                        return content;
                    }
                }
            }
        },
    }

    economyChartLines = {
        options: {
            responsive: true,
            // interaction: {
            //     mode: 'index',
            //     intersect: false,
            // },
            // stacked: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Line Chart - Multi Axis'
                }
            },
            // scales: {
            //     y: {
            //         type: 'linear',
            //         display: true,
            //         position: 'left',
            //     },
            //     y1: {
            //         type: 'linear',
            //         display: true,
            //         position: 'right',

            //         // grid line settings
            //         grid: {
            //             drawOnChartArea: false, // only want the grid lines for one axis to show up
            //         },
            //     },
            //     y2: {
            //         type: 'linear',
            //         display: true,
            //         position: 'left',
            //     },
            //     y3: {
            //         type: 'linear',
            //         display: true,
            //         position: 'right',

            //         // grid line settings
            //         grid: {
            //             drawOnChartArea: false, // only want the grid lines for one axis to show up
            //         },
            //     },
            //     y4: {
            //         type: 'linear',
            //         display: true,
            //         position: 'left',
            //     },
            //     y5: {
            //         type: 'linear',
            //         display: true,
            //         position: 'right',

            //         // grid line settings
            //         grid: {
            //             drawOnChartArea: false, // only want the grid lines for one axis to show up
            //         },
            //     },
            // }
        },
    };

    viewChartForGeneral(title: string, color: string) {
        const myData = {
            labels: this.dataAxis,
            datasets: [
                {
                    label: title,
                    data: this.data,
                    borderColor: color,//"#00ffd9",
                    backgroundColor: color,
                }
            ]
        }
        var chartOrders = document.getElementById('chart-opts');
        // parseOptions(Chart, chartOptions())
        this.ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: this.generalChart.options,
            data: myData
        });
        // ordersChart.update();
    }

    viewChartForEconomy(title: string, color: string) {
        const myData = {
            labels: economicData.map((val) => val.x),
            datasets: [
                {
                    label: title,
                    data: this.data,
                    borderColor: color,
                    backgroundColor: color,
                }
            ]
        }
        var chartOrders = document.getElementById('chart-opts');
        // parseOptions(Chart, chartOptions())
        this.ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: this.generalChart.options,
            data: myData
        });
        // ordersChart.update();
    }

    viewChartForEconomyStacked(title1: string, title2: string, data1: any, data2: any, isPercent: boolean, debt_stock: boolean = false, color: string[]) {
        const myData = {
            labels: economicData.map((val) => val.x),
            datasets: [
                {
                    label: title1,
                    data: data1,
                    borderColor: color[0],
                    backgroundColor: color[0],
                },
                {
                    label: title2,
                    data: data2,
                    borderColor: color[1],
                    backgroundColor: color[1],
                }
            ]
        }
        var chartOrders = document.getElementById('chart-opts');
        // parseOptions(Chart, chartOptions())
        this.ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: (isPercent) ? this.economyChartStackedPercentage.options : (debt_stock) ? this.economyChartStackedDebtStock.options : this.economyChartStacked.options,
            data: myData
        });
        // ordersChart.update();
    }

    viewChartForEconomyLine(data: any, data2: any, data3: any, data4: any, data5: any, data6: any) {
        const myData = {
            labels: economicData.map((val) => val.x),
            datasets: [
                {
                    label: '2014 NGN ',
                    data: data,
                    borderColor: '#172b4d',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y',
                },
                {
                    label: '2015 NGN ',
                    data: data2,
                    borderColor: '#5e72e4',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y1',
                },
                {
                    label: '2016 NGN ',
                    data: data3,
                    borderColor: '#ff4500',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y2',
                },
                {
                    label: '2017 NGN ',
                    data: data4,
                    borderColor: '#11cdef',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y3',
                },
                {
                    label: '2018 NGN ',
                    data: data5,
                    borderColor: '#2dce89',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y4',
                },
                {
                    label: '2019 NGN ',
                    data: data6,
                    borderColor: '#a52a2a',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y5',
                }
            ]
        }
        var chartOrders = document.getElementById('chart-opts');
        this.ordersChart = new Chart(chartOrders, {
            type: 'line',
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                    }
                },

                tooltips: {
                    callbacks: {
                        label: function (item, data) {
                            const formatter = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'NGN',
                                minimumFractionDigits: 2
                            })
                            const f = formatter.format(item.yLabel)
                            var result = f.substring(4, f.length - 3)

                            if (`${item.yLabel}`.includes(".")) {
                                result = item.yLabel;
                            }
                            var label = data.datasets[item.datasetIndex].label || "";
                            var yLabel = (item.yLabel === 0) ? item.yLabel : result;
                            var content = "";
                            if (data.datasets.length > 1) {
                                content += label;
                            }
                            content += yLabel;
                            // console.log(item, data, content)
                            return content;
                        }
                    }
                }
            },
            data: myData
        });
    }

    // exportToExcel() {
    //     const ws: xlsx.WorkSheet =
    //       xlsx.utils.table_to_sheet(this.rtable.nativeElement);
    //     const wb: xlsx.WorkBook = xlsx.utils.book_new();
    //     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    //     xlsx.writeFile(wb, `${this.dataSelection.replace(/\ /g, "-")}.xlsx`);
    //   }

}

function PdfPageOrientation(arg0: string, arg1: string, PdfPageOrientation: any) {
    throw new Error("Function not implemented.");
}
