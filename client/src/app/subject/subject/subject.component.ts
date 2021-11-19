import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AddCourseModalComponent } from 'src/app/modals/add-course-modal/add-course-modal.component';
import { AddSubjectModalComponent } from 'src/app/modals/add-subject-modal/add-subject-modal.component';
import { EditSubjectModalComponent } from 'src/app/modals/edit-subject-modal/edit-subject-modal.component';
import { ShowCoursesModalComponent } from 'src/app/modals/show-courses-modal/show-courses-modal.component';
import { Course } from 'src/app/_models/course';
import { Subject } from 'src/app/_models/subjects';
import { CourseService } from 'src/app/_services/course.service';
import { SubjectService } from 'src/app/_services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects?: Partial<Subject>[];
  courses?: Partial<Course>[];
  bsModalref?: BsModalRef;
  validationErrors: string[] = [];

  constructor(private subjectService: SubjectService,
              private courseService: CourseService,
              private modalService: BsModalService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSubject();
    this.GetCourses();
  }

  getSubject() {
    this.subjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    })
  }

  GetCourses() : void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    })
  }

  openEditSubjectModal(subject: any) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        subject
      }
    }
    this.bsModalref = this.modalService.show(EditSubjectModalComponent, config);
    this.bsModalref.content.updateSelectedSubject.subscribe((values: any[]) => {
      this.subjectService.updateSubject(subject).subscribe(response => {
        this.toastr.success('Subject updated');
      }, error => {
        this.validationErrors = error;
        this.toastr.error(this.validationErrors[0]);
      })
    });
    /*this.bsModalref.content.updateSelectedRoles.subscribe((values: any[]) => {
      
      /*const rolesToUpdate = {
        roles: [...values.filter((el: { checked: boolean; }) => el.checked ===true).map(el => el.name)]
      };
      if(rolesToUpdate) {
        this.subjectService.updateSubjects(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles]
        })
      }
    });*/
  }


  openAddSubjectModal()
  {
    let subject: Subject = {id: 0, name: 'a', code: 'b', userName: 'c'};
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        subject
      }
    }
    this.bsModalref = this.modalService.show(AddSubjectModalComponent, config);
    this.bsModalref.content.addNewSubject.subscribe((values: any[]) => {
      this.subjectService.addSubject(subject).subscribe(response => {
        this.toastr.success('New subject added');
      }, error => {
        this.validationErrors = error;
        this.toastr.error(this.validationErrors[0]);
      });
    });
  }

  openAddCourseModal(subject: any)
  {
    //TODO partial
    let course: Course = {id: 0, type: 'a', startTime: 'b', endTime: 'c', limit: 0, username: 'd', code: subject.code, taken: false};
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        course
      }
    }
    this.bsModalref = this.modalService.show(AddCourseModalComponent, config);
    this.bsModalref.content.addNewCourse.subscribe((values: any[]) => {
      this.courseService.addCourse(course).subscribe(response => {
        this.toastr.success('New course added');
      }, error => {
        this.validationErrors = error;
        this.toastr.error(this.validationErrors[0]);
      })
    });
  }

  openShowCourseModal(subject: any)
  {
    var courses : Partial<Course>[] = [];

    if(this.courses == undefined) {
      return;
    }

    for(let course of this.courses!)
    {
      if(course.code == subject.code) {
        courses.push(course);
      }
    }
    var subjectcode = subject.code;

    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        courses        
      }
    }
    this.bsModalref = this.modalService.show(ShowCoursesModalComponent, config);
    this.bsModalref.content.ShowCourses.subscribe((course: any) => {
      if(course.taken)
      {
        this.courseService.takeCourse(course.id).subscribe(response => {
          this.toastr.success('Course Taken');
        }, error => {
          this.validationErrors = error;
          this.toastr.error(this.validationErrors[0]);
        })
      } else {
        this.courseService.dropCourse(course.id).subscribe(response => {
          this.toastr.success('Course Dropped');
        }, error => {
          this.validationErrors = error;
          this.toastr.error(this.validationErrors[0]);
        })
      }
    });
  }





  /*private getRolesArray(user: User) {
    const roles: string[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] =[
      {name: 'Admin', value: 'Admin'},
      {name: 'Lecturer', value: 'Lecturer'},
      {name: 'Member', value: 'Member'}
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if(role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if(!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }*/
}
