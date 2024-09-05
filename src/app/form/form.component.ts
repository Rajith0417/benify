import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  taskDescription: string = '';
  @Output() descriptionEvent = new EventEmitter<string>();

  submitTask() {
    if(this.taskDescription != ""){
      this.descriptionEvent.emit(this.taskDescription);
      this.taskDescription = "";
    }
  }
}
