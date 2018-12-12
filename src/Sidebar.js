import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input'
//Component that contains the list of venues
class Sidebar extends Component {
    render() {
        return (
            <aside id="sidebar">
                {/* Debounce input waits for the input for provided duration before invoking onChange */}
                <label>Filter: <DebounceInput debounceTimeout={500} placeholder="Type your query" onChange={(e) => {this.props.filterVenues(e.target.value)}} value={this.props.query}/></label>
                <ul aria-label="Nearby Venues' List" tabIndex="0" id="side-list">
                    {this.props.filteredVenues.map((filtered, index) => {
                        return  <li tabIndex="0" aria-posinset={index+1} aria-setsize={this.props.filteredVenues.length} key={filtered.venue.id} onClick={() => this.props.clickList(filtered)} onKeyPress={(e) => {this.props.listKeyPress(e, filtered)}}>
                                    <h3><strong>{filtered.venue.name}</strong></h3>
                                    <span>{filtered.venue.categories[0].name}</span>
                                </li>
                    })}
                </ul>
            </aside>            
        )
    }
}

export default Sidebar;