import { recruitHandlers } from './recruit.handler';
import { dutyHandlers } from './duty.handler';

export const handlers = [...recruitHandlers, ...dutyHandlers];
