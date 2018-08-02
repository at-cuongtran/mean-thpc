import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subscription } from '../../node_modules/rxjs/Subscription';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  x = 0;
  subscriber: Subscription;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.subscriber =  this.http.get(environment.SERVER_URI)
      .subscribe((data: Array<Object>) => {
        console.log(data);
        this.x = data && data.length;
      })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
