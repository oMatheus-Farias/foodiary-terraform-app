import { HomeContext, IHomeContextValue } from '.';

interface IHomeProviderProps extends IHomeContextValue {
  children: React.ReactNode;
}

export function HomeProvider({ children, ...ctxValue }: IHomeProviderProps) {
  return <HomeContext.Provider value={ctxValue}>{children}</HomeContext.Provider>;
}
