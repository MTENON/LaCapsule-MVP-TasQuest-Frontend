import "../styles/globals.css";
import Head from "next/head";

// --- Importation redux --- //
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "../reducers/users";

// --- Importation mui/material --- //
import { ThemeProvider } from "@mui/material";

// --- Store configuration --- //
const store = configureStore({
    reducer: { users },
});

function App({ Component, pageProps }) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Head>
                        <title>TasQuest</title>
                        <style>
                            @import
                            url('https://fonts.googleapis.com/css2?family=Fondamento:ital@0;1&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
                        </style>
                    </Head>
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
