import React from 'react';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { api, handleError } from '../helpers/api';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PaidIcon from '@mui/icons-material/Paid';
import red from "@material-ui/core/colors/red";


class RedeemNormal extends React.Component{
    constructor() {
        super();
        this.state = {
            sales:null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async componentDidMount() {
        const path = window.location.pathname
        const NFTId = path.substring(11)

        const requestBody = JSON.stringify({
            id : NFTId})

        const response = await api.put('test/isNormalRedeemed', requestBody)
        if(response.data===true){
            window.location.href="/notvalid"
        }
        console.log(response)
    }

    async onSubmit(){
        try{
            const requestBody = JSON.stringify({
                sales:this.state.sales,
                id:window.location.pathname.substring(14)
            });

            const response = await api.put('/test/redeemNormal', requestBody);

            console.log(response);
            window.location.href="/thankyou"

        } catch (error){
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }

    }

    render(){
        const paperStyle = {padding: 10, height:'60vh', width:230, margin: '20px auto' }
        const mailStyle = {position: "center"}
        const buttonStyle = {position:"center"}
        const H4 = styled.h4({
            background:red
        });

        return (
            <Grid alignItems="center">
                <Paper elevation={10} style={paperStyle}>
                    <PaidIcon fontSize="large" style={mailStyle}>
                    </PaidIcon>
                    <h2>
                        Please fill out this form
                    </h2>
                    <H4>
                        Did the customer spend any money additionally to his reward?
                    </H4>

                    <TextField label={"Money spent"}
                               placeholder={"Enter amount spent here..."}
                               fullWidth required
                               onChange={e => {
                                   this.handleInputChange('sales', e.target.value)}}
                    >
                    </TextField>
                    <Button
                        onClick={
                            ()=>this.onSubmit()}
                        disabled={!this.state.sales}
                        style={buttonStyle}
                        type = 'submit' color = 'pink' variant = 'contained' endIcon={<SendIcon />}>
                        Claim Reward
                    </Button>
                </Paper>
            </Grid>
        );
    }
}

export default RedeemNormal