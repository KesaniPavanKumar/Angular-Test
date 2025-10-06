import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos$ = new BehaviorSubject<any[]>([]);
  todosObs$ = this.todos$.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    this.http.get<any[]>(`${environment.apiBase}/todos`)
      .subscribe({
        next: res => this.todos$.next(res),
        error: () => this.todos$.next([])
      });
  }

  create(todo: any) {
    return this.http.post(`${environment.apiBase}/todos`, todo);
  }

  update(id: number, todo: any) {
    return this.http.put(`${environment.apiBase}/todos/${id}`, todo);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiBase}/todos/${id}`);
  }

  get(id: number) {
    return this.http.get(`${environment.apiBase}/todos/${id}`);
  }
}
