import { AccountsService } from '@app/services/AccountsService';
import { useQuery } from '@tanstack/react-query';

interface IUseAccountParams {
  enable?: boolean;
}

export function useAccount(params?: IUseAccountParams) {
  const { data, refetch } = useQuery({
    queryKey: ['account'],
    queryFn: () => AccountsService.getMe(),
    staleTime: Infinity,
    enabled: params?.enable ?? true,
  });

  return {
    account: data,
    loadAccount: refetch,
  };
}
