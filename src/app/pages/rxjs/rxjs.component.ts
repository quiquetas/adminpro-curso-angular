import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subs: Subscription;

  constructor() {
    this.subs = this.returnObs().subscribe(
      num => console.log('Subs', num),
      error => console.log('Error obs', error),
      () => console.log('Obs terminó')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  returnObs(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let counter = 0;

      let interval = setInterval(() => {
        counter++;

        const exitValue = {
          value: counter
        };

        observer.next(exitValue);

        // if (counter === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (counter === 2) {
        //   //clearInterval(interval);
        //   observer.error('Error');
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.value),
      filter((value, index) => {
        if ((value % 2) === 1) {
          return true;
        }

        return false;
      })
    );
  }
}
