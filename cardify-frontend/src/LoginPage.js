import React from 'react';

//const localURL = process.env.REACT_APP_LOCAL_URL;


const LoginPage = ({ setIsAuthenticated }) => {

    const piURL = process.env.REACT_APP_PI_URL;

    const loginUrl = piURL+"login";

    console.log(loginUrl)

    const handleLogin = () => {
        console.log(process.env.REACT_APP_PI_URL+"login");
        // Simulate the login flow; you'd likely want to send the user to the login URL
        window.location.href = process.env.REACT_APP_PI_URL+"login";

        // Once authentication is confirmed (in the real flow this happens after redirect)
        // setIsAuthenticated should be called to update the app state
        //setIsAuthenticated(true);
    };

    return (
        <div className="login-page">
        <div className="login-container">
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify Logo"
            className="spotify-logo"
            />
            <h1>Welcome to Cardify</h1>
            <p>Log in with Spotify to see your top artists and songs!</p>
            <button className="spotify-login-button" onClick={handleLogin}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                alt="Spotify Icon"
                className="spotify-icon"
            />
            Login with Spotify
            </button>
        </div>
        </div>
    );
};

export default LoginPage;
