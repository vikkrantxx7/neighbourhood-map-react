import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input'
//Component that contains the list of venues
class Sidebar extends Component {
    render() {
        return (
            <aside id="sidebar">
                {/* Debounce input waits for the input for provided duration before invoking onChange */}
                <label>Filter: <DebounceInput debounceTimeout={500} placeholder="Type your query" onChange={(e) => {this.props.filterVenues(e.target.value)}} value={this.props.query}/></label>
                <ul id="side-list">
                    {this.props.filteredVenues.map(filtered => {
                        return  <li tabIndex="0" key={filtered.venue.id} onClick={() => this.props.clickList(filtered)} onKeyPress={(e) => {this.props.listKeyPress(e, filtered)}}>
                                    <div>
                                        <h3><strong>{filtered.venue.name}</strong></h3>
                                        <span>{filtered.venue.categories[0].name}</span>
                                    </div>
                                </li>
                    })}
                </ul>
            </aside>            
        )
    }
}

export default Sidebar;