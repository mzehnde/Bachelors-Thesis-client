import React, {Component} from 'react';
import './App.css';
import BlockchainLogin from './Components/BlockchainLogin'
import Redeem from '../src/Components/Redeem'
import InvalidReward from '../src/Components/InvalidReward'
import ThankYou from '../src/Components/ThankYou'
import RedeemNormal from '../src/Components/RedeemNormal'
import {
    BrowserRouter as Router,
        Routes,
        Route,
        Link
} from 'react-router-dom';
import NormalLogin from "./Components/NormalLogin";
import logo from '../src/helpers/logo.svg';
import Reward from "./Components/Reward";

//TO DO
//add adressname and address link field --> to make adress that links to google maps
//deploy
//test it with rewards and qr codes
//populate with real rewards and test
//then DONE

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <img
                        src={logo} className="app-logo" alt="logo" />
                    {/*<h1>
                        logo
                    </h1>*/}
                    <ul>
                    </ul>
                    <Routes>
                        <Route exact path='/' element={< BlockchainLogin />}></Route>
                        <Route exact path='/blockchainReward/partnerAlfred' element={<BlockchainLogin/>}></Route>
                        <Route exact path='/blockchainReward/partnerHonig' element={<BlockchainLogin/>}></Route>
                        <Route exact path='/blockchainReward/partner3' element={<BlockchainLogin/>}></Route>
                        <Route exact path='/normalReward' element={< NormalLogin />}></Route>
                        <Route exact path='/redeemNFT/1' element={< Redeem />}></Route>
                        <Route exact path='/redeemNFT/2' element={< Redeem />}></Route>
                        <Route exact path='/redeemNormal/11' element={< RedeemNormal />}></Route>
                        <Route exact path='/redeemNormal/12' element={< RedeemNormal />}></Route>
                        <Route exact path='/notvalid' element={< InvalidReward />}></Route>
                        <Route exact path='/thankyou' element={< ThankYou />}></Route>
                        <Route exact path='/reward' element={< Reward />}></Route>
                    </Routes>
                </div>
            </Router>
        );
    }
}
export default App;