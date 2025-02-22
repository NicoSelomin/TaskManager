import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskServicesService } from '../../services/task-services.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskForm: FormGroup;

  @Output() taskAdded = new EventEmitter<Task>();

  constructor(private fb: FormBuilder, private taskService: TaskServicesService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['', Validators.required],
      deadline: ['', Validators.required] // Ajout de la date limite
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        idTask: 0, // Il sera défini dans le service
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        isCompleted: false, // Par défaut, la tâche n'est pas complétée
        priority: this.taskForm.value.priority,
        createdAt: new Date(), // Date actuelle
        deadline: new Date(this.taskForm.value.deadline) // Convertir en date
      };

      this.taskService.addTask(newTask);
      this.taskAdded.emit(newTask);
      this.taskForm.reset();
      this.router.navigate(['/']);
    }
  }
}
