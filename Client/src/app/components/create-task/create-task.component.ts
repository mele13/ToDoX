import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardService } from 'src/app/services/board-service/board-service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  constructor(private boardService: BoardService) {}

  // @Input() boardId: number;
  @Output() taskCreated = new EventEmitter<any>();
  
  taskName: string = '';
  taskDescription: string = '';

  onSubmit() {
    console.log("list name: ", this.taskName, " description: ", this.taskDescription);
    // this.boardService.createList(this.boardId, this.listName, this.listDescription).subscribe({
    //   next: (list) => {
    //     this.listCreated.emit(list);
    //     this.listName = '';
    //     this.listDescription = '';
    //   },
    //   error: (error) => console.log(error)
    // });
  }

}
