import React from 'react'
import Login from '../components/Login'

class UserContainer extends React.Component {
    submitHandler = (obj) => {
        console.log(obj)
    }

    render() {
        return (
            <Login submitHandler={this.submitHandler}/>
        )
    }
}

export default UserContainer