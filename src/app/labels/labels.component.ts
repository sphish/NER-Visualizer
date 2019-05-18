import { Component, OnInit } from '@angular/core';
import { LABELS } from '../label';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.styl']
})
export class LabelsComponent implements OnInit {
  labels = LABELS;
  selectedOptions = [];

  labelOptionChange(list) {
    this.selectedOptions = list.selectedOptions.selected.map(
      item => item.value
    );
  }

  constructor() { }

  ngOnInit() {
  }

}
