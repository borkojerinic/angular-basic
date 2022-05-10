import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UsersResponse } from './users-response';
import { IUser, SingleUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'http://dev.qposoft.com:4082/api/users';
  queryParams = `?pageSize=10&page=0`;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(pageSize: number, pageIndex: number, search: string, orderBy: string, direction: string): Observable<UsersResponse> {
    this.queryParams = `?pageSize=${pageSize}&page=${pageIndex + 1}&search=${search}&order=${orderBy}&direction=${direction}`;

    return this.http
      .get<UsersResponse>(this.userUrl + this.queryParams)
      .pipe(
        catchError(this.handleError)
      );
  }

  filter(search: string) {
    return this.http
      .get<UsersResponse>(this.userUrl + `${this.queryParams}&search=${search}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<SingleUser> {
    return this.http
      .get<SingleUser>(this.userUrl + `/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(user: IUser) {
    return this.http
      .put<IUser>(this.userUrl + `/${user.id}`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(user: IUser): Observable<any> {
    return this.http.delete(this.userUrl + `/${user.id}`);
  }

  public addUser(user: IUser) {
    return this.http
      .post(this.userUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
