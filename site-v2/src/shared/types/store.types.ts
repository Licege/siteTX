import { store } from '../../app/store/store';

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;
