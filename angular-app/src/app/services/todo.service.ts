

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Todo } from "../models/Todo";
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tojsonUrl:string   = 'https://jsonplaceholder.typicode.com/todos';
  myTodosUrl:string  = 'http://localhost:3200/api/todos';
  todosLimit:string  = '?_limit=5'

  constructor(private http:HttpClient) { }
  // get todos
  getTodos():Observable<Todo[]> {
    //return this.http.get<Todo[]>(`${this.tojsonUrl}${this.todosLimit}`)
    return this.http.get<Todo[]>(`${this.myTodosUrl}`)
  }

  // toggle completed BROKEN MY API
  toggleCompleted(todo:Todo):Observable<any> {
    const url = `${this.myTodosUrl}/${todo.id}`
    return this.http.put(url, todo, httpOptions);
  }

  //delete todo

  deleteTodo(todo:Todo):Observable<Todo>
  {
    const url = `${this.myTodosUrl}/${todo.id}`
   // return this.http.delete<Todo>(url,httpOptions)
   return this.http.delete<Todo>(url,httpOptions)
  }

}
