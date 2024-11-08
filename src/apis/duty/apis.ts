import { BASE_URL } from '../constants';
import type { ListDutyResponse } from './types';

export const listDuty = async (): Promise<ListDutyResponse> => {
  const response = await fetch(`${BASE_URL}/api/v1/duties.json`);
  const data = await response.json();

  return data;
};
