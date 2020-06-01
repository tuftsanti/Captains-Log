const React = require('react')
const Layout = require('./Layout')
class Edit extends React.Component {
    render () {
        return (
            <Layout>
                <h1>Edit the Log</h1>
                {/* <a href="/logs">Return to the Logs Index</a> */}
                <form action="/logs">
                    <input type="submit" value="Return to the Logs Index"/>
                </form>
                <form action={`/logs/${this.props.logs._id}?_method=PUT`} method="POST">

                    <h2>Title: </h2><input type="text" name="title" defaultValue={this.props.logs.title}/><br/>

                    <h2>Entry: </h2><input type="text" name="entry" defaultValue={this.props.logs.entry}/><br/>

                    <h2>Is the Ship Broken? </h2>{this.props.logs.isBroken} <input type="checkbox" name="isBroken" checked={this.props.logs.isBroken ? 'checked' : ''} /><br/>

                    <input type="submit" value="Submit Changes to Log"/>
                </form>
                <img src="https://pbs.twimg.com/media/EUjPYa9UwAEoQ1d.jpg" alt="ship" srcset=""/>
            </Layout>
        )
    }
}

module.exports = Edit;