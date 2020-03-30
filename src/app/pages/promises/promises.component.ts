import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.count3().then(
      status => console.log('Termino!', status)
    ).catch(
      error => console.log('Error en la promesa', error)
    );
  }

  ngOnInit() {
  }

  count3(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let counter = 0;

      let interval = setInterval(() => {
        counter++;

        console.log(counter);

        if (counter === 3) {
          resolve(true);

          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
