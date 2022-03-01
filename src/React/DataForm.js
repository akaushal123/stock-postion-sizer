import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Box, Button, Divider, Grid, InputAdornment, Typography} from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteIcon from '@mui/icons-material/Delete';
const { ipcRenderer } = window.require('electron');

export default class DataForm extends React.Component {
    state = {
        capital: this.getLocalValue('capital'),
        riskPercent: this.getLocalValue('riskPercent'),
        riskPrice: 0,
        entryPrice: '',
        positionSize: 0,
        stopLoss: '',
        version: ''
    }

    componentDidMount() {
        this.calculatePrice();
        this.getVersion();
    }

    getVersion() {
        ipcRenderer.send('app-version');
        ipcRenderer.on('app-version', (event, arg) => {
            ipcRenderer.removeAllListeners('app-version');
            this.setState({ version: arg.version });
        });
    }

    getLocalValue(key) {
        return localStorage.getItem(key);
    }

    setLocalValue(key, value) {
        localStorage.setItem(key, value);
    }

    calculatePositionSize() {
        let stockPoint = Math.abs(parseFloat(this.state.entryPrice) - parseFloat(this.state.stopLoss));
        if (stockPoint === 0) {
            this.setState({positionSize: 0});
            return;
        }
        let positionSize = Math.floor(this.state.riskPrice / stockPoint);
        this.setState({positionSize});
    }

    handleChange = async (e) => {
        let key = e.target.id;
        let value = e.target.value;
        let obj = {};
        obj[key] = value;
        await this.setState(obj, () =>
            this.calculatePrice()
        );
        this.calculatePositionSize();
        if (key.toString().toLowerCase() === 'capital' || key.toString().toLowerCase() === 'riskpercent') {
            this.setLocalValue(key, value);
        }
    }

    calculatePrice() {
        this.setState({
            riskPrice: (parseInt(this.state.capital) * parseFloat(this.state.riskPercent)) / 100
        })
    }

    render() {
        return (
            <Grid container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  style={{width: "280px"}}>
                <Box padding={"10px"}>
                    <Typography variant={"h5"} align={"center"}>Stock Position Sizer</Typography>
                    <Typography variant={"body"} align={"center"}>version {this.state.version}</Typography>
                    <br/>
                </Box>
                <Box inverted alignitems={"center"}>
                    <TextField
                        style={{width: "250px"}}
                        label="Entry Price"
                        id={"entryPrice"}
                        onChange={this.handleChange.bind(this)}
                        size={"small"}
                        type={"number"}
                        value={this.state.entryPrice}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon
                                fontSize={"small"}/></InputAdornment>,
                        }}
                    />
                    <br/>
                    <br/>
                    <TextField
                        style={{width: "250px"}}
                        label="StopLoss"
                        type='icon'
                        id={"stopLoss"}
                        onChange={this.handleChange.bind(this)}
                        size={"small"}
                        value={this.state.stopLoss}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon
                                fontSize={"small"}/></InputAdornment>,
                        }}
                    />
                    <br/>
                    <br/>
                    <TextField
                        style={{width: "250px"}}
                        label='Total Capital'
                        id="capital"
                        value={this.state.capital}
                        size={"small"}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon
                                fontSize={"small"}/></InputAdornment>,
                        }}
                        onChange={this.handleChange.bind(this)}
                    />
                    <br/>
                    <br/>
                    <TextField
                        style={{width: "250px"}}
                        label="Risk"
                        id={"riskPercent"}
                        value={this.state.riskPercent}
                        onChange={this.handleChange.bind(this)}
                        size={"small"}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><ErrorOutlineIcon
                                fontSize={"small"}/></InputAdornment>,
                            endAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                    />
                    <br/>
                    <br/>
                    <Divider/>
                    <Typography align={"left"} noWrap padding={1}>
                        Capital at risk: {this.state.riskPrice || 0}<br/>
                        Position size: {this.state.positionSize || 0}
                    </Typography>
                    <Divider/>
                    <Grid container direction={"row"}  justifyContent={"space-between"}>
                        <Grid item padding={1}>
                            <Button startIcon={<DeleteIcon fontSize={"small"}/>} variant="outlined" size={"small"}
                                    color={"warning"} fullWidth={true}
                                    onClick={() => this.setState({
                                        entryPrice: '', stopLoss: '', positionSize: 0
                                    })}>
                                Entry-SL
                            </Button>
                        </Grid>
                        <Divider orientation={"vertical"} flexItem/>
                        <Grid item padding={1}>
                            <Button startIcon={<DeleteIcon fontSize={"small"}/>} variant="outlined" size={"small"}
                                    color={"error"} fullWidth
                                    onClick={() => this.setState({
                                        capital: '',
                                        riskPercent: '',
                                        riskPrice: 0,
                                        entryPrice: '',
                                        stopLoss: '',
                                        positionSize: 0
                                    })}>
                                Cap & Risk
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        )
    }
}