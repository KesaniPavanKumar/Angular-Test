import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent implements OnInit {
  id: number | null = null;
  title = '';
  description = '';
  isCompleted = false;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.todoService.get(this.id).subscribe({
        next: (todo: any) => {
          this.title = todo.title;
          this.description = todo.description;
          this.isCompleted = todo.isCompleted;
        },
        error: (err) => console.error('Failed to load todo', err)
      });
    }
  }

  save() {
    const todo = { title: this.title, description: this.description, isCompleted: this.isCompleted };

    if (this.id) {
      this.todoService.update(this.id, todo).subscribe(() => this.router.navigate(['/todo']));
    } else {
      this.todoService.create(todo).subscribe(() => this.router.navigate(['/todo']));
    }
  }
}
