// Load environment variables from the .env file.
require('dotenv').config();

// Import the necessary modules.
const express = require('express');
const session = require('express-session');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors'); // Import CORS middleware

// Initialize an Express application.
const app = express();

// Use CORS middleware to allow requests from any origin
app.use(cors({
    origin: 'https://cardifyme.netlify.app/',  // Replace with your frontend's origin
    credentials: true  // Enable credentials (i.e., cookies) to be sent along with requests
}));

// Define the port number on which the server will listen.
const port = 8888;

console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);
console.log(process.env.REDIRECT_URL);

// Initialize the Spotify API with credentials from environment variables.
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URL
});

// Route handler for the login endpoint.
app.get('/login', (req, res) => {
    // Define the scopes for authorization; these are the permissions we ask from the user.
    const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state', 'user-top-read'];
    // Redirect the client to Spotify's authorization page with the defined scopes.
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// Route handler for the callback endpoint after the user has logged in.
// Route handler for the callback endpoint after the user has logged in.
app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    // Exchange the code for an access token and a refresh token.
    spotifyApi.authorizationCodeGrant(code).then(data => {
        const accessToken = data.body['access_token'];
        const refreshToken = data.body['refresh_token'];

        // Store the tokens in the session
        req.session.accessToken = accessToken;
        req.session.refreshToken = refreshToken;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        // Redirect user to homepage after successful login
        res.redirect('https://cardifyme.netlify.app/');  // Redirect to your frontend's homepage
    }).catch(error => {
        console.error('Error getting Tokens:', error);
        res.send('Error getting tokens');
    });
});


// Route to fetch top artists based on selected time range
app.get('/getTopArtists', (req, res) => {
    const timeRange = req.query.time_range || 'short_term'; // Default to short_term (4 weeks)

    // Check if the access token exists in the session
    if (!req.session.accessToken) {
        return res.status(401).send('No access token in session');
    }

    // Set the access token on the Spotify API instance
    spotifyApi.setAccessToken(req.session.accessToken);

    // Fetch the user's top artists
    spotifyApi.getMyTopArtists({ time_range: timeRange, limit: 6 }).then(topArtistData => {
        const topArtists = topArtistData.body.items.map(artist => ({
            name: artist.name,
            popularity: artist.popularity,
            imageUrl: artist.images[0]?.url,
            externalUrl: artist.external_urls.spotify,
            genres: artist.genres,
        }));

        res.json(topArtists);  // Send the top artists data as JSON
    }).catch(err => {
        console.error('Error fetching top artists:', err);
        res.status(500).send('Error fetching top artists');
    });
});



// Start the Express server.
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});




/*
// Route handler for the search endpoint.
app.get('/search', (req, res) => {
    // Extract the search query parameter.
    const { q } = req.query;

    // Make a call to Spotify's search API with the provided query.
    spotifyApi.searchTracks(q).then(searchData => {
        // Extract the URI of the first track from the search results.
        const trackUri = searchData.body.tracks.items[0].uri;
        // Send the track URI back to the client.
        res.send({ uri: trackUri });
    }).catch(err => {
        console.error('Search Error:', err);
        res.send('Error occurred during search');
    });
});

// Route handler for the play endpoint.
app.get('/play', (req, res) => {
    // Extract the track URI from the query parameters.
    const { uri } = req.query;

    // Send a request to Spotify to start playback of the track with the given URI.
    spotifyApi.play({ uris: [uri] }).then(() => {
        res.send('Playback started');
    }).catch(err => {
        console.error('Play Error:', err);
        res.send('Error occurred during playback');
    });
});
*/