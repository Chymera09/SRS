import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-show-courses-modal',
  templateUrl: './show-courses-modal.component.html',
  styleUrls: ['./show-courses-modal.component.css']
})
export class ShowCoursesModalComponent implements OnInit {

  @Input() ShowCourses = new EventEmitter();
  subjectcode?: string;
  courses?: Partial<Course>[];
  taken: boolean = true;

  validationErrors: string[] = [];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    for(let asd of this.courses!)
    {
      console.log(asd.taken);
    }
  }

  TakeOrDropCourse(course: any) {
    course.taken = !course.taken;
    this.ShowCourses.emit(course);
    // this.bsModalRef.hide();
  }

}
