import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { FormTestComponent } from './form-test.component';
import { UserService } from 'src/app/shared/services/user.service';
import { FilterModule } from 'src/app/shared/pipes/filter/filter.module';
import { By } from '@angular/platform-browser';

describe('FormTestComponent', () => {
  let component: FormTestComponent;
  let fixture: ComponentFixture<FormTestComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['post', 'get']);
    await TestBed.configureTestingModule({
      declarations: [FormTestComponent],
      imports: [ReactiveFormsModule, FilterModule],
      providers: [{ provide: UserService, useValue: userServiceSpyObj }],
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save user when form is valid', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    component.userForm.setValue(user);
    userServiceSpy.post.and.returnValue(of(user));
    userServiceSpy.get.and.returnValue(of([user]));

    component.onSaveUser();

    expect(userServiceSpy.post).toHaveBeenCalledWith(user);
  });

  it('should not save user when form is invalid', () => {
    component.userForm.setValue({ name: '', email: '' });

    component.onSaveUser();

    expect(userServiceSpy.post).not.toHaveBeenCalled();
  });

  it('should get users when requested', () => {
    const users = [
      { name: 'User 1', email: 'user1@example.com' },
      { name: 'User 2', email: 'user2@example.com' },
    ];
    userServiceSpy.get.and.returnValue(of(users));

    (component as any)?._getUser();

    expect(userServiceSpy.get).toHaveBeenCalled();
    expect(component.users).toEqual(users);
  });

  it('should call onSaveUser() when the button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.form-test__form-button')).nativeElement;

    spyOn(component, 'onSaveUser');

    button.click();

    expect(component.onSaveUser).toHaveBeenCalled();
  });

  it('should call onGetUser() when the button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.form-test__filter-button')).nativeElement;
    const users = [
      { name: 'User 1', email: 'user1@example.com' },
      { name: 'User 2', email: 'user2@example.com' },
    ];
    userServiceSpy.get.and.returnValue(of(users));
    //spyOn(component, 'onGetUser');

    button.click();

    expect(userServiceSpy.get).toHaveBeenCalled();
    expect(component.users).toEqual(users);
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    // Creamos una instancia de Subscription y la agregamos a la lista de suscripciones del componente
    const subscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.subscriptions.push(subscription);

    component.ngOnDestroy();

    expect(subscription.unsubscribe).toHaveBeenCalled();
  });
});
