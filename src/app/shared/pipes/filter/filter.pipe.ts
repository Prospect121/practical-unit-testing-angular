import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../../services/user.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(users: IUser[], filter: string): IUser[] {
    if (!users || !filter) {
      return users;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    return users.filter(user => user.name?.toLocaleLowerCase()?.includes(normalizedFilter));
  }
}
