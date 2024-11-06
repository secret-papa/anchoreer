import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

import type { ListRecruitResponse } from '../../../apis';
import type { ArrayElement } from '../../../utils';

export const ListRecruitResponseFactory = Factory.define<ArrayElement<ListRecruitResponse>>(
  'ListRecruitResponse'
).attrs({
  id: () => faker.number.int(),
  company_name: () => faker.company.name(),
  title: () => faker.lorem.word(),
  start_time: '2024-11-6',
  end_time: '2024-11-6',
  image_url: () => faker.image.url(),
  duty_ids: () => [],
});
