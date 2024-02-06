const React = require('react')
const Layout = require('./Layout')

class New extends React.Component {
    render () {
        return (
            <Layout>
                <h1>Create a New Log</h1>
                <form action="/logs">
                    <input type="submit" value="Return to the Logs Index"/>
                </form>
                <form action="/logs" method="post">
                    <h2>Title: </h2><input type="text" name="title"/><br/>
                    <h2>Entry: </h2><input type="text" name="entry"/><br/>
                    <h2>Is the Ship Broken? </h2><input type="checkbox" name="isBroken"/><br/>
                    <input type="submit" value="Submit New Log"/>
                </form>
                <img src="https://pbs.twimg.com/media/EUoXsvnUwAI_9Sg.jpg" alt="cool" srcSet=""/>
            </Layout>
        )
    }
}

module.exports = New;