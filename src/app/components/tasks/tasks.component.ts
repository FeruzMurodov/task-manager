import {Component, OnInit} from '@angular/core';
import {Task} from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = ''

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    const newTask: Task = {
      id: this.tasks.length + 1,
      title: this.newTaskTitle,
      completed: false
    };

    this.tasks.push(newTask);
    this.newTaskTitle = '';
    this.saveTasks();
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  toggleTask(taskId: number) {
    this.tasks = this.tasks.map(task =>
      task.id === taskId ? {...task, completed: !task.completed} : task
    );
    this.saveTasks();
  }
}
