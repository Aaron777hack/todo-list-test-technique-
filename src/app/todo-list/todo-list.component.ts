import { Component, Inject } from '@angular/core';
import { TodoService } from '../shared/todo-list.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],

})
export class TodoListComponent {
  closeResult = '';
  todos :any = []
  empForm: FormGroup;
  searchResults: any[] = [];
  searchQuery: string = '';



  constructor(
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private todo:TodoService,
    private modalService: NgbModal,
    private firestore: AngularFirestore
    ){
      this.empForm = this._fb.group({
        taskState: '',
        name: '',
        description: '',
        picker: '',

      });

  }

  ngOnInit(): void {

    this.todo.firestoreCollection.valueChanges({idField:'id'}).subscribe(item =>{
      console.log(item)
      this.todos = item.sort((a:any,b:any) =>
      {return a.isDone -b.isDone } );
    })

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  


  search(event:any) {
    let q = event.target.value;
    this.firestore.collection('test-technique', ref =>
      ref.where('title', '==', q)
    ).valueChanges().subscribe(data => {
      this.searchResults = data;
    });
  }

  getTask(id:string){
    this.todo.getTask(id);

  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log(val)
        }
      },
    });
  }



  onStatusChange(id: string, newState:boolean){
    this.todo.updateTodoStatus(id, newState);
  }
  onDeleteTask(id: string){
    this.todo.deleteTodoTask(id);
  }
}
