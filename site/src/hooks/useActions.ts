import { useMemo } from 'react';
import { ActionCreator, Action, bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/redux/redux-store';

export function useActions(actionCreators: ActionCreator<Action>) {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actionCreators, dispatch), []);
}