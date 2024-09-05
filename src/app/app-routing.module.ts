import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanComponent } from './kanban/kanban.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {path: "kanban", component: KanbanComponent},
  {path: "state-management-check", component: TaskComponent},
  { path: '', redirectTo: 'kanban', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
