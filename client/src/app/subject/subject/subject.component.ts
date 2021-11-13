import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddSubjectModalComponent } from 'src/app/modals/add-subject-modal/add-subject-modal.component';
import { EditSubjectModalComponent } from 'src/app/modals/edit-subject-modal/edit-subject-modal.component';
import { Subject } from 'src/app/_models/subjects';
import { SubjectService } from 'src/app/_services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects?: Partial<Subject>[];
  bsModalref?: BsModalRef;

  constructor(private subjectService: SubjectService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getSubject();
  }

  getSubject() {
    this.subjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
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
      this.subjectService.updateSubject(subject).subscribe()
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
    let subject: Subject = {id: 0, name: 'a', code: 'b', username: 'c'};
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        subject
      }
    }
    this.bsModalref = this.modalService.show(AddSubjectModalComponent, config);
    this.bsModalref.content.addNewSubject.subscribe((values: any[]) => {
      console.log("code:       " + subject.name);
      this.subjectService.addSubject(subject).subscribe()
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
