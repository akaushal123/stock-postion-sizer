import React from 'react';
import DataForm from './DataForm';
import {createTheme, CssBaseline, Divider, Grid, ThemeProvider, Typography, useMediaQuery} from "@mui/material";
import MenuBar from "./MenuBar";
import AppUpdater from "./AppUpdater";

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                }
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <MenuBar />
                <AppUpdater />
                <Grid align="center" style={{width: "280px"}}>
                    <DataForm/>
                    <Divider/>
                    <Typography padding={"auto"} variant={"body2"} align={"center"}>Made with <span role={"img"}
                                                                                                    aria-label={"heart"}>&#10084;&#65039;</span> by <a
                        href={"https://www.linkedin.com/in/abhishek-kaushal-nitj/"} target={"_blank"}
                        rel={"noreferrer"}>Kaushal,
                        Abhishek</a></Typography>
                </Grid>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
