import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from './todo'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable()
export class TodoService {

  private todosURL = 'http://localhost:3000/api/todos/'

  constructor(
    private http: HttpClient) { }

    getTodos (): Observable<Todo[]>{
      return this.http.get<Todo[]>(this.todosURL)
    }

    addTodo (todo: Todo): Observable<Todo> {
      return this.http.post<Todo>(this.todosURL, todo, httpOptions).pipe(
        tap((todo: Todo) => this.log(`We ve added the to do with id=${todo.id}`)),
        catchError(this.handleError<Todo>('addTodo'))
      );
    }
    updateTodo(todo: Todo): Observable<Todo>{
      // console.log(todo.id)
      return this.http.put<Todo>(this.todosURL+todo.id, todo, httpOptions)
    }
    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    private log(message: string) {
    }


}
