import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];

  constructor( private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void{
    this.todoService.getTodos()
    .subscribe(todos => this.todos = todos);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return ;}
    this.todoService.addTodo( { name } as Todo)
      .subscribe( todo => {
        this.todos.push(todo);
      })
  }
  update(completed, id, obj): void{
    completed = !completed;
    obj.completed= !obj.completed;
    this.todoService.updateTodo( { completed, id } as Todo)
    .subscribe( todo => {
      todo.completed = !completed;
    })
  }
}
