import { IUser } from '../../services/user.service';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('filters the list of users based on the provided filter string', () => {
    const users: IUser[] = [
      { id: '1', name: 'John', email: 'John@gmail.com' },
      { id: '2', name: 'Jane', email: 'Jane@gmail.com' },
      { id: '3', name: 'Doe', email: 'Doe@gmail.com' },
    ];
    const filter = 'j';
    const filteredUsers = pipe.transform(users, filter);
    expect(filteredUsers).toEqual([
      { id: '1', name: 'John', email: 'John@gmail.com' },
      { id: '2', name: 'Jane', email: 'Jane@gmail.com' },
    ]);
  });

  it('returns the original list if either users or filter is void', () => {
    const users: IUser[] = [
      { id: '1', name: 'John', email: 'Doe@gmail.com' },
      { id: '2', name: 'Jane', email: 'Doe@gmail.com' },
    ];
    const filter = 'j';
    let filteredUsers = pipe.transform([], filter);
    expect(filteredUsers).toEqual([]);

    filteredUsers = pipe.transform(users, '');
    expect(filteredUsers).toEqual(users);

    filteredUsers = pipe.transform([], '');
    expect(filteredUsers).toEqual([]);
  });
});
