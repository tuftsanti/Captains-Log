const React = require('react')

const Layout = (props) => {
    return (
        <>  
            <head>
                <link rel="stylesheet" href="/css/style.css"/>
            </head>
            <body>
                {props.children}
            </body>
        </>
    )
}

module.exports = Layout;