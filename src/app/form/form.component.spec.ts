import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ FormsModule, MatInputModule, BrowserAnimationsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update taskDescription when input value changes', () => {
    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const testValue = 'New Task';

    console.log('Initial taskDescription:', component.taskDescription);
    console.log('Initial input value:', inputElement.value);

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    console.log('Updated taskDescription:', component.taskDescription);
    console.log('Updated input value:', inputElement.value);

    expect(inputElement.value).toBe(testValue);
    expect(component.taskDescription).toBe(testValue);
  });

  it('should emit taskDescription and clear it when submitTask is called', () => {
    const testValue = 'New Task';
    component.taskDescription = testValue;

    spyOn(component.descriptionEvent, 'emit');

    component.submitTask();

    expect(component.descriptionEvent.emit).toHaveBeenCalledWith(testValue);
    expect(component.taskDescription).toBe('');
  });
});
