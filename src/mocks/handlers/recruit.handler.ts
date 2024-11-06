import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../../apis';
import { ListRecruitResponseFactory } from '../factories';

export const recruitHandlers = [
  http.get(`${BASE_URL}/api/v1/recruits.json`, () => {
    return HttpResponse.json({
      data: ListRecruitResponseFactory.buildList(3),
    });
  }),
];
