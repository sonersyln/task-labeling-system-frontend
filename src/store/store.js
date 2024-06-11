import { configureStore } from '@reduxjs/toolkit';
import labelReducer from './labelSlice';
import taskReducer from './taskSlice';

export const store = configureStore({
  reducer: {
    labels: labelReducer,
    tasks: taskReducer,
  },
});

export default store;
