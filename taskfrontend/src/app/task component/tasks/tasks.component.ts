import { Component } from '@angular/core';
import { Task } from '../../service/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskListComponent,TaskFormComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks:Task[] = [];

  addTask(task:Task){
   this.tasks.push(task);
  }
}
