import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'src/app/_models/subjects';

@Component({
  selector: 'app-edit-subject-modal',
  templateUrl: './edit-subject-modal.component.html',
  styleUrls: ['./edit-subject-modal.component.css']
})
export class EditSubjectModalComponent implements OnInit {
  @Input() updateSelectedSubject = new EventEmitter();
  subject!: Subject;
  subjectForm!: FormGroup;
  validationErrors: string[] = [];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    this.subjectForm = this.fb.group({
      code: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(6)]],
      name: ['', Validators.required],
      lecturer: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(6)]], 
    })

    this.subjectForm.controls['code'].setValue(this.subject.code);
    this.subjectForm.controls['name'].setValue(this.subject.name);
    this.subjectForm.controls['lecturer'].setValue(this.subject.userName);
  }

  updateSubject() {
    this.subject.name = this.subjectForm.controls['name'].value;
    this.subject.code = this.subjectForm.controls['code'].value;
    this.subject.userName = this.subjectForm.controls['lecturer'].value;

    this.updateSelectedSubject.emit(this.subject);
    this.bsModalRef.hide();
  }

}
