import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: "root"
})
export class TodoService{
  firestoreCollection: AngularFirestoreCollection;
  todos :any = []


  constructor (
    private firestore:AngularFirestore,
    private _snackBar: MatSnackBar,

    ){
    this.firestoreCollection = firestore.collection('test-technique')
  }

  addTodo(title:string, description:string, deadline: string | null, isDone:string){
    this.firestoreCollection.add(
      {
        title : title,
        description: description,
        isDone: isDone == "Terminé" ? true:false,
        deadline: deadline
      }
    ).then(()=>       this.openSnackBar("Enregistré avec succès")
    )
  }

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }

  updateTitle(id: string, value:string){
    this.firestoreCollection.doc(id).update({
      title:value,
    });
  }
  updateDescription(id: string, value:string){
    this.firestoreCollection.doc(id).update({
      description:value,
    });
  }
  updateDeadline(id: string, value:string){
    this.firestoreCollection.doc(id).update({
      deadline:value,
    });
  }

  
  updateTodoStatus(id:string, newStatus: boolean){
    this.firestoreCollection.doc(id).update({isDone:newStatus});
  }
  deleteTodoTask(id:string){
    this.firestoreCollection.doc(id).delete();
  }
  getTask(id:string){
    this.firestoreCollection.doc(id).get();
  }


}
