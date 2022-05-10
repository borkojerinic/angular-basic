import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from './user';


import { UserService } from './user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  addNewForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  public addButtonDisabled = false;
  public errMessage = '';

  constructor(
    public dialogRef: MatDialogRef<NewUserComponent>,
    private service: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSave() {
    this.addButtonDisabled = true;
    this.service.addUser(this.addNewForm.value as IUser)
      .subscribe((response) => {
        this.dialogRef.close(true);
        this.openSnackBar('Successfully added', 'Ok');
      },
        (error) => {
          this.errMessage = error.error.errors.email[0];
          this.addButtonDisabled = false;
          this.openSnackBar(this.errMessage, 'Ok');
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
