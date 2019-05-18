import { Component, OnInit } from '@angular/core';
import { MODELS } from '../model';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.styl']
})
export class ModelsComponent implements OnInit {
  models = MODELS;
  selectedModel = this.models[0];

  constructor() { }

  ngOnInit() {
  }

}
