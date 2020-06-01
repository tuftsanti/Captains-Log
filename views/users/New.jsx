const React = require('react')

class NewUser extends React.Component {
    render() {
        return (
            <div>
                <h1>New User</h1>
                <form action="/user/" method="post">
                    username: <input type="text" name="username"/><br/>
                    password: <input type="password" name="password"/><br/>
                    <input type="submit" value="Create User"/>
                </form>
            </div>
        )
    }
}
module.exports = NewUser;