import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-add-course-modal',
  templateUrl: './add-course-modal.component.html',
  styleUrls: ['./add-course-modal.component.css']
})
export class AddCourseModalComponent implements OnInit {

  @Input() addNewCourse = new EventEmitter();
  course!: Course;
  courseForm!: FormGroup;
  validationErrors: string[] = [];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.intitializeForm();
  }


  //TODO form nem mukodik
  intitializeForm() {
    this.courseForm = this.fb.group({
      type: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(6)]],
      startTime: ['', Validators.required], 
      endTime: ['', Validators.required],
      limit: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
    })
  }

  addCourse() {
    this.course.type = this.courseForm.controls['type'].value;
    this.course.startTime = this.courseForm.controls['startTime'].value;
    this.course.endTime = this.courseForm.controls['endTime'].value;
    this.course.limit = this.courseForm.controls['limit'].value;

    this.addNewCourse.emit(this.course);
    this.bsModalRef.hide();
  }

}
