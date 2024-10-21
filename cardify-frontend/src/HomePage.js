import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {

    const [timeRange, setTimeRange] = useState('short_term');  // Default to short_term
    const [topArtists, setTopArtists] = useState([]);

  // Fetch top artists whenever the time range changes
    useEffect(() => {
        if (timeRange) {
        axios.get(`http://localhost:8888/getTopArtists?time_range=${timeRange}`, {
            withCredentials: true
        })
        .then(response => {
            setTopArtists(response.data);
        })
        .catch(error => {
            console.error('Error fetching top artists:', error);
        });
        }
    }, [timeRange]);

        return ( 
            <div>
        <h1>Your Top Artists</h1>
        <div>
            <button onClick={() => setTimeRange('short_term')}>Last 4 Weeks</button>
            <button onClick={() => setTimeRange('medium_term')}>Last 6 Months</button>
            <button onClick={() => setTimeRange('long_term')}>Last 1 Year</button>
        </div>

        <div className="artist-cards">
            {topArtists.map(artist => (
            <div key={artist.name} className="card">
                <img src={artist.imageUrl} alt={artist.name} />
                <h3>{artist.name}</h3>
                <p>Genres: {artist.genres.join(', ')}</p>
                <p>Popularity: {artist.popularity}</p>
                <a href={artist.externalUrl}>View on Spotify</a>
            </div>
            ))}
        </div>
        </div>

        );
}
 
export default HomePage;