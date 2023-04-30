import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { BoardService } from 'src/app/services/board-taskList-service/board-taskList-service.service';
import { TaskList } from 'src/app/models/taskList';
import { ActivatedRoute } from '@angular/router';
import { Form } from 'src/app/models/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements Form {
  form: FormGroup;

  listName: string = '';
  listDescription: string = '';

  boardId = this.route.snapshot.paramMap.get('boardId');

  @Output() listCreated = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();

  @ViewChild('name') name!: ElementRef<any>;

  constructor(private fb: FormBuilder, private boardService: BoardService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      listName: ['', [Validators.required]],
      listDescription: ['', []]
    });
  }

  checkErrors(): boolean {
    if (this.form.controls['listName'].errors) {
      this.onError(this.name);
      return true;
    } 
    return false;
  }

  resetErrors(): void {
    this.name.nativeElement.style.boxShadow = 'none';
  }
  
  onError(label: ElementRef) {
    label.nativeElement.style.boxShadow = '0px 0px 7px rgba(255, 113, 113, 0.7)';
  }

  onSubmit() {
    console.log("list: ", this.listName, " description: ", this.listDescription);
    this.resetErrors();
    if (this.checkErrors()) return;
    if (!this.boardId) return;
    
    this.boardService.createList(this.boardId, this.listName, this.listDescription, []).subscribe({
      next: (list: TaskList) => {
        this.listCreated.emit(list);
        this.listName = '';
        this.listDescription = '';
      },
      error: (error) => console.log(error)
    });
  }

  onClose() {
    this.closePopup.emit();
  }
}