const React = require('react')
const Layout = require('./Layout')

class Index extends React.Component {
    render() {
        return (
            <Layout>
                <div className="indexContainer">
                    {this.props.username ? 
                    <form action="/sessions/?_method=delete" method="post">
                        <input type="submit" value="Click To Logout"/>
                    </form> : ''}
                    <h1>The Captain's Log</h1>
                        {/* <a href="/logs/new">Create a New Log</a> */}
                    <form action="/logs/new">
                        <input type="submit" value="Add a New Log"/>
                    </form>
                <ul className="indexUlContainer">
                    {
                    this.props.logs.map((logs, index) => {
                        return (
                            <li>
                            <h4><a href={`/logs/${logs._id}`}>{ logs.title }</a><br/></h4>

                            {/* <a href={`/logs/${logs._id}/edit`}>Edit This Log</a> */}

                            <form action={`/logs/${logs._id}?_method=DELETE`} method="POST">
                                <input type="submit" value="Delete this Log"/>
                            </form>

                            {/* <p>{ log.entry }</p>
                            { fruit.readyToEat ? ` It is ready to eat` : ` It is not ready to eat` } */}
                            </li>
                            )
                        })
                    }
                </ul>
                <img src="https://i0.wp.com/www.tor.com/wp-content/uploads/2019/04/star-trek-discovery-enterprise-bridge-full.jpg?type=vertical&ssl=1" alt="bridge"/>
            </div>
            </Layout>
        )
    }
}

module.exports = Index;