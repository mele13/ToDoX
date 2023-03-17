import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  onBoardCreated(board: any) {
    this.http.post('http:/localhost:8082/api/boards', board).subscribe((response) => {
      console.log(response);
    });
  }
}
