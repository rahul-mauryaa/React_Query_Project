import { configureStore } from "@reduxjs/toolkit";

// import counterReducer from "../features/counterSlice";
import { dataSlice } from "../features/data-slice";
export const store = configureStore({
    reducer:{
        // counter:counterReducer,  
    [dataSlice.reducerPath]: dataSlice.reducer,
    

    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(dataSlice.middleware);
      },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
