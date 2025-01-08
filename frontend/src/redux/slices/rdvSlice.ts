import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";

interface Coach {
    id: number;
    email: string;
    name: string;
    firstname: string;
}

interface Client {
    id: number;
    email: string;
    name: string;
    firstname: string;
}

interface Rdv {
    id: number;
    date: string;
    coach: Coach;
    client: Client;
}

interface RdvState {
    successMessage: string | null;
    serverError: string | null;
    loading: boolean;
    rdvs: Rdv[];
}

const initialState: RdvState = {
    successMessage: null,
    serverError: null,
    loading: false,
    rdvs: [],
};

// Create RDV
export const createRdv = createAsyncThunk(
    "rdv/create",
    async (data: { coachId: number; clientId: number; date: string }, { rejectWithValue }) => {
        try {
            const requestData = {
                ...data,
                date: new Date(data.date), // Convert to a valid Date object
            };

            const response = await axiosInstance.post("http://localhost:3333/api/rdvs", requestData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || "Une erreur est survenue lors de la création du rendez-vous."
            );
        }
    }
);


// Fetch All RDVs
export const fetchRdvs = createAsyncThunk(
    "rdv/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("http://localhost:3333/api/rdvs");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || "Une erreur est survenue lors de la récupération des rendez-vous."
            );
        }
    }
);

const rdvSlice = createSlice({
    name: "rdv",
    initialState,
    reducers: {
        clearMessages(state) {
            state.successMessage = null;
            state.serverError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch RDVs
            .addCase(fetchRdvs.pending, (state) => {
                state.loading = true;
                state.serverError = null;
            })
            .addCase(fetchRdvs.fulfilled, (state, action) => {
                state.loading = false;
                state.rdvs = action.payload;
            })
            .addCase(fetchRdvs.rejected, (state, action) => {
                state.loading = false;
                state.serverError = action.payload as string;
            })
            // Create RDV
            .addCase(createRdv.pending, (state) => {
                state.loading = true;
                state.serverError = null;
                state.successMessage = null;
            })
            .addCase(createRdv.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = "Rendez-vous créé avec succès !";
                state.rdvs.push(action.payload); // Add the new RDV to the list
            })
            .addCase(createRdv.rejected, (state, action) => {
                state.loading = false;
                state.serverError = action.payload as string;
            });
    },
});

export const { clearMessages } = rdvSlice.actions;

export default rdvSlice.reducer;
