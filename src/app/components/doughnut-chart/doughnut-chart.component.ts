import { ChartType } from 'chart.js';
import { Component, OnInit, Input } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {

  @Input() labels: Label[];
  @Input() data: SingleDataSet;
  @Input() title: string;

  chartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
