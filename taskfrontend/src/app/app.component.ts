import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task component/task-list/task-list.component';
import { Task } from './service/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-frontend';
  tasks:Task[] = [];

 addTask(task:Task){
  this.tasks.push(task);
 }
}
