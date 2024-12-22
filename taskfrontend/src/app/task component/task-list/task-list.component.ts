import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    id: 0,
    name: '',
    description: '',
    status: 'to-do',
  };
  isEditing: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }

  addTask(): void {
    if (this.isEditing) {
      // Update task
      this.taskService.updateTask(this.newTask.id, this.newTask).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.resetForm();
        },
        error: (err) => console.error('Error updating task:', err),
      });
    } else {
      // Add new task
      this.taskService.createTask(this.newTask).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.resetForm(); // Reset form after adding task
        },
        error: (err) => console.error('Error adding task:', err),
      });
    }
  }

  editTask(task: Task): void {
    this.newTask = { ...task };
    this.isEditing = true;
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => (this.tasks = this.tasks.filter((task) => task.id !== taskId)),
      error: (err) => console.error('Error deleting task:', err),
    });
  }

  resetForm(): void {
    this.newTask = { id: 0, name: '', description: '', status: 'to-do' };
    this.isEditing = false;
  }
}
