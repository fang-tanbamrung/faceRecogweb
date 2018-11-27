import React from 'react';


class Signin extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            signinEmail:'',
            signinPassword:''
        }
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
    }

    onEmailChange = (event) =>{
        this.setState({signinEmail:event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signinPassword:event.target.value})
    }

    onSubmitSignin = () => {
        fetch('https://limitless-forest-85460.herokuapp.com/signin',{
            method:'post',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                email:this.state.signinEmail,
                password:this.state.signinPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                if(data.id){
                    this.props.loadUser(data)
                    this.props.onRouteChange('home')

                }
            })
    }

    render(){
        return(
            <article className = 'br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w25-l mw6 center'>
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" 
                        className="ba b--transparent ph0 mh0"
                        >
                        <legend className="f1 fw6 ph0 mh0"
                        >Sign In
                        </legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" 
                            htmlFor="email-address">Email</label>
                            <input onChange = {this.onEmailChange} 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange = {this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                            <input onClick = {this.onSubmitSignin}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <a href="#0" className="f6 link dim black db" onClick = {() => this.props.onRouteChange('register')}>Register</a>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;