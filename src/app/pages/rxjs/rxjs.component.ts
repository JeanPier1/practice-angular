import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  filter,
  interval,
  map,
  observable,
  Observable,
  retry,
  Subscription,
  take,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  public intervalSubs!: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (valor) => console.log('Subs:', valor),
    //     (error) => console.warn('Error', error),
    //     () => console.info('Obs Terminado')
    //   );
    /*this.retornaIntervalo().subscribe((valor) => console.log(valor));*/
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }

  ngOnInit(): void {}

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(500).pipe(
      take(10),
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
    return intervalo$;
  }

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

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
}
