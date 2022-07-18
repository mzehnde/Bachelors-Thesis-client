import React from "react";

import SendIcon from "@mui/icons-material/Send";
import { api, handleError } from "../helpers/api";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@mui/material/CircularProgress";

class Onboarding extends React.Component {
    constructor() {
        super();
        this.state = {
            name: null,
            id: null,
            image: null,
            location: null,
            description: null,
            loading: false,
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {}



    onSubmit() {
            this.sendMetadata();
        }


    async sendMetadata() {
        try {
            this.setState({ loading: true });
            const requestBody = JSON.stringify({
                name: this.state.name,
                id: this.state.id,
                image: this.state.image,
                location: this.state.location,
                description: this.state.description,
            });
            //API Call, that uploads the metadata to pinata --> registered --> their reward will be given out
            //const response = await api.post("/test/sendNormalEmail", requestBody);
            window.location.href = "/thankyouonboarding";
        } catch (error) {
            this.setState({ loading: false });
            alert(`Unfortunately there was a problem providing your reward data!`);
        }
    }

    render() {
        const paperStyle = {
            padding: 10,
            height: "63vh",
            width: 300,
            margin: "20px auto",
        };
        const mailStyle = { position: "center" };
        const buttonStyle = { position: "center" };

        const contentRender = this.state.loading ? (
            <div style={{ marginTop: "10rem" }}>
                <CircularProgress />
            </div>
        ) : (
            <Grid alignItems="center">
                <Paper elevation={10} style={paperStyle}>
                    <EmailIcon fontSize="large" style={mailStyle}></EmailIcon>
                    <h2>Provide the data for your reward to join the program!</h2>
                    <TextField
                        label={"Name"}
                        placeholder={"Enter Name here..."}
                        fullWidth
                        required
                        onChange={(e) => {
                            this.handleInputChange("email", e.target.value);
                        }}
                    ></TextField>
                    <TextField
                        label={"Id"}
                        placeholder={"Enter Id here..."}
                        fullWidth
                        required
                        onChange={(e) => {
                            this.handleInputChange("email", e.target.value);
                        }}
                    ></TextField>
                    <TextField
                        label={"Image"}
                        placeholder={"Enter Image here..."}
                        fullWidth
                        required
                        onChange={(e) => {
                            this.handleInputChange("email", e.target.value);
                        }}
                    ></TextField>
                    <TextField
                        label={"Location"}
                        placeholder={"Enter Location here..."}
                        fullWidth
                        required
                        onChange={(e) => {
                            this.handleInputChange("email", e.target.value);
                        }}
                    ></TextField>
                    <TextField
                        label={"Description"}
                        placeholder={"Enter E-Mail here..."}
                        fullWidth
                        required
                        onChange={(e) => {
                            this.handleInputChange("email", e.target.value);
                        }}
                    ></TextField>
                    <span className="text-danger">{this.state.error}</span>
                    <Button
                        onClick={() => this.onSubmit()}
                        style={buttonStyle}
                        type="submit"
                        color="pink"
                        variant="contained"
                        endIcon={<SendIcon />}
                    >
                        Submit to the program
                    </Button>
                </Paper>
            </Grid>
        );

        return <>{contentRender}</>;
    }
}

export default Onboarding;
