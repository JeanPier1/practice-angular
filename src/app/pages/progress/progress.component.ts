import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  progress01: number = 25;

  progress02: number = 35;

  constructor() {}

  ngOnInit(): void {}

  get getPorcentaje1() {
    return `${this.progress01}%`;
  }
  get getPorcentaje2() {
    return `${this.progress02}%`;
  }

  updatevalue(valor: number) {
    console.log(valor);
  }
}
