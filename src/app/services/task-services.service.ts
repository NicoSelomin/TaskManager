import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskServicesService {
  private localStorageKey = 'taskData'; // Clé du stockage local

  constructor() { }

  // 🔹 Sauvegarde toutes les tâches dans localStorage
  saveTask(tasks: Task[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  // 🔹 Charge toutes les tâches depuis localStorage
  loadTask(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  // 🔹 Ajouter une tâche et sauvegarder
  addTask(task: Task): void {
    const tasks = this.loadTask();
    task.idTask = tasks.length + 1; // Génère un ID unique
    tasks.push(task);
    this.saveTask(tasks);
  }

  updateTask(task: Task): void {
    let tasks = this.loadTask();
    tasks = tasks.map(t => t.idTask === task.idTask ? task : t);
    this.saveTask(tasks);
  }

  // 🔹 Supprimer une tâche
  deleteTask(idTask: number): void {
    let tasks = this.loadTask();
    tasks = tasks.filter(t => t.idTask !== idTask);
    this.saveTask(tasks);
  }
}
