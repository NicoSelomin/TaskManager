import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskServicesService } from '../../services/task-services.service'
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit  {
  tasks : Task[] = [];
  constructor(private taskService: TaskServicesService, private router: Router) { }
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

  markTaskAsCompleted(task: Task) {
    task.isCompleted = true;
    this.taskService.updateTask(task);
    this.loadTasks(); // Rafraîchir la liste après modification
  }

  editTask(task: Task) {
    // Redirection vers une page d'édition (si tu as une page dédiée à l'édition)
    this.router.navigate(['/edit-task', task.idTask]);
  }

  deleteTask(idTask: number) {
    this.taskService.deleteTask(idTask);
    this.loadTasks(); // Rafraîchir la liste après suppression
  }



}
