import "../styles/globals.css";
import Head from "next/head";

// --- Importation redux --- //
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../reducers/users";
import inventory from "../reducers/inventory";

// --- Importation persistance redux --- //
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

// --- Importation mui/material --- //
import { ThemeProvider } from "@mui/material";
import theme from "../theme/index";

// --- Store configuration --- //

const reducers = combineReducers({ user, inventory });

const persistConfig = {
  key: "tasquest",
  blacklist: ['inventory'],
  storage
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Head>
              <link rel="icon" href="/logoBlack.png"></link>
              <title>TasQuest</title>
              <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Fondamento:ital@0;1&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
              </style>
            </Head>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
