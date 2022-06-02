import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, shareReplay, tap } from "rxjs";
import { User, SingleUser, UsersResponse, QueryParams } from '@app-models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //#region Class properties

  public userUrl: string = 'http://dev.qposoft.com:4082/api/users';
  public queryParams: string = `?pageSize=10&page=0`;

  //#endregion

  constructor(
    private http: HttpClient
  ) { }

  //#region Functionality

  /**
   * Get users from server
   * 
   * @param parameters QueryParams
   *  
   * @returns Observable<UsersResponse> - array of users(IUser[]), Links and Meta 
   */
  public getUsers(parameters: QueryParams): Observable<UsersResponse> {
    // const params = new HttpParams()
    //   .set('page', parameters.page + 1)
    //   .set('pageSize', parameters.pageSize)
    //   .set('search', parameters.search)
    //   .set('order', parameters.order)
    //   .set('direction', parameters.direction);

    // this.queryParams = `?${params.toString()}`;

    return this.http.get<UsersResponse>(this.userUrl, { params: parameters as any });
  }

  /**
   * Get one user from server 
   * 
   * @param id number - user id
   * 
   * @returns Observable<SingleUser> - single user(IUser)
   */
  public getUser(id: number): Observable<SingleUser> {
    return this.http.get<SingleUser>(this.userUrl + `/${id}`);
  }

  /**
   * Update user on server
   * 
   * @param user IUser - user for update
   * @returns Observable<IUser>
   */
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.userUrl + `/${user.id}`, user);
  }

  /**
   * Delete user from server
   * 
   * @param user IUser - user for deletion
   * 
   * @returns Observable<unknown> - response from server
   */
  public deleteUser(user: User): Observable<unknown> {
    return this.http.delete(this.userUrl + `/${user.id}`);
  }

  /**
   * Add new user on server
   * 
   * @param user IUser - new user
   *  
   * @returns Observable<unknown> - response from server
   */
  public addUser(user: User): Observable<unknown> {
    return this.http.post(this.userUrl, user);
  }

  //#endregion
}
