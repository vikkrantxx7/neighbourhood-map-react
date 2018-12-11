import React, { Component } from 'react';
//Component for navigation
class Navbar extends Component {
    render() {
        return (
            <nav id="navbar">
                <h1>Neighbourhood Map</h1>
                <div id="toggle-nav" onClick={() => {this.props.toggleSidebar(this.props.toggleVal)}}>
                    {this.props.toggleVal ? <span role='img' aria-label='open' >&#9776;</span> : <span role='img' aria-label='close' >&#10008;</span>}
                </div>
            </nav>
        )
    }
}

export default Navbar;