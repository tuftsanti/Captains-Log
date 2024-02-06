const React = require('react')
const Layout = require('./Layout')

class Show extends React.Component {
    render() {
        return (
            <Layout>
                {this.props.username ? 
                <form action="/sessions/?_method=delete" method="post">
                    <input type="submit" value="Click To Logout"/>
                </form> : ''}
                <h1>{this.props.logs.title}</h1>
                <div className="showContainer">
                    <form action="/logs/">
                        <input type="submit" value="Back to the Captain's Log Index"/>
                    </form><br/>
                    <p>Entry: {this.props.logs.entry}</p><br/>
                    <p>Is the Ship Broken? {this.props.logs.isBroken ? `YES` : `NO`}</p><br/>
                    <p>Created: {Date(this.props.logs.createdAt)}</p><br/>
                    <a href={`/logs/${this.props.logs._id}/edit`}>Edit This Log</a>
                    <form className="deleteForm" action={`/logs/${this.props.logs._id}?_method=DELETE`} method="POST">
                        <input type="submit" value="Delete this Log"/>
                    </form>
                    <img src="https://www.itl.cat/pngfile/big/209-2091772_space-star-trek-discovery.jpg" alt="space"/>
                </div>
            </Layout>
        )
    }
}
module.exports = Show