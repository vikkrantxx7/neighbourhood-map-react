import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav id="navbar">
                <h1>Neighbourhood Map</h1>
                <span role='img' aria-label='close'>&#9776;</span>
                {/* &#9776;  &#10008; */}
            </nav>
        )
    }
}

export default Navbar;