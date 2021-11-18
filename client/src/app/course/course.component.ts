import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EditCourseModalComponent } from '../modals/edit-course-modal/edit-course-modal.component';
import { Course } from '../_models/course';
import { CourseService } from '../_services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses?: Partial<Course>[];
  bsModalref?: BsModalRef;
  validationErrors: string[] = [];

  constructor(private courseService: CourseService,
              private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.GetCourses();
  }

  GetCourses() : void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    })
  }

  openEditCourseModal(course: any) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        course
      }
    }
    this.bsModalref = this.modalService.show(EditCourseModalComponent, config);
    this.bsModalref.content.updateSelectedSubject.subscribe((values: any[]) => {
      this.courseService.updateCourse(course).subscribe(response => {
        this.toastr.success('Subject updated');
      }, error => {
        this.validationErrors = error;
        this.toastr.error(this.validationErrors[0]);
      })
    });
  }
}
