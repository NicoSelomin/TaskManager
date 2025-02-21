import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskServicesService } from '../../services/task-services.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit  {
  tasks : Task[] = [];
  constructor(private taskService: TaskServicesService) { }
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.loadTask();
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task);
    this.loadTasks();
  }

  

}
