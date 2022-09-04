import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {
  @Input() title: string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: string[] = [
    'label 01',
    'label 02',
    'label 03',
  ];

  /*@Input('datas') chartData: number[] = [350, 450, 100];*/

  @Input('datas') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [450, 550, 200],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };

  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {}

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
