import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Box, Divider, Grid, InputAdornment, Typography} from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default class DataForm extends React.Component {
    state = {
        capital: this.getLocalValue('capital'),
        riskPercent: this.getLocalValue('riskPercent'),
        riskPrice: 0,
        entryPrice: 0,
        positionSize: 0,
        stopLoss: 0
    }

    componentDidMount() {
        this.calculatePrice();
    }

    getLocalValue(key) {
        return localStorage.getItem(key);
    }

    setLocalValue(key, value) {
        localStorage.setItem(key, value);
    }

    calculatePositionSize() {
        let stockPoint = Math.abs(parseInt(this.state.entryPrice) - parseInt(this.state.stopLoss));
        if (parseInt(stockPoint) === 0){
            this.setState({positionSize: 0});
            return;
        }
        let positionSize = Math.floor(this.state.riskPrice/stockPoint);
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
            riskPrice: (this.state.capital * this.state.riskPercent) / 100
        })
    }

    render() {
        return (
            <Grid container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  style={{width: "350px"}}>
                <Box padding={"10px"}>
                    <Typography variant={"h5"} align={"center"}>Stock Position Sizer</Typography>
                    <br/>
                </Box>
                <Box inverted alignitems={"center"}>
                    <TextField
                        style={{width: "250px"}}
                        label="Entry Price"
                        id={"entryPrice"}
                        onChange={this.handleChange.bind(this)}
                        size={"small"}
                        defaultValue={this.state.entryPrice}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon fontSize={"small"}/></InputAdornment>,
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
                        defaultValue={this.state.stopLoss}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon fontSize={"small"}/></InputAdornment>,
                        }}
                    />
                    <br/>
                    <br/>
                    <TextField
                        style={{width: "250px"}}
                        label='Total Capital'
                        id="capital"
                        defaultValue={this.state.capital}
                        size={"small"}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon fontSize={"small"}/></InputAdornment>,
                        }}
                        onChange={this.handleChange.bind(this)}
                    />
                    <br/>
                    <br/>
                    <TextField
                        style={{width: "250px"}}
                        label="Risk"
                        id={"riskPercent"}
                        defaultValue={this.state.riskPercent}
                        onChange={this.handleChange.bind(this)}
                        size={"small"}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><ErrorOutlineIcon fontSize={"small"}/></InputAdornment>,
                            endAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                    />
                    <br/>
                    <br/>
                    <Divider/>
                    <br/>
                    <Typography>
                        {`Capital at risk: ${this.state.riskPrice}`}
                    </Typography >
                    <Typography>
                        {`Position size: ${this.state.positionSize}`}
                    </Typography >
                </Box>
            </Grid>
        )
    }
}