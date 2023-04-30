import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from 'src/app/models/board';
import { Task } from 'src/app/models/task';
import { TaskList } from 'src/app/models/taskList';
import { BoardService } from 'src/app/services/board-taskList-service/board-taskList-service.service';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {
  board!: Board;
  lists: TaskList[] = [];
  tasks: Task[] = [];

  boardId = this.route.snapshot.paramMap.get('boardId');
  selectedList!: TaskList;

  showPopup: boolean = false;
  showCreateList: boolean = false;
  showSettings: boolean = false;
  showListDetail: boolean = false;

  @ViewChild('sidebar') sidebar!: ElementRef<any>;

  constructor(private boardService: BoardService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getBoard();
    this.getLists();
  }

  getBoard(): void {
    if (this.boardId) {
      this.boardService.getBoard(this.boardId).subscribe(
        (board: Board) => {
          console.log('Board retrieved:', board);
          this.board = board;
        },
        (error: any) => {
          console.error('Error retrieving board:', error);
        }
      );
    }
  }

  getLists(): void {
    if (this.boardId) {
      this.boardService.getTaskListsByBoardId(this.boardId.toString()).subscribe(
        (lists: TaskList[]) => {
          console.log('Lists retrieved:', lists);
          this.lists = lists;
          if (this.lists.length > 0) this.selectList(this.lists[0]);
        },
        (error: any) => {
          console.error('Error retrieving lists:', error);
        }
      );
    }
  }

  hidePopup() {
    if (this.showPopup) this.showPopup = false;
    if (this.showCreateList) this.showCreateList = false;
    if (this.showSettings) this.showSettings = false;
  }

  toggleSidebar() {
    this.sidebar.nativeElement.classList.toggle('sidebar-closed');
  }

  addList(newList: TaskList) {
    this.lists.push(newList);
    this.hidePopup();
    this.selectList(newList);
  }

  selectList(list: TaskList): void {
    this.selectedList = list;
    console.log("seleccionada", list.id);
    this.showListDetail = true;
    this.router.navigate(['lists', list.id], { relativeTo: this.route, replaceUrl: true });
  }

  deleteTasklist(tasklist_id: number): void {
    this.boardService.deleteTasklist(this.board.id.toString(), tasklist_id.toString()).subscribe(
      () => {
        for (let index = 0; index < this.lists.length; index++) {
          if (this.lists[index].id == tasklist_id) {
            this.lists.splice(index, 1);
            console.log('Deleted list:', tasklist_id);
            break;
          }
        }
      },
      (error: any) => {
        console.error('Error deleting tasklist:', error);
      }
    );
  }

  toggleFill(element: HTMLElement) {
    element.classList.toggle('bi-plus-square');
    element.classList.toggle('bi-plus-square-fill');
  }

  openCreateList() {
    this.showPopup = true; 
    this.showCreateList = true;
  }

  openSettings() {
    this.showPopup = true;
    this.showSettings = true;
  }

  updateBoard(board: Board) {
    this.board = board;
  }
}