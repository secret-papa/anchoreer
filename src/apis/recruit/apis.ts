import { BASE_URL } from '../constants';
import type { ListRecruitResponse } from './types';

export const listRecruit = async (): Promise<ListRecruitResponse> => {
  const response = await fetch(`${BASE_URL}/api/v1/recruits.json`);
  const data = await response.json();

  return data;
};
