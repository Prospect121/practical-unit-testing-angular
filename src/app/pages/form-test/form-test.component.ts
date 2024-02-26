import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.scss'],
})
export class FormTestComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  userForm: FormGroup = new FormGroup({});
  users: IUser[] = [];
  filterField: FormControl = new FormControl('');

  constructor(private readonly _userService: UserService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSaveUser(): void {
    if (this.userForm.invalid) return;
    const user = this.userForm.getRawValue();
    this._saveUser(user);
  }

  onGetUser(): void {
    this._getUser();
  }

  private _saveUser(user: IUser): void {
    this._userService.post(user).subscribe(_ => {
      this._getUser();
    });
  }

  private _getUser(): void {
    this._userService.get().subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }
}
