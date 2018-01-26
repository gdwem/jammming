import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  renderAction() {
    //isRemoval will only be true if tracks are rendered within a <Playlist /> component
    if(this.props.isRemoval) {
      return (
        <a className="Track-action" onClick={this.removeTrack} >-</a>
      );
    } else {
      return (
        <a className="Track-action" onClick={this.addTrack}>+</a>
      );
    }
  }

  addTrack(e) {
    this.props.onAdd(this.props.track);
    e.preventDefault();
  }

  removeTrack(e) {
    this.props.onRemove(this.props.track);
    e.preventDefault();
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}

export default Track;
