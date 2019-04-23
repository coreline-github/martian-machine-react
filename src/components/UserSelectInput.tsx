import React, { useState } from 'react';
import { useEffectAsync } from '../utils/use-effect-async';
import { getUsers } from '../api/api-client';
import { IUser } from '../api/api-types';
import { numberToSelectValue, selectEventToValue } from '../utils/select-value';

import axios from 'axios';
jest.mock('axios');

export interface IProps {
  value?: number;
  onChange(value: number | undefined): void;
}

export const UserSelectInput = (props: IProps) => {
  const { onChange, value } = props;
  const [users, setUsers] = useState<IUser[]>([]);

  useEffectAsync(async () => {
    setUsers(await getUsers());
  }, []);

  return (
    <select className="custom-select" onChange={e => onChange(selectEventToValue(e))} value={numberToSelectValue(value)}>
      <option value={numberToSelectValue(undefined)}>Everyone</option>
      {users.map(user => (
        <option key={user.id} value={numberToSelectValue(user.id)}>{user.name}</option>
      ))}
    </select>
  );
}
