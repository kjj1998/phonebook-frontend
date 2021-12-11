import React from 'react'

const NotificationMessage = ({message, type}) => {
    if (message == null) {
        return null
    }

    if (type === 'notification') {
        return (
            <div className="notification">
                {message}
            </div>
        )
    }
    else if (type === 'error') {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
    else {
        return null
    }
}

export default NotificationMessage