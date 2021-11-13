import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'src/app/_models/subjects';

@Component({
  selector: 'app-add-subject-modal',
  templateUrl: './add-subject-modal.component.html',
  styleUrls: ['./add-subject-modal.component.css']
})
export class AddSubjectModalComponent implements OnInit {

  @Input() addNewSubject = new EventEmitter();
  subject!: Subject;
  subjectForm!: FormGroup;
  validationErrors: string[] = [];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.intitializeForm();
  }


  //TODO form nem mukodik
  intitializeForm() {
    this.subjectForm = this.fb.group({
      code: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(6)]],
      name: ['', Validators.required],    
    })
  }

  addSubject() {
    
    this.subject.id = 0;
    this.subject.name = this.subjectForm.controls['name'].value;
    this.subject.code = this.subjectForm.controls['code'].value;

    this.addNewSubject.emit(this.subject);
    this.bsModalRef.hide();
  }

}
