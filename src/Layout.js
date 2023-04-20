import React from 'react'
import App from './App'
import Notify from './Notify';

const Layout = () => {
    const pathname = window.location.pathname

    return (
        <div>
            {
                pathname === '/notify' ? <Notify /> : <App />
            }
        </div>
    )
}

export default Layout