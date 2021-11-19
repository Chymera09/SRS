import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from '../_models/course';
import { User } from '../_models/user';
import { UserCourse } from '../_models/userCourse';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addCourse(course: Course) {
    const user: User = JSON.parse(localStorage.getItem('user')!);

    course.username = user.username;
    return this.http.post<Course>(this.baseUrl + 'course/add', course);
  }

  getCoursesBySubject(subjectCode: string) {
    return this.http.get<Partial<Course>[]>(this.baseUrl + 'course/' + subjectCode);
  }

  getCourses() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    return this.http.get<Partial<Course>[]>(this.baseUrl + 'course/courses/' + user.username);
  }

  updateCourse(course: Course) {
    return this.http.put<Course>(this.baseUrl + 'course', course);
  }

  takeCourse(courseId: number) {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    let userCourse : UserCourse = {username: user.username, courseid: courseId};

    return this.http.post<Course>(this.baseUrl + 'course/takeCourse', userCourse);
  }

  dropCourse(courseId: number){
    const user: User = JSON.parse(localStorage.getItem('user')!);
    let userCourse : UserCourse = {username: user.username, courseid: courseId};

    return this.http.request<UserCourse>('delete', this.baseUrl + 'course', {body: userCourse});
  }
}
