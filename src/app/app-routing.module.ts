import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanComponent } from './kanban/kanban.component';
import { TaskOpenComponent } from './task-open/task-open.component';

const routes: Routes = [
  {path: "kanban", component: KanbanComponent},
  {path: "task/:id", component: TaskOpenComponent},
  { path: '', redirectTo: 'kanban', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
