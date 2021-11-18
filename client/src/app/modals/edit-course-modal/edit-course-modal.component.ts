import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Course } from 'src/app/_models/course';

@Component({
  selector: 'app-edit-course-modal',
  templateUrl: './edit-course-modal.component.html',
  styleUrls: ['./edit-course-modal.component.css']
})
export class EditCourseModalComponent implements OnInit {

  @Input() updateSelectedSubject = new EventEmitter();
  course!: Course;
  courseForm!: FormGroup;
  validationErrors: string[] = [];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    this.courseForm = this.fb.group({
      code: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(6)]],
      type: ['', Validators.required],
      lecturer: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(6)]], 
      starttime: ['', Validators.required],
      endtime: ['', Validators.required],
      limit: ['', Validators.required],
    })

    this.courseForm.controls['code'].setValue(this.course.code);
    this.courseForm.controls['type'].setValue(this.course.type);
    this.courseForm.controls['lecturer'].setValue(this.course.username);
    this.courseForm.controls['starttime'].setValue(this.course.startTime);
    this.courseForm.controls['endtime'].setValue(this.course.endTime);
    this.courseForm.controls['limit'].setValue(this.course.limit);
  }

  updateCourse() {
    this.course.type = this.courseForm.controls['type'].value;
    this.course.code = this.courseForm.controls['code'].value;
    this.course.username = this.courseForm.controls['lecturer'].value;
    this.course.startTime = this.courseForm.controls['starttime'].value;
    this.course.endTime = this.courseForm.controls['endtime'].value;
    this.course.limit = this.courseForm.controls['limit'].value;

    this.updateSelectedSubject.emit(this.course);
    this.bsModalRef.hide();
  }

}
