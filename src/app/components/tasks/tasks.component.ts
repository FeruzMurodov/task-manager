import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Task} from 'src/app/models/task.model';
import {trigger, transition, style, animate, state} from "@angular/animations";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    trigger('taskAnimation', [
      state('completed', style({backgroundColor: '#d4edda'})),
      state('active', style({backgroundColor: '#f8d7da'})),
      transition('active <=> completed', [
        animate('300ms ease-out')
      ])
    ])
  ]


})
export class TasksComponent implements OnInit {

  @ViewChild('taskInput', {static: false}) taskInput!: ElementRef;

  tasks: Task[] = [];
  newTaskTitle: string = ''
  filter: string = 'all'

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.translate.use(savedLang);
    }
  }

  ngOnInit() {
    this.loadTasks();
    const savedFilter = localStorage.getItem('taskFilter');
    if (savedFilter) {
      this.filter = savedFilter;
    }

    setTimeout(() => this.taskInput.nativeElement.focus(), 0);
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

  saveTask(task: Task) {
    task.editing = false;
    this.saveTasks()
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    const newTask: Task = {
      id: this.tasks.length + 1,
      title: this.newTaskTitle,
      completed: false,
      editing: false,
      createdAt: new Date().toLocaleString()
    };

    this.tasks.push(newTask);
    this.newTaskTitle = '';
    this.saveTasks();
    this.taskInput.nativeElement.focus();
  }

  deleteTask(taskId: number) {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  toggleTask(taskId: number) {
    this.tasks = this.tasks.map(task =>
      task.id === taskId ? {
        ...task,
        completed: !task.completed,
        animationState: task.completed ? 'active' : 'completed'
      } : task
    );
    this.saveTasks();
  }

  get filteredTasks() {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'active') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }

  setFilter(filterType: string) {
    this.filter = filterType;
    localStorage.setItem('taskFilter', filterType);
  }

  clearCompletedTasks() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.saveTasks();
  }

  remainingTasksCount() {
    return this.tasks.filter(task => !task.completed).length;
  }

  editTask(task: Task) {
    task.editing = true;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.clearCompletedTasks();
    }
    if (event.ctrlKey && event.key === 'Enter') {
      this.addTask();
    }
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

}


