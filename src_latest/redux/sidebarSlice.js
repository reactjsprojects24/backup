import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCollapsed: false, // Tracks sidebar collapse state
    selectedItem: "Home", // Default selected page
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isCollapsed = !state.isCollapsed;
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        },
    },
});

export const { toggleSidebar, setSelectedItem  } = sidebarSlice.actions;
export default sidebarSlice.reducer;
