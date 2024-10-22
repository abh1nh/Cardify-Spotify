const Navbar = ({ handleLogout }) => {
    return ( 
        <nav className="navbar">
            <h1>Cardify</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/privacypolicy">Privacy Policy</a>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </nav> );
}
 
export default Navbar;