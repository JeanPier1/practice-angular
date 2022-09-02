import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @Input() progress: number = 40;
  @Input() btnclass:string = "btn-primary";
  @Output() valorsalida: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  get getPorcentaje() {
    return `${this.progress}%`;
  }
  cambiarvalor(valor: number): any {
    if (this.progress >= 100 && valor >= 0) {
      this.valorsalida.emit(100);
      return (this.progress = 100);
    }
    if (this.progress <= 0 && valor < 0) {
      this.valorsalida.emit(0);
      return (this.progress = 0);
    }
    this.progress = this.progress + valor;
    this.valorsalida.emit(this.progress);
  }

  onChange(nuevoValor:number){
    if(nuevoValor>=100){
      this.progress=100;
    }else if(nuevoValor<=0){
      this.progress=0;
    }else{
      this.progress=nuevoValor;
    }
    this.valorsalida.emit(this.progress);
  }

}
