import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import PushPinIcon from '@mui/icons-material/PushPin';
import logo from './favicon.ico';
import {createSvgIcon, Icon} from "@mui/material";

const BrowserWindow = window.require('@electron/remote').BrowserWindow;

const UnpinIcon = createSvgIcon(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 172" style={{fill: '#000000'}}>
    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter"
       strokeMiterlimit={10} strokeDasharray={""} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none"
       textAnchor="none" style={{mixBlendMode: 'normal'}}>
        <path d="M0,172v-172h172v172z" fill="none"/>
        <g fill="#4caf50">
            <path
                d="M26.56706,16.43294l-10.13411,10.13411l43.57389,43.57389l-8.52441,7.04069l-10.58203,-10.58203l-10.13411,10.13411l27.23893,27.23893l-36.50521,36.49121v10.03614h10.03613l36.49121,-36.50521l27.23893,27.23893l10.13411,-10.13411l-9.95215,-9.95215l6.94271,-8.6224l43.042,43.04199l10.13411,-10.13411l-44.13379,-44.13379l0.06999,-0.08399l-40.2985,-40.28451l-0.06999,0.06999zM105.40039,16.43294l-10.13411,10.13411l7.97851,7.97852l-20.92611,17.23079l38.22689,38.22689l17.02083,-21.13607l7.86654,7.86653l10.13411,-10.13411z"/>
        </g>
    </g>
    </svg>,
    'UnpinIcon'
)

export default class MenuBar extends React.Component {

    state = {
        onTop: true
    }

    handlePin = e => {
        e.preventDefault();
        let window = BrowserWindow.getFocusedWindow();
        window.setAlwaysOnTop(!window.isAlwaysOnTop());
        this.setState({onTop: window.isAlwaysOnTop()});
    }

    handleMinimize = e => {
        e.preventDefault();
        let window = BrowserWindow.getFocusedWindow();
        window.minimize();
    }

    handleClose = e => {
        e.preventDefault();
        let window = BrowserWindow.getFocusedWindow();
        window.close();
    }

    render() {
        return (
            <AppBar position="static" style={{height: '28px', width: '100vw'}}>
                <Grid container direction={"row"}>
                    <Grid item xs={9.6} className={"titleBar"}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item style={{paddingBottom: '6px'}}>
                                <Icon>{<img src={logo} alt={"logo"} style={{height: '18px'}}/>}</Icon>
                            </Grid>
                            <Grid item style={{paddingBottom: '4px'}}>
                                <Typography style={{fontSize: '12px', paddingBottom: '4px'}}>
                                    Stock Position Sizer
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item justifyItems={"flex-end"} style={{paddingTop: '6px', marginRight: '0px'}}>
                        <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                            <Grid item>
                                <Tooltip title={!this.state.onTop ? "Pin" :"Unpin"}>
                                    {!this.state.onTop ? (
                                        <PushPinIcon id={'win-pin'} style={{fontSize: '16px'}} color={"success"}
                                                     onClick={this.handlePin}/>
                                    ) : (
                                        <UnpinIcon id={'win-pin'} style={{fontSize: '16px'}} color={"success"}
                                                     onClick={this.handlePin}/>
                                    )}
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title={"Minimize"}>
                                    <MinimizeIcon id={'win-min'} style={{fontSize: '16px'}} color={"warning"}
                                                  onClick={this.handleMinimize}/>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title={"Close"}>
                                    <CloseIcon id={'win-close'} style={{fontSize: '16px'}} color={"error"}
                                               onClick={this.handleClose} tooltip={"Close"}/>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AppBar>
        );
    }
}
