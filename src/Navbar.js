import React, { Component } from 'react';
//Component for navigation
class Navbar extends Component {
    render() {
        return (
            <nav id="navbar">
                <h1>Neighbourhood Map</h1>
                <div tabindex="0" id="toggle-nav" onClick={() => {this.props.toggleSidebar(this.props.toggleVal)}} onKeyPress={(e) => {this.props.navKeyPress(e, this.props.toggleVal)}}>
                    {this.props.toggleVal ? <span role='img' aria-label='open' title="Tap to open sidebar">&#9776;</span> : <span role='img' aria-label='close' title="Tap to close sidebar">&#10008;</span>}
                </div>
            </nav>
        )
    }
}

export default Navbar;