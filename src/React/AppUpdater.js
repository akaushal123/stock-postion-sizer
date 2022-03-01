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
        open: true,
    }

    componentDidMount() {
        const notification = document.getElementById('notification');
        const message = document.getElementById('message');
        const restartButton = document.getElementById('restart-button');
        ipcRenderer.on('update-available', () => {
            ipcRenderer.removeAllListeners('update-available');
            message.innerText = 'A new update is available. Downloading now...';
            notification.classList.remove('hidden');
          });
          ipcRenderer.on('update-downloaded', () => {
            ipcRenderer.removeAllListeners('update_downloaded');
            message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
            restartButton.classList.remove('hidden');
            notification.classList.remove('hidden');
          });
    }

    handleClose = () =>{
        console.log('ignore');
        this.setState({open: !this.state.open})
    }

    restartApp() {
        console.log('Restart');
        ipcRenderer.send('restart-app');
    }

    render() {
        return (
<div id="notification" class="hidden">
  <p id="message"></p>
  <button id="close-button" onClick="closeNotification()">
    Close
  </button>
  <button id="restart-button" onClick="restartApp()" class="hidden">
    Restart
  </button>
</div>


    //         <div id="notification" className="hidden">
                
    //     <Button variant="outlined" onClick={this.handleClose}>
    //     Open alert dialog
    //   </Button>
    //             <Dialog
    //                 open={this.state.open}
    //                 aria-labelledby="alert-dialog-title"
    //                 aria-describedby="alert-dialog-description"
    //             >
    //                 <DialogTitle id="alert-dialog-title">
    //                     {"Update available"}
    //                 </DialogTitle>
    //                 <DialogContent>
    //                     <DialogContentText id="alert-dialog-description">
    //                         Newer version of app is availble.
    //                     </DialogContentText>
    //                 </DialogContent>
    //                 <DialogActions>
    //                     <Button id="close-button" color={"error"} fullWidth onClick={this.handleClose}>
    //                         Ignore
    //                     </Button>
    //                     <Button id="restart-button" color={"success"} fullWidth onClick={this.restartApp} className="hidden">
    //                         Update
    //                     </Button>
    //                 </DialogActions>
    //             </Dialog>
    //         </div>
        )
    }
}

