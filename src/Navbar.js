import React, { Component } from 'react';
//Component for navigation
class Navbar extends Component {
    render() {
        return (
            <nav id="navbar">
                <h1>Neighbourhood Map</h1>
                <div tabIndex="0" role='button' id="toggle-nav" onClick={() => {this.props.toggleSidebar(this.props.toggleVal)}} onKeyPress={(e) => {this.props.navKeyPress(e, this.props.toggleVal)}}>
                    {this.props.toggleVal ? <span role='button' aria-label='open' title="Tap to open sidebar">&#9776;</span> : <span role='button' aria-label='close' title="Tap to close sidebar">&#10008;</span>}
                </div>
            </nav>
        )
    }
}

export default Navbar;