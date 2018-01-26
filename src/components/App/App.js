import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    //playlist and playlist tracks are initially empty arrays
    this.state = {
     searchResults: [],
     playlistName: 'playlistName',
     playlistTracks: []
    };
    //bind component methods
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let playlistTracks = this.state.playlistTracks; //create temporary array called playlistTracks equal to current state of playlist
    playlistTracks.push(track);
    this.setState({playlistTracks: playlistTracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks; //create new array called tracks equal to current state of playlist
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id); //check to see which currentTrack id (in tracks) matches track being removed
    this.setState({ playlistTracks: tracks}); //set the state of playlistTracks to new tracks array
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(function(track) {
      return track.uri;
      }
    );  //for every track in current playlistTracks state, return the track URI - will return an array of URI's
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({playlistName: "New Playlist"});  //clear the playlist name
      this.setState({searchResults: []}); //clear the searchResults
      }
    )
  }

  search(term) {
    Spotify.search(term).then(searchResult => this.setState({ searchResults: searchResult })); //fill searchResults with searchResult
    console.log(`Searching Spotify with ${term}`); //additional console.log to check term
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
