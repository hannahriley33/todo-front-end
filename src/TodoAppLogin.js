import React, { Component } from 'react'
import request from 'superagent'

export default class TodoAppLogin extends Component {
    state = {
        usernameSignUp: '',
        passwordSignUp: '',
        usernameSignIn: '',
        passwordSignIn: '',
    }

    handleSignIn = async () => {
        const signIn = await request.post(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/auth/signin`, { 
            email: this.state.usernameSignIn,
            password: this.state.usernamePassword,
        })
        localStorage.setItem('user', JSON.stringify(signIn.body))
    }
    handleSignUp = async () => {
        const signUp = await request.post(`http://localhost:${process.env.REACT_APP_BACK_END_PORT}/api/auth/signup`, {
            email: this.state.usernameSignUp,
            password: this.state.passwordSignUp,
        })

        localStorage.setItem('user', JSON.stringify(signUp.body));
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
