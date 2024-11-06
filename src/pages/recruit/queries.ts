import { useQuery } from '@tanstack/react-query';
import { listRecruit } from '../../apis';

export const useListRecruitQuery = () => {
  return useQuery({
    queryKey: ['recruit', 'list'],
    queryFn: listRecruit,
  });
};
