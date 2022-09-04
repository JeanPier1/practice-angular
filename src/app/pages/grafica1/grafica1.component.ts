import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css'],
})
export class Grafica1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public labels01: string[] = ['Pan', 'Refresco', 'Tacos'];
  public data01: ChartData<'doughnut'> = {
    labels: this.labels01,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };
}
