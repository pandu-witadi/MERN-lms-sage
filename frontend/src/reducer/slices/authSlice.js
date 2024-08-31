import { createSlice } from "@reduxjs/toolkit"

const SLICE_KEY = "auth"
export function getData() {
    return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
    localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

const data = getData();
const initialState = data ? {
    loading: false,
    token: data.token,
} : {loading: false, token: ""}

const authSlice = createSlice({
    name: SLICE_KEY,
    initialState: initialState,
    reducers: {
        setLoading(state, value) {
            state.loading = value.payload
        },
        setToken(state, value) {
            state.token = value.payload;
            setData(state);
        },
    },
})

export const { setLoading, setToken } = authSlice.actions

export default authSlice.reducer
