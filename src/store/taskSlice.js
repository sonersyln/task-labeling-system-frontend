import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTasksByLabelId, addTask, deleteTask, updateTask } from '../services/api';

export const fetchTasksByLabel = createAsyncThunk('tasks/fetchTasksByLabel', async (labelId) => {
  const response = await getAllTasksByLabelId(labelId);
  return response.data.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const response = await addTask(task);
  return response.data.data;
});

export const removeTask = createAsyncThunk('tasks/removeTask', async (id) => {
  await deleteTask(id);
  return id;
});

export const editTask = createAsyncThunk('tasks/editTask', async (updatedTask) => {
  await updateTask(updatedTask);
  return updatedTask;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByLabel.fulfilled, (state, action) => action.payload)
      .addCase(fetchTasksByLabel.rejected, (state, action) => {
        console.error('fetchTasksByLabel rejected:', action.error);
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        return state.filter((task) => task.id !== action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
