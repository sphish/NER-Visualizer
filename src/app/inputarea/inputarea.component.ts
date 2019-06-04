import { Component, OnInit, Input } from '@angular/core';
import { InputService } from '../input.service';

@Component({
  selector: 'app-inputarea',
  templateUrl: './inputarea.component.html',
  styleUrls: ['./inputarea.component.styl']
})

export class InputareaComponent implements OnInit {
  @Input() value = 'test';

  constructor(private inputService: InputService) {
    this.inputService.textMethod(this.value);
  }

  ngOnInit() {
  }

  change() {
    this.inputService.textMethod(this.value);
  }

  hello() {
    alert(this.value);
  }
}
