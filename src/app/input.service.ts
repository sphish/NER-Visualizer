import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  textMethod$: Observable<any>;
  private textMethodSubject = new Subject<any>();

  constructor(private http: HttpClient) {
      this.textMethod$ = this.textMethodSubject.asObservable();
  }

  textMethod(data: string) {
      console.log(data); // I have data! Let's return it so subscribers can use it!
      // we can do stuff with data if we want
      this.textMethodSubject.next(data);
  }

  TestGet(): Observable<any> {
    return this.http.get('http://127.0.0.1:5000/', {responseType: 'json'});
  }
}
