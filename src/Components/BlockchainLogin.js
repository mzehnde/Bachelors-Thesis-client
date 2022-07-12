import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { api, handleError } from "../helpers/api";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@mui/material/CircularProgress";

//TODO:
//DEPLOY
//1. Deploy on heroku --> consider: @origin, proxy, db...
//2. generate QR Codes and populate DB
//3. Test it
//4. Populate with real rewards
//5. Test again

//OTHER THINGS
//1. add reward descriptions for Mail!!!
//2. debug db warning
//3. new gmail account with "APP name"
//4. scale for phone

const API_URL =
  "https://eth-rinkeby.alchemyapi.io/v2/wR2HADjlUrTjeB-Rm7EKzWlL_6c6io2-";
const PUBLIC_KEY = "0x6Adc4066eBB891bC7c92397051A46C5301Cc6fd8";
const PRIVATE_KEY =
  "26a988e523d6e5defdd21917b5ef7c2541d698a22f84bc2e98238087a24e6bac";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/NFTRewards.sol/NFTRewards.json");
const contractAddress = "0x6dadaf4b1ade44337ae315c82aa7e6f98758f230";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

class BlockchainLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      loading: false,
    };
  }

  async mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              );
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              );
            }
          }
        );
      })
      .catch((err) => {
        console.log(" Promise failed:", err);
      });
  }

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
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

  async onSubmit() {
    if (this.emailValidation()) {
      this.setState({ loading: true });
      const response = await api.get(
        `/test/metadata/${window.location.pathname.substring(18)}`
      );
      this.mintNFT("https://gateway.pinata.cloud/ipfs/" + response.data.hash)
      const requestBody = JSON.stringify({
        ipfsHash: response.data.hash,
      });
      const response2 = await api.put("/test/metadata/delete", requestBody);
      const requestBody2 = JSON.stringify({
        email: this.state.email,
        id: response.data.id,
      });
      const response3 = await api.post("/test/sendNFTEmail", requestBody2);
      console.log(response3.data);
      window.location.href = "/reward";
    }
  }

  async sendReward() {
    try {
      const requestBody = JSON.stringify({
        emailAddress: this.state.email,
        kindOfReward: window.location.pathname,
      });

      const response = await api.post("/test/sendReward", requestBody);

      console.log(response.data);
      window.location.href = "/reward";
    } catch (error) {
      alert(`Unfortunately there are no more rewards left!`);
    }
  }

  render() {
    const paperStyle = {
      padding: 20,
      height: "37vh",
      width: 230,
      margin: "20px auto",
      position: "center",
      elevation: 25,
    };
    const mailStyle = { position: "center" };
    const buttonStyle = { position: "center" };

    const contentRender = this.state.loading ? (
      <div style={{ marginTop: "10rem" }}>
        <CircularProgress />
      </div>
    ) : (
      <Grid alignItems="center">
        <Paper elevation={10} style={paperStyle} square={false}>
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

export default BlockchainLogin;
