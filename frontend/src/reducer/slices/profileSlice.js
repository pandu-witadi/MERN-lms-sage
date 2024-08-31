import {createSlice} from "@reduxjs/toolkit"

const SLICE_KEY = "profile"

export function getData() {
    return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
    localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

const data = getData();
const initialState = data ? {
    loading: false,
    user: data.user,
} : {loading: false, user: null}
const profileSlice = createSlice({
    name: SLICE_KEY,
    initialState: initialState,
    reducers: {
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setUser(state, value) {
            state.user = value.payload;
            setData(state);
        },
    },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
