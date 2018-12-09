import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <aside id="sidebar">
                <label>Filter: <input placeholder="Type your query" onChange={(e) => {this.props.filterVenues(e.target.value)}}/></label>
                <ul id="side-list">
                    {this.props.filteredVenues.map(filtered => {
                        return <li key={filtered.venue.id}><div>
                                <h3><strong>{filtered.venue.name}</strong></h3>
                            </div></li>
                    })}
                </ul>
            </aside>            
        )
    }
}

export default Sidebar;