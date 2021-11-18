import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';
import { RegisterComponent } from './register/register.component';
import { SubjectComponent } from './subject/subject/subject.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'courses', component: CourseComponent, canActivate: [AdminGuard]},
      {path: 'subjects', component: SubjectComponent},
      {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
      {path: 'register', component: RegisterComponent, canActivate: [AdminGuard]},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
