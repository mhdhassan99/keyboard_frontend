import React from 'react'

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }
    
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }

    render() {
        return (
            <div className="container">
                <form className="add-toy-form" onSubmit={this.submitHandler} >
                    <h3>LogIn</h3>
                    <input type="text" name="username" onChange={this.changeHandler} value={this.state.username} placeholder="Username" className="input-text" />
                    <br />
                    <input type="password" name="password" onChange={this.changeHandler} value={this.state.password} placeholder="Password" className="input-text" />
                    <br />
                    <input type="submit" name="submit" value="Login" className="submit" />
                </form>
            </div>
        )
    }
}

export default Login