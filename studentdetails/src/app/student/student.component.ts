import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private http: Http) { }
  confirmationString:string = "New student has been added";
  isAdded: boolean = false;
  studentobj:object ={};

  addNewStudent = function(student) {
    this.studentobj = {
      "name": student.name,
      "coursename": student.coursename,
      "place": student.place,
      "projectname": student.projectname
    }
    this.http.post("http://localhost:4000/students/", this.studentobj).subscribe((res:Response) => {
      this.isAdded = true;

    })
  }

  ngOnInit() {
  }

}
