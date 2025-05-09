import { FC, PropsWithChildren } from 'react';
import { ConfigContext } from './Config.context';
import { Config } from './Config';

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => (
  <ConfigContext.Provider value={Config}>{children}</ConfigContext.Provider>
);
