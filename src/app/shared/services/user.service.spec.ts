import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, IUser } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  //: Se ejecuta después de cada prueba para verificar que no haya solicitudes HTTP pendientes sin manipular.
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a new user', () => {
    const newUser: IUser = { name: 'John Doe', email: 'john@example.com' };
    const dummyResponse = { id: '1', name: 'John Doe', email: 'john@example.com' };

    service.post(newUser).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(service.url);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should send a GET request to retrieve users', () => {
    const dummyUsers: IUser[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];

    service.get().subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(service.url);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });
});
