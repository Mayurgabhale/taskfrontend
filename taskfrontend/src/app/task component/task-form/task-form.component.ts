import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task, TaskService } from '../../service/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  task: Task = { id:0,name: '', description: '', status: 'to-do' };
  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  addTask() {
    this.taskService.createTask(this.task).subscribe((newTask) => {
      this.taskCreated.emit(newTask);
      this.task = { id:0,name: '', description: '', status: 'to-do' };
    });
  }
}
