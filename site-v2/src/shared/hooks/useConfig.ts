import { useContext } from 'react';
// TODO Так делать нельзя! app верхний модуль в иерархии, найти способ сделать по другому
import { ConfigContext } from '../../app/config';

export const useConfig = () => useContext(ConfigContext);
