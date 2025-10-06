import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { TodoListComponent } from './features/todo/todo-list/todo-list.component';
import { TodoFormComponent } from './features/todo/todo-form/todo-form.component';
import { MapComponent } from './features/map/map/map.component';
import { WeatherComponent } from './features/weather/weather/weather.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoListComponent },
  { path: 'todo/add', component: TodoFormComponent },
  { path: 'todo/edit/:id', component: TodoFormComponent },
  { path: 'todo/:id', component: TodoFormComponent },
  { path: 'map', component: MapComponent },
  { path: 'weather', component: WeatherComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
