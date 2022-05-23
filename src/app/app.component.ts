import { Component, OnInit } from '@angular/core';
import { DummyData } from './population-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // this.CovidDeath();
  }

  CovidCases() {
    const data = new DummyData().mapData;

    const excel = new DummyData().excelData.split('\n');
    
    excel.forEach(ex => {
      const line = ex.split('\t');
      const state = `${line[0]}`.replace(",", "");
      const cases = `${line[1]}`.replace(",", "");
      const recovery = `${line[3]}`.replace(",", "");

      // console.log(state);

      const index = data.findIndex((val) => {
        return val.x === state;
      });
      data[index].cases = Number(cases);
      data[index].recover = Number(recovery);
    });

    const json = JSON.stringify(data);
    console.log(json);
  }

  CovidDeath() {
    const data = new DummyData().mapData;

    const excel = new DummyData().excelData.split('\n');
    
    excel.forEach(ex => {
      const line = ex.split('\t');
      const state = `${line[0]}`.replace(",", "");
      const death = `${line[1]}`.replace(",", "");
      // const recovery = `${line[3]}`.replace(",", "");

      // console.log(state);

      const index = data.findIndex((val) => {
        return val.x === state;
      });
      data[index].death = Number(death);
      // data[index].recover = Number(recovery);
    });

    const json = JSON.stringify(data);
    console.log(json);
  }
  title = 'argon-dashboard-angular';
}
