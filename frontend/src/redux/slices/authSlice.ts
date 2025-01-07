import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";

interface AuthState {
  successMessage: string | null;
  serverError: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  successMessage: null,
  serverError: null,
  loading: false,
};

// Thunk pour l'inscription
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("http://localhost:3333/api/auth/register", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Une erreur est survenue."
      );
    }
  }
);

// Thunk pour le login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("http://localhost:3333/api/auth/login", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Une erreur est survenue lors de la connexion."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessages(state) {
      state.successMessage = null;
      state.serverError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.serverError = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Inscription réussie ! Vous pouvez vous connecter.";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.serverError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Connexion réussie !";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload as string;
      });
  },
});


export const { clearMessages } = authSlice.actions;

export default authSlice.reducer;
