import { getRepository, QueryRunner } from 'typeorm';
import { IUser } from '../modelInterfaces';
import { User } from '../models/User';

export const findUser = (queryParam: Partial<IUser>, selectOptions: Array<keyof User>, t?: QueryRunner): Promise<IUser | undefined> => {
  return t
    ? t.manager.findOne(User, {
        where: queryParam,
        select: selectOptions.concat(['id']),
      })
    : getRepository(User).findOne({
        where: queryParam,
        select: selectOptions.concat(['id']),
      });
};
