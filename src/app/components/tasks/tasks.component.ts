import {Component} from '@angular/core';
import {Task} from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [
    {id: 1, title: 'Learn Angular', completed: false},
    {id: 2, title: 'Create task manager', completed: true},
    {id: 3, title: 'Connect firebase', completed: false},
  ];

  newTaskTitle: string = ''

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    const newTask: Task = {
      id: this.tasks.length + 1,
      title: this.newTaskTitle,
      completed: false
    };

    this.tasks.push(newTask);
    this.newTaskTitle = '';
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}
