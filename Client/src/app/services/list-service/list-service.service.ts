import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListTask } from 'src/app/models/listTask';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiUrl = 'http://localhost:8082/api/tasks'; 

  constructor(private http: HttpClient) {}

  // Gets all boards from backend
  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(boardId: number): Observable<any> {
    return this.http.get<Task>(`${this.apiUrl}/${boardId}`);
  }

  // Creates a new board in backend
  createTask(taskName: string, taskDescription: string): Observable<any> {
    const task = {
      name: taskName,
      description: taskDescription,
    };
    return this.http.post(`${this.apiUrl}/createBoard`, board);
  }

  getBoardListsByBoardId(boardId: number): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${this.apiUrl}/${boardId}/lists`);
  }

  createList(boardId: number, listName: string, listDescription: string): Observable<any> {
    const list = {
      name: listName,
      description: listDescription,
    };
    return this.http.post(`${this.apiUrl}/${boardId}/lists`, list);
  }
}