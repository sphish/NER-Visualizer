import { Component, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MODELS} from './model';
import {LABELS} from './label';
import { InputService } from './input.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent {
  title = 'NER-Visualizer';
  showOutput = false;
  inputText: string;
// tslint:disable-next-line: max-line-length
  response: any;

  models = MODELS;
  selectedModel = this.models[0];

  labels = LABELS;
  selectedOptions = LABELS.map(l => l.name);

  labelOptionChange(list) {
    this.selectedOptions = list.selectedOptions.selected.map(
      item => item.value
    );
  }
  public constructor(private inputService: InputService, private http: HttpClient) {
    this.inputService.textMethod$.subscribe((data) => {
            this.inputText = data;
        }
    );
  }

  recognize(): void {
    this.showOutput = true;
    var content = {
      text: this.inputText,
      model: this.selectedModel.name,
      labels: this.selectedOptions
    };
    console.log(JSON.stringify(content));

    // this.http.get('http://127.0.0.1:5000/').subscribe(data => { this.response = data; });
    console.log(this.http.post<string>('http://127.0.0.1:5000/', content).subscribe(data => { this.response = data; }));
    // this.output = this.response["html"];
    console.log(this.response.html);
  }
}

