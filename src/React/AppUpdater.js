import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './AppUpdater.css';
const { ipcRenderer } = window.require('electron');


export default class AppUpdater extends React.Component {

    state = {
        updateDialogOpen: true,
        message: 'Update Downloaded. It will be installed on restart. Restart now?'
    }

    componentDidMount() {
        ipcRenderer.on('update-available', () => {
            ipcRenderer.removeAllListeners('update-available');
            this.setState({ updateDialogOpen: true });
        });
    }

    handleClose = () =>{
        this.setState({updateDialogOpen: !this.state.updateDialogOpen})
    }

    updateApp() {
        console.log('Update App');
        ipcRenderer.on('download-update', () => {
          ipcRenderer.removeAllListeners('download-update');
        });
        this.setState({updateDialogOpen: !this.state.updateDialogOpen});
        ipcRenderer.on('update-downloaded', () => {
          ipcRenderer.removeAllListeners('update-downloaded');
        });
        ipcRenderer.send('restart-app');
    }

    render() {
        return (
            <div id="notification" className="hidden">
                <Dialog
                    open={this.state.updateDialogOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Update available"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Newer version of app is availble.25
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button id="close-button" color={"error"} fullWidth onClick={this.handleClose}>
                            Ignore
                        </Button>
                        <Button id="restart-button" color={"success"} fullWidth onClick={this.updateApp} className="hidden">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

