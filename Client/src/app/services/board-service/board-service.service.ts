import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { BoardList } from 'src/app/models/boardList';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiUrl = 'http://localhost:8082/api/boards';

  constructor(private http: HttpClient) { }

  // Gets all boards from backend
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.apiUrl);
  }

  // Gets a board by id
  getBoard(id: string): Observable<Board> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Board>(url); // El problema está aquí C:
  }

  // Creates a new board in backend
  createBoard(boardName: string, boardDescription: string): Observable<any> {
    const board = {
      name: boardName,
      description: boardDescription,
    };
    return this.http.post(`${this.apiUrl}/createBoard`, board);
  }

  getBoardListsByBoardId(boardId: string): Observable<BoardList[]> {
    return this.http.get<BoardList[]>(`${this.apiUrl}/${boardId}/lists`);
  }

  createList(boardId: number, listName: string, listDescription: string): Observable<any> {
    const list = {
      name: listName,
      description: listDescription,
    };
    return this.http.post(`${this.apiUrl}/${boardId}/lists`, list);
  }
}