import { Component, OnInit } from '@angular/core';
import { observable, Observable, retry } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit {
  constructor() {
    this.retornaObservable()
      .pipe(retry(2))
      .subscribe(
        (valor) => console.log('Subs:', valor),
        (error) => console.warn('Error', error),
        () => console.info('Obs Terminado')
      );
  }

  ngOnInit(): void {}

  retornaObservable(): Observable<number> {
    let i = -1;
    const osb$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
        }
        if (i === 2) {
          observer.error('i llego a 1');
        }
      }, 1000);
    });
    return osb$;
  }
}
