import { Link } from 'react-router-dom';
import './redirectButton.css'
import './errorMessage.css'

export default function NotFoundPage(){
    return(
        <>
            <div>
                <h1 className='errorMessage'><strong>404: Invalid url. The path does not exist.</strong></h1>
            </div>
            <div>
                <Link to='/' className="redirectButton">
                    <button><strong>Home Screen</strong></button>
                </Link>
            </div>
        </>
    )
}