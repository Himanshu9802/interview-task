import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleLoading, handleReject } from "utils/reduxUtils";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  itemsList: [],
};

export const getItemsList = createAsyncThunk("items/get", async (thunkApi) => {
  try {
    const { data: res } = await axios.get(process.env.REACT_APP_API_URL);
    return res;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue({ error: err });
  }
});

export const addItem = createAsyncThunk("item/add", async (params, thunkApi) => {
  try {
    const { data: res } = await axios.post(process.env.REACT_APP_API_URL, params);
    toast.success("Item Added!");
    return res;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue({ error: err });
  }
});

export const markFavourite = createAsyncThunk("item/favourite", async (params, thunkApi) => {
  try {
    const { data: res } = await axios.post(process.env.REACT_APP_API_URL, params);
    return res;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue({ error: err });
  }
});

export const itemsSlice = createSlice({
  name: "items",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    // items list
    builder.addCase(getItemsList.rejected, handleReject);
    builder.addCase(getItemsList.pending, handleLoading);
    builder.addCase(getItemsList.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        itemsList: action.payload,
      };
    });
    // item add
    builder.addCase(addItem.rejected, handleReject);
    builder.addCase(addItem.pending, handleLoading);
    builder.addCase(addItem.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    // mark favourite
    builder.addCase(markFavourite.rejected, handleReject);
    builder.addCase(markFavourite.pending, handleLoading);
    builder.addCase(markFavourite.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        itemsList: action.payload
      };
    });
  },
});
const { reducer } = itemsSlice;

export default reducer;
