import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser, SingleUser } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-index-users',
  templateUrl: './index-users.component.html',
  styleUrls: ['./index-users.component.scss']
})
export class IndexUsersComponent implements OnInit {
  @Output() sendUserList = new EventEmitter<SingleUser>();
  public filterUsers: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onKeyUp(message: string): void {
    this.filterUsers = message;
  }

}
