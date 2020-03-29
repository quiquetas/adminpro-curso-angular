import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementor',
  templateUrl: './incrementor.component.html',
  styles: []
})
export class IncrementorComponent implements OnInit {

  @Input('name') title = 'Leyenda';
  @Input() progress = 50;

  @ViewChild('progressInput', { static: false }) progressInput: ElementRef;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Title', this.title);
    // console.log('Progress', this.progress);
  }

  ngOnInit() {
    // console.log('Title', this.title);
    // console.log('Progress', this.progress);
  }

  updateProgress(value: number) {
    let newProgress = Number(this.progress) + value;

    if (newProgress > 100) {
      newProgress = 100;
    }
    if (newProgress < 0) {
      newProgress = 0;
    }

    this.progress = newProgress;

    this.valueChange.emit(this.progress);

    this.progressInput.nativeElement.focus();
  }

  onChange(value: number) {
    // let element: any = document.getElementsByName('progress')[0];

    if (value === null) {
      this.progress = 0;
      this.progressInput.nativeElement.value = 0;
    }
    if (value > 100) {
      this.progress = 100;
      this.progressInput.nativeElement.value = 100;
    }
    if (value < 0) {
      this.progress = 0;
    }

    this.valueChange.emit(this.progress);
  }

}
