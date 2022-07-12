import React from "react";

import SendIcon from "@mui/icons-material/Send";
import { api, handleError } from "../helpers/api";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@mui/material/CircularProgress";

class NormalLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      loading: false,
    };
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  componentDidMount() {}

  emailValidation() {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!this.state.email || regex.test(this.state.email) === false) {
      this.setState({
        error: "Email is not valid",
      });
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.emailValidation()) {
      this.sendReward();
    }
  }

  async sendReward() {
    try {
      this.setState({ loading: true });
      const requestBody = JSON.stringify({
        emailAddress: this.state.email,
      });

      const response = await api.post("/test/sendNormalEmail", requestBody);

      console.log(response.data);
      window.location.href = "/reward";
    } catch (error) {
      this.setState({ loading: false });
      alert(`Unfortunately there are no more rewards left!`);
    }
  }

  render() {
    const paperStyle = {
      padding: 10,
      height: "35vh",
      width: 230,
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
          <h2>Register to receive a Reward</h2>
          <TextField
            label={"E-mail"}
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
            Claim Reward
          </Button>
        </Paper>
      </Grid>
    );

    return <>{contentRender}</>;
  }
}

export default NormalLogin;
