import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js';

class SearchResults extends React.Component {
  //will return a <Tracklist /> component filled with an array of <Track />s, based on searchResults

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
      </div>
    );
  }
}

export default SearchResults;
