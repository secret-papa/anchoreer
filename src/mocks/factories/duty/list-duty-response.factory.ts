import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

import type { ListDutyResponse } from '../../../apis';
import type { ArrayElement } from '../../../utils';

export const ListDutyResponseFactory = Factory.define<ArrayElement<ListDutyResponse>>(
  'ListDutyResponse'
).attrs({
  id: () => faker.number.int(),
  name: () => faker.word.noun(),
  parent_id: () => null,
});
