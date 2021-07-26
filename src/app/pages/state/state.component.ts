import { Component, OnInit, ViewChild } from '@angular/core';
import { africaMap, nigeriaMap, worldMap } from "../../world-map";
import * as $ from 'jquery'
import { DummyData } from '../../population-data';
import { economicData, economicData2 } from 'src/app/economy-data';
declare var require: any;

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  showHTML = false

  currentState = "Abia"
  states = [
    'Select a state',
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

  displayDataBySectorH:any[] = []
  displayDataBySectorD:any[] = []
  displayDataBySectorE:any[] = []
  displayDataBySectorG:any[] = []
  displayDataBySectorF:any[] = []

  ngOnInit() {
    this.getDataByState()
  }

  onStateChanged(evt:any) {
    if(evt.target.value === "Select a state") {
      return
    }
    this.currentState = evt.target.value
    this.getDataByState()
  }

  getDataByState() {
    const eco1 = economicData.find(val => {
      return val.x === this.currentState
    })

    const eco2 = economicData2.find(val => {
      return val.x === this.currentState
    })

    const others = new DummyData().mapData.find(val => {
      return val.x === this.currentState
    })

    this.displayDataBySectorH = []
    this.displayDataBySectorD = []
    this.displayDataBySectorE = []
    this.displayDataBySectorG = []
    this.displayDataBySectorF = []

    this.displayDataBySectorH.push(
      {title: "Total Confirmed Covid-19 Cases", value: this.formatNumbers(others.cases)},
      {title: "Total Confirmed Deaths", value: this.formatNumbers(others.death)},
      
      {title: "Vaccination Logistics Expenditure", value: this.formatNumbers(others.cost, true)},
      
      // {title: "", value: this.formatNumbers()},
      // {title: "", value: this.formatNumbers()},
    )

    this.displayDataBySectorD.push(
      {title: "Share of Population Living in Extreme Poverty", value: this.formatNumbers(others.poverty)},
      {title: "Total Population", value: this.formatNumbers(others.population)},
    )

    this.displayDataBySectorE.push(
      {title: "Revenue Analysis[2014 - 2019] - IGR", value: this.formatNumbers(eco1.Revenue_Analysis_IGR, true)},
      {title: "Revenue Analysis[2014 - 2019] - NET FACC", value: this.formatNumbers(eco1.Revenue_Analysis_Net_FACC, true)},
      {title: "6-Year Growth Analyis[2014 - 2019] - IGR", value: `${this.formatNumbers(eco2.Year_Growth_Analyis_IGR)}%`},
      {title: "6-Year Growth Analyis[2014 - 2019] - NET FACC", value: `${this.formatNumbers(eco2.Year_Growth_Analyis_Net_FACC)}%`},
      {title: "Structure of State Available Revenue[2019] - IGR", value: `${this.formatNumbers(eco2.Structure_of_State_Available_Revenue_IGR)}%`},
      {title: "Structure of State Available Revenue[2019] - NET FACC", value: `${this.formatNumbers(eco2.Structure_of_State_Available_Revenue_Net_FACC)}%`},
      {title: "Total Revenue", value: this.formatNumbers(eco1.Ability_to_meet_Recurrent_Expenditure_total_revenue, true)},
      {title: "Recurrent Expenditure", value: this.formatNumbers(eco1.Ability_to_meet_Recurrent_Expenditure_recurrent_expenditure, true)},
      {title: "Capital Expenditure", value: this.formatNumbers(eco1.Actual_Expenditure_2019_Capital_Expenditure, true)},
      {title: "Recurrent Expenditure", value: this.formatNumbers(eco1.Actual_Expenditure_2019_Recurrent_Expenditure, true)},
      {title: "2020 Health Budget (per capita)", value: this.formatNumbers(eco1.Health_Budget_per_capita, true)},
      {title: "2020 Actual Capital Expenditure (per capita)", value: this.formatNumbers(eco1.Actual_Capital_Expenditure_per_capita, true)},
      {title: "2020 Total Debt (per capita)", value: this.formatNumbers(eco1.Total_Debt_per_capita, true)},
      {title: "2019 Domestic Debt (NGN)", value: this.formatNumbers(eco1.Debt_Stock_2019_Domestic_Debt, true)},
      {title: "2019 External Debt (USD)", value: `$${this.formatNumbers(eco1.Debt_Stock_2019_External_Debt)}`},
      {title: "Debt Growth[2014 - 2019]", value: `${this.formatNumbers(eco1.Debt_Growth)}%`},
      {title: "2020 Debt Size (position)", value: this.formatNumbers(eco1.Debt_Size)},
    )

    this.displayDataBySectorG.push(
      {title: "FGN Covid-19 Support to State", value: this.formatNumbers(others.covid_support, true)},
    )
  }

  formatNumbers(value: number, addCurrency:boolean = false) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    })
    const f = formatter.format(value)
    return (addCurrency) ? f : f.substring(4, f.length - 3)
  }
}
