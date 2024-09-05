import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    // Provide a mock Task for the @Input property
    component.task = { id: 1, description: 'Test Task', status: 'To Do' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a task input', () => {
    expect(component.task).toBeDefined();
    expect(component.task.id).toBe(1);
    expect(component.task.description).toBe('Test Task');
    expect(component.task.status).toBe('To Do');
  });

  it('should emit removeTaskId when removeTask is called', () => {
    spyOn(component.removeTaskId, 'emit');
    component.removeTask(1);
    expect(component.removeTaskId.emit).toHaveBeenCalledWith(1);
  });

  it('should emit the correct task id when removeTask is called', () => {
    let emittedId: number | undefined;
    component.removeTaskId.subscribe((id: number) => emittedId = id);
    component.removeTask(1);
    expect(emittedId).toBe(1);
  });
});
