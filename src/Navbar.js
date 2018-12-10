import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav id="navbar">
                <h1>Neighbourhood Map</h1>
                <div id="toggle-nav" onClick={() => {this.props.toggleSidebar(this.props.toggleVal)}}>
                    {this.props.toggleVal ? <span role='img' aria-label='open' >&#9776;</span> : <span role='img' aria-label='close' >&#10008;</span>}
                </div>
                {/* &#9776;  &#10008; */}
            </nav>
        )
    }
}

export default Navbar;