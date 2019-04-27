// Higher Order Component - A component (HOC) that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

// Docs: https://reactjs.org/docs/higher-order-components.html

import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This is info: {props.info}</p>
    </div>
)

// const withAdminWarning = (WrappedComponent) => {
//     return (props) => (
//         <div>
//             {props.isAdmin && <p>This is private info. Please don't share!</p>}
//             <WrappedComponent {...props} />
//         </div>
//     )
// }

// const AdminInfo = withAdminWarning(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} info="Some details."/>, document.getElementById('app'))

// This arrow function returns HOC
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                    <p>Pleas login to view info.</p>
                )}
        </div>
    )
}

const AuthInfo = requireAuthentication(Info)

ReactDOM.render(<AuthInfo isAuthenticated={false} info="Some new details." />, document.getElementById('app'))
