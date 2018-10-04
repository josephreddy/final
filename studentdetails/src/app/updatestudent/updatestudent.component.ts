import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-updatestudent',
  templateUrl: './updatestudent.component.html',
  styleUrls: ['./updatestudent.component.css']
})
export class UpdatestudentComponent implements OnInit {

  id:number;
  data:object = {};
  students = [];
  exist= false;
  studentobj:object = {};
  private headers = new Headers({'content-type': 'application/json' });

  constructor(private router: Router, private route: ActivatedRoute, private http: Http) { }

  updatestudent(student) {
    this.studentobj= {
      "name": student.name,
      "coursename": student.coursename,
      "place": student.place,
      "projectname": student.projectname
    };
    const url = '${"http://localhost:4000/students"}/${this.id}';
    this.http.put(url, JSON.stringify(this.studentobj), {headers: this.headers})
    .toPromise()
    .then(()=> {
      this.router.navigate(['/  ']);
    })


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    
      this.http.get("http://localhost:4000/students").subscribe(
        (res: Response) => {
          this.students = res.json();
          for(var i=0; i< this.students.length; i++){
            if(parseInt(this.students[i].id) ===this.id){
              this.exist=true;
               this.data=this.students[i];
               break;
            }else{
              this.exist = false;
            }
          }
        }
      )
  }

}
