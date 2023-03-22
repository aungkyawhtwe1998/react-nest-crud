import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export interface GeneralState {
    showConfirmDialog: boolean;
    confirmTitle: string;
    showSnackBar: boolean;
    snackBarText: string;
}


const initialState: GeneralState = {
    showConfirmDialog: false,
    confirmTitle: 'Do you really want to delete this?',
    showSnackBar: false,
    snackBarText:"",
}


export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers:{
        toggleDialog:(state, action: PayloadAction<{show: boolean; title: string}>)=>{
            state.showConfirmDialog = action.payload.show;
            state.confirmTitle = action.payload.title;
        },

        toggleSnackBar: (state, action: PayloadAction<{show: boolean; msg: string}>)=>{
            state.showSnackBar = action.payload.show;
            state.snackBarText = action.payload.msg;
        },
    },
});

export const {toggleDialog, toggleSnackBar} = generalSlice.actions;

export default generalSlice.reducer;