import { getRepository, InsertResult, QueryRunner, UpdateResult } from 'typeorm';
import { INotificationTokens } from '../modelInterfaces';
import { NotificationTokens } from '../models/NotificationTokens';

export const saveUserTokenData = async (
  queryParams: Omit<INotificationTokens, 'id' | 'created_at' | 'updated_at'>,
  t?: QueryRunner,
): Promise<InsertResult> => {
  return t ? t.manager.insert(NotificationTokens, queryParams) : getRepository(NotificationTokens).insert(queryParams);
};

export const modifyUserTokenData = async (
  queryParams: Partial<INotificationTokens>,
  updateFields: Partial<INotificationTokens>,
): Promise<UpdateResult> => {
  return getRepository(NotificationTokens)
    .createQueryBuilder()
    .update(NotificationTokens)
    .where('device_info @> :device_info', {
      device_info: queryParams.device_info,
    })
    .andWhere('user_mobile = :user_mobile', { user_mobile: queryParams.user_mobile })
    .set(updateFields)
    .execute();
};

export const getUserTokenData = async (param: { user_mobile: string }, t?: QueryRunner): Promise<INotificationTokens[]> => {
  return t ? t.manager.find(NotificationTokens, { where: param }) : getRepository(NotificationTokens).find({ where: param });
};

export const getUserTokenFromDatabase = async (param: Partial<INotificationTokens>): Promise<INotificationTokens | undefined> => {
  return getRepository(NotificationTokens)
    .createQueryBuilder()
    .where('device_info @> :device_info', {
      device_info: param.device_info,
    })
    .andWhere('user_mobile = :user_mobile', { user_mobile: param.user_mobile })
    .getOne();
};
