import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { SubjectComponent } from './subject/subject/subject.component';
import { EditSubjectModalComponent } from './modals/edit-subject-modal/edit-subject-modal.component';
import { AddSubjectModalComponent } from './modals/add-subject-modal/add-subject-modal.component';
import { AddCourseModalComponent } from './modals/add-course-modal/add-course-modal.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ShowCoursesModalComponent } from './modals/show-courses-modal/show-courses-modal.component';
import { CourseComponent } from './course/course.component';
import { EditCourseModalComponent } from './modals/edit-course-modal/edit-course-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    RolesModalComponent,
    DateInputComponent,
    TextInputComponent,
    SubjectComponent,
    EditSubjectModalComponent,
    AddSubjectModalComponent,
    AddCourseModalComponent,
    ShowCoursesModalComponent,
    CourseComponent,
    EditCourseModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    CollapseModule.forRoot()

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
