import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: Http) { }
  id: number;
  private headers = new Headers({'content-type': 'application/json' });
  students =[];
  fetchData = function() {
    this.http.get("http://localhost:4000/students").subscribe(
      (res: Response) => {
        this.students = res.json();
      }
    )
  }

  deletestudent = function(id) {
    if(confirm("Are you sure?")){
      const url = '${"http://localhost:4000/students"}/${id}';
      return this.http.delete (url, {headers: this.headers}).toPromise()
      .then (() =>{
      this.fetchData();
      })
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  
}
