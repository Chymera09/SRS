import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subject } from '../_models/subjects';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSubjects() {
    return this.http.get<Partial<Subject>[]>(this.baseUrl + 'subject/subjects');
  }

  updateSubject(subject: Subject) {
    return this.http.put<Subject>(this.baseUrl + 'subject', subject);
  }

  addSubject(subject: Subject) {
    const user: User = JSON.parse(localStorage.getItem('user')!);

    subject.username = user.username;
    return this.http.post<Subject>(this.baseUrl + 'subject/add', subject);
  }
}
