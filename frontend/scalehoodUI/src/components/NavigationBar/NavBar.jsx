import './NavBar.css'

export default function NavBar(){

    return(
        <div className="header">
            <div className="logo-container">
            <img
                className="hoodlogo"
                src="C:\Users\porwa\OneDrive\Desktop\SellScaleHood\frontend\scalehoodUI\logos\hood.png"
                alt='scale hood logo'
            />
            <span className="app-name">ScaleHood</span>
            </div>

            <div className="search-container">
            <input
                type="text"
                placeholder='Search Tickers'
                className= "search-bar"
            />
            </div>

            <div className="userGreetings">
            <span>Hi Mohit!</span>
            </div>
        </div>
    )

}


