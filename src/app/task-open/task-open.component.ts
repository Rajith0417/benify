import { Component } from '@angular/core';
import { Task } from '../kanban/task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-open',
  templateUrl: './task-open.component.html',
  styleUrl: './task-open.component.scss'
})
export class TaskOpenComponent {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.task = this.taskService.getTaskById(+taskId);
    }
  }

  goBack() {
    this.router.navigate(['/kanban']);
  }
}
