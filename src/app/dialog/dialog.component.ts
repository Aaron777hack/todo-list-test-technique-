import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from '../shared/todo-list.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  education: string[] = [
    'A faire',
    'En cours',
    'Bloqué',
    'Terminé',
  ];

  empForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private todo:TodoService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: any,


  ) {
    this.empForm = this._fb.group({
      taskState: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      picker: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }





  onFormSubmit() {
    const formValues = this.empForm.value;
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(formValues.picker, 'yyyy-MM-dd');

    if (this.empForm.valid) {
      console.log(this.empForm.value)
      this.todo.addTodo(
        formValues.name,
        formValues.description,
        formattedDate,
        formValues.taskState,
      );


    }else{
      this.openSnackBar("Remplissez tous les champs")
    }

  }

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }

 

}
