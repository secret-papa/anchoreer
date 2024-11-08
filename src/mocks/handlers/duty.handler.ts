import { http, HttpResponse } from 'msw';

import { BASE_URL } from '../../apis';
import { ListDutyResponseFactory } from '../factories';

export const dutyHandlers = [
  http.get(`${BASE_URL}/api/v1/duties.json`, () => {
    return HttpResponse.json({
      data: ListDutyResponseFactory.buildList(3),
    });
  }),
];
