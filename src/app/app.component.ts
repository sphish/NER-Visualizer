import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MODELS} from './model';
import {LABELS} from './label';
import { InputService } from './input.service';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent implements OnInit {
  title = 'NER-Visualizer';
  showOutput = false;
  inputText: string;
// tslint:disable-next-line: max-line-length
  output: string;

  models = MODELS;
  selectedModel = this.models[0];

  labels = LABELS;
  selectedOptions = LABELS.map(l => l.name);

  fileName = 'Choose File';
  public uploader: FileUploader = new FileUploader({url: 'http://192.144.181.205:3000/work_file', itemAlias: 'file'});
  // public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/api/upload', itemAlias: 'photo'});

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.fileName = file.file.name;
      console.log(this.fileName);
    };
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      if (this.selectedModel) { form.append('model', this.selectedModel.name); } };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        console.log('FileUpload:uploaded:', item, status, response);
        alert('File uploaded successfully');
    };
  }

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
    const content = {
      text: this.inputText,
      model: this.selectedModel.name,
    };
    console.log(JSON.stringify(content));

    console.log(this.http.post<string>('http://192.144.181.205:3000/work_text', content).subscribe(data => {
    // console.log(this.http.post<string>('http://localhost:5000/', content).subscribe(data => {
      this.render(data);
    }));
    // this.output = this.response["html"];
    console.log(this.output);
  }

  render(data): void {
    console.log(data);
    const text = data.text;
    let cur = 0;
    let segments: any[] = [];
    const ents = data.ents;
    const len = ents.length;
    for (let i = 0; i < len; i++) {
      segments.push([ents[i].start - cur, '']);
      segments.push([ents[i].end - ents[i].start, ents[i].label]);
      cur = ents[i].end;
    }
    segments.push([text.length - cur, '']);
    console.log(segments);

    let html = '';
    cur = 0;
    const segs = segments.length;
    for (let i = 0; i < segs; i++) {
      const raw = text.substring(cur, cur + segments[i][0]);
      cur += segments[i][0];
      if (segments[i][1] === '') {
        html += raw;
      } else {
        html += '<mark data-entity="';
        html += segments[i][1];
        html += '">';
        html += raw;
        html += '</mark>';
      }
    }
    console.log(html);
    this.output = html;
  }
}

