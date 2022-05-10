import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  public errMessage = '';
  public deleteButtonDisabled = false;
  public showSpinner = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private service: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.showSpinner = true;
    this.deleteButtonDisabled = true;
    this.service.deleteUser(this.data)
      .subscribe(() => {
        this.dialogRef.close(true);
        this.openSnackBar('Deleted', 'Ok');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
