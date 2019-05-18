import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputareaComponent } from './outputarea.component';

describe('OutputareaComponent', () => {
  let component: OutputareaComponent;
  let fixture: ComponentFixture<OutputareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
