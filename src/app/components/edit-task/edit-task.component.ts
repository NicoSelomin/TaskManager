import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServicesService } from '../../services/task-services.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;
  task!: Task;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskServicesService
  ) {}

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id')); // Récupérer l'ID depuis l'URL
    this.task = this.taskService.loadTask().find(t => t.idTask === this.taskId)!;

    // Initialisation du formulaire avec les valeurs de la tâche existante
    this.taskForm = this.fb.group({
      title: [this.task.title, [Validators.required, Validators.minLength(5)]],
      description: [this.task.description, [Validators.required, Validators.minLength(10)]],
      priority: [this.task.priority, Validators.required],
      deadline: [this.task.deadline.toISOString().split('T')[0], Validators.required]
    });
  }

  updateTask() {
    if (this.taskForm.invalid) return;

    const updatedTask: Task = {
      ...this.task,
      ...this.taskForm.value
    };

    this.taskService.updateTask(updatedTask);
    this.router.navigate(['/']); // Redirection après modification
  }
}

