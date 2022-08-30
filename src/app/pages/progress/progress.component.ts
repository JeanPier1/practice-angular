import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  progress: number = 40;


  get getPorcentaje(){
    return `${ this.progress}%`
  }


  addprogress(valor:number) {
    this.progress = this.progress +valor;
  }

  restarprogress(valor:number) {
    if (this.progress > 0) {
      this.progress = this.progress - valor;
    }
  }


  cambiarvalor(valor:number):any{
    if(this.progress >= 100 && valor >=0){
      return this.progress = 100;
    }
    if(this.progress <= 0 && valor < 0){
      return this.progress =0;
    }
    this.progress = this.progress+valor;
  }

}
