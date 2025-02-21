import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importation de ReactiveFormsModule
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,  // Indique que c'est un composant standalone
  imports: [ReactiveFormsModule, CommonModule],  // Assure-toi d'ajouter ReactiveFormsModule dans 'imports'
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskForm: FormGroup;

  @Output() taskAdded = new EventEmitter<Task>(); // Émetteur pour envoyer la tâche ajoutée

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]], // Titre requis et longueur min
      description: ['', [Validators.required, Validators.minLength(5)]], // Description requise et longueur min
      priority: ['', Validators.required], // Priorité requise
    });
  }

  // Méthode pour ajouter une tâche
  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        idTask: Math.floor(Math.random() * 10000), // Id unique
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        isCompleted: false,
        priority: this.taskForm.value.priority,
        createdAt: new Date(),
        deadline: new Date(new Date().setDate(new Date().getDate() + 2)), // deadline dans 2 jours
      };

      this.taskAdded.emit(newTask); // Émet la nouvelle tâche vers le parent
      this.taskForm.reset(); // Réinitialiser le formulaire après l'ajout
    }
  }
}
