import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<any[]>;

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.todos$ = this.todoService.todosObs$;
    this.refresh();
  }

  refresh() {
    this.todoService.load();
  }

  addTodo() {
    this.router.navigate(['/todo/new']);
  }

  viewTodo(id: number) {
    this.router.navigate(['/todo', id]);
  }

  editTodo(id: number) {
    this.router.navigate(['/todo/edit', id]);
  }

  deleteTodo(id: number) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.delete(id).subscribe(() => this.refresh());
    }
  }
}
