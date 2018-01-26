let accessToken; // initially undefined
const client_id = '90cc0506a961470b89219fa3cc7115d5';
const redirect_uri = 'http://localhost:3000/';

let Spotify = {
  getAccessToken() {
      if(accessToken) {
        return accessToken; //returns access token if variable is already populated
      };

      const accessTokenResponse = window.location.href.match(/access_token=([^&]*)/);  //grabs accessToken from url by matching a regex
      const expiresInResponse = window.location.href.match(/expires_in=([^&]*)/); //grabs expireIn time from url by matching a regex
      if (accessTokenResponse && expiresInResponse) {
        accessToken = accessTokenResponse[1];
        const expiresIn = expiresInResponse[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000); // accessToken will expire in an hour
        window.history.pushState('Access Token', null, '/'); // clear access token
        return accessToken;
      } else {
        // if access token is empty (i.e if application running for the first time), load this url
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
      }
    },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    let type = 'track';
    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=${type}`, { headers: { 'Authorization': `Bearer ${accessToken}` } } ).then(response => {
      return response.json()}).then(jsonResponse => {
        if(jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            };
          });
        }
      });
  },

  async savePlaylist(playlistName, trackURIs) {
    if (playlistName && trackURIs) {
      playlistName = playlistName;
      trackURIs = trackURIs;
    }; //check playlistName and trackURIs are populated already
    const accessToken = Spotify.getAccessToken();
    let headers = {Authorization: `Bearer ${accessToken}`};
    let user_id = '';

    let username = await fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
      return response.json()}).then(jsonResponse => jsonResponse.id); //jsonResponse.id contains username

    user_id = username;

      try {
        //create empty playlist with returned user_id and accessToken
        let emptyPlaylist = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: `${playlistName}`})
        });
        if(emptyPlaylist.ok) {
          let jsonResponse = await emptyPlaylist.json();
          let playlist_id = jsonResponse.id; //grab playlist id
          let user_id = jsonResponse.owner.id; //grabs user id

          //needed this to escape underscore character in username - issue logged at spotifys end but actually appears to be working without it
          //String.prototype.slugify = function(){
          //    return this.replace('_','%5F')
          //}
          //user_id.slugify();

          // post request to create playlist with playlist id and track
          console.log(trackURIs); // check tracks URIs are ready to be passed to request body
          try {
            // add tracks to playlist using the user_id, playlist_id and trackURIs (passed to the request body)
          let playlistCreation = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackURIs})
          });
          if(playlistCreation.ok) {
          let jsonResponse = await playlistCreation.json();
          let playlistId = jsonResponse.snapshot_id;
          console.log("playlist created with id " + playlistId); //log to console upon success
          return playlistId;
        }
      } catch(error) {
        console.log("An error occured while trying to add tracks to the playlist" + error);
      }
      }
    } catch(error) {
      console.log("An error occured while trying to create a new empty playlist" + error);
    }
  }
}

export default Spotify;
