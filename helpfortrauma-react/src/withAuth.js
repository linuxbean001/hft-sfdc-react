import React, { Component } from 'react';
import AuthService from './services/AuthService';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();
    return class AuthWrapped extends React.Component{
        constructor(){
            super();
            this.state={
                
            };
        }
    }
   
}

