import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import PushPinIcon from '@mui/icons-material/PushPin';
const electron = window.require('electron');
const BrowserWindow = electron.BrowserWindow;

export default class MenuBar extends React.Component {

    handlePin = e => {
        e.preventDefault();
        console.log(BrowserWindow);
        var window = BrowserWindow.getFocusedWindow();
        console.error('pinclicked');
        console.log(window);
        // if (!window.isMaximized()) {
        //     window.maximize();
        // } else {
        //     window.unmaximize();
        // }
    }

    handleMinimize = e => {
        e.preventDefault();
        console.log('minimize');
        // var window = BrowserWindow.getFocusedWindow();
        // window.minimize();
    }

    handleClose = e => {
        e.preventDefault();
        console.log('close');
        // var window = BrowserWindow.getFocusedWindow();
        // window.close();
    }

    render() {
        return (
            <AppBar position="static" style={{height: '24px', width: '100vw'}}>
                <Grid container direction={"row"}>
                    <Grid item xs={9.5}>
                        <Typography style={{ padding: '4px', paddingLeft:'12px', fontSize: '12px'}}>Stock Position Sizer</Typography>
                    </Grid>
                    <Grid item alignItems={"right"} direction={"row"} style={{paddingTop: '4px', paddingRight: '4px'}}>
                        <PushPinIcon id={'win-pin'} style={{fontSize: '16px'}} color={"success"} onClick={this.handlePin}/>
                        <MinimizeIcon id={'win-min'} style={{fontSize: '16px'}} color={"warning"} onClick={this.handleMinimize}/>
                            <CloseIcon id={'win-close'} style={{fontSize: '16px'}} color={"error"} onClick={this.handleClose}/>
                    </Grid>
                </Grid>
            </AppBar>
        );
    }
}
