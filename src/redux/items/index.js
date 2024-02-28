import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleLoading, handleReject } from "utils/reduxUtils";

const initialState = {
  loading: false,
  itemsList: [],
};

export const getItemsList = createAsyncThunk("items/get", async (thunkApi) => {
  try {
    await axios
      .get("https://api.npoint.io/fa9c5548c98624de80af")
      .then((response) => {
        console.log(response, "responses");
        return response.data;
      });
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
        itemsList: action?.payload,
      };
    });
  },
});
const { reducer } = itemsSlice;

export default reducer;
