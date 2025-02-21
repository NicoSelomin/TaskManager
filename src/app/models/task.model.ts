export interface Task
{
  idTask: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: 'Haute' | 'Moyenne' | 'Basse';
  createdAt: Date;
  deadline: Date;
}
