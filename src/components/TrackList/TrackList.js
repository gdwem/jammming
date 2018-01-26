import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  //will return an array of <Track /> components with attributes track, key, onAdd, isRemoval and onRemove

  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => <Track track={track} key={track.id} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} />)}
      </div>
    );
  }
}

export default TrackList;
