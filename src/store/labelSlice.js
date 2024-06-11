import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLabels,
  addLabel,
  deleteLabel as deleteLabelApi,
  updateLabel as updateLabelApi,
} from "../services/api";

export const fetchLabels = createAsyncThunk("labels/fetchLabels", async () => {
  const response = await getLabels();
  return response.data.data;
});

export const createLabel = createAsyncThunk(
  "labels/createLabel",
  async (label) => {
    const response = await addLabel(label);
    return response.data.data;
  }
);

export const deleteLabel = createAsyncThunk(
  "labels/deleteLabel",
  async (id) => {
    await deleteLabelApi(id);
    return id;
  }
);

export const updateLabel = createAsyncThunk(
  "labels/updateLabel",
  async (updatedLabel) => {
    await updateLabelApi(updatedLabel);
    return updatedLabel;
  }
);

const labelSlice = createSlice({
    name: "labels",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLabels.fulfilled, (state, action) => action.payload)
        .addCase(fetchLabels.rejected, (state, action) => {
          console.error('fetchLabels rejected:', action.error);
        })
        .addCase(createLabel.fulfilled, (state, action) => {
          state.push(action.payload);
        })
        .addCase(deleteLabel.fulfilled, (state, action) => {
          return state.filter((label) => label.id !== action.payload);
        })
        .addCase(updateLabel.fulfilled, (state, action) => {
          const index = state.findIndex(
            (label) => label.id === action.payload.id
          );
          if (index !== -1) {
            state[index] = action.payload;
          }
        });
    },
  });


export default labelSlice.reducer;
