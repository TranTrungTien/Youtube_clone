import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { IChanel } from "../interfaces/chanelinterface";

export const getChanel = createAsyncThunk<IChanel>(
  "getChanel/chanel",
  async () => {
    try {
      const response = await axios.get<IChanel>(
        `${process.env.REACT_APP_BASE_URL_SERVER}/chanels/my-chanel`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

type ChanelState = {
  loading: boolean;
  user: IChanel | null;
  error: SerializedError | null;
};

const initialState: ChanelState = {
  user: null,
  loading: false,
  error: null,
};

const chanelSlice = createSlice({
  name: "chanel",
  initialState: initialState,
  reducers: {
    saveChanel: (state, action: PayloadAction<IChanel>) => {
      state.loading = false;
      state.user = action.payload;
    },
    deleteChanel: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChanel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getChanel.fulfilled,
      (state, action: PayloadAction<IChanel>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(getChanel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { saveChanel, deleteChanel } = chanelSlice.actions;

export default chanelSlice.reducer;
