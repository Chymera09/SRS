import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from '../_models/course';
import { User } from '../_models/user';

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
    return this.http.get<Partial<Course>[]>(this.baseUrl + 'course/courses');
  }

  updateCourse(course: Course) {
    return this.http.put<Course>(this.baseUrl + 'course', course);
  }
}
