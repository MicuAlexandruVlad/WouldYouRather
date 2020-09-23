import React, { Component } from 'react'
import "./SideNav.scss"
import logo from "../../assets/logo.png"
import newQuestionIcon from '../../assets/new_question.png'
import signOutIcon from '../../assets/logout.png'
import leaderboardIcon from '../../assets/leaderboard.png'
import homeIcon from '../../assets/home.png'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NavLink } from 'react-router-dom'

export default class SideNav extends Component {

    state = {
        dialogOpen: false
    }

    handleDialogClose() {
        this.setState({
            dialogOpen: false
        })
    }

    onSignOut() {
        this.setState({
            dialogOpen: true
        })
    }

    handleClose(option) {
        if (option === 1) {
            this.props.onSignOut()
            this.handleDialogClose()
        } else {
            this.handleDialogClose()
        }
    }

    render() {
        return (
            <div className="side-nav-body flex-col">
                
               
                <div className="icon-bg">
                    <img src={ logo } alt="logo" className="nav-icon"/>
                </div>
                <div className="mid">
                    <NavLink 
                        className="icon-bg icon-hover flex-col"
                        activeClassName="active"
                        to="/home">
                        <div className="link-holder flex-col">
                            <img src={ homeIcon } alt="home" className="nav-icon"/>
                            <span className="icon-text">Home</span>
                        </div>
                    </NavLink>
                    <NavLink 
                        className="icon-bg icon-hover flex-col"
                        activeClassName="active"
                        to="/add">
                        <div className="link-holder flex-col">
                            <img src={ newQuestionIcon } alt="newQuestion" className="nav-icon"/>
                            <span className="icon-text">New Question</span>
                        </div>
                    </NavLink>
                    <NavLink 
                        className="icon-bg icon-hover flex-col"
                        activeClassName="active"
                        to="/leaderboard">
                        <div className="link-holder flex-col">
                            <img src={ leaderboardIcon } alt="leaderboard" className="nav-icon"/>
                            <span className="icon-text">Leaderboard</span>
                        </div>
                    </NavLink>
                    
                </div>
                <div onClick={ () => this.onSignOut() } className="flex-col icon-bg logout">
                    <img src={ signOutIcon } alt="newQuestion" className="nav-icon"/>
                    <span className="icon-text">Sign Out</span>
                </div>
                <Dialog
                    open={ this.state.dialogOpen }
                    onClose={ () => this.handleClose(0) }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    
                    <DialogTitle id="alert-dialog-title">{"Sign Out"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You are going to be disconnected from this account. Are you sure you want to continue ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => this.handleClose(0) } color="primary">
                          No
                        </Button>
                        <Button onClick={ () => this.handleClose(1) } color="primary">
                          Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
