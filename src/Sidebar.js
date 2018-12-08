import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <aside id="sidebar">
                <label>Filter: <input placeholder="Type your query" onChange={(e) => {this.props.filterVenues(e.target.value)}}/></label>
                
            </aside>            
        )
    }
}

export default Sidebar;