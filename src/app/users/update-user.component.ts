import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public updateButtonDisabled = false;
  public errMessage = '';
  public updateForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private service: UserService,
    private snackBar: MatSnackBar
  ) {
    this.updateForm = new FormGroup({
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name, [Validators.required]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSave() {
    this.updateButtonDisabled = true;
    this.service.updateUser(this.updateForm.value as IUser)
      .subscribe(() => {
        this.dialogRef.close(true);
        this.openSnackBar('Updated', 'Ok');
      },
        (error) => {
          this.updateButtonDisabled = false;
          this.openSnackBar('The email has already been taken.', 'Ok');
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
