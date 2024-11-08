import { useQuery } from '@tanstack/react-query';
import { listDuty, listRecruit } from '../../apis';

export const useListRecruitQuery = () => {
  return useQuery({
    queryKey: ['recruit', 'list'],
    queryFn: listRecruit,
  });
};

export const useListDutyQuery = () => {
  return useQuery({
    queryKey: ['duty', 'list'],
    queryFn: listDuty,
  });
};
