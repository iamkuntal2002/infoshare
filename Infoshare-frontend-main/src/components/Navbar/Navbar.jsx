import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <>
            <div className="navBar">
                <div className="leftNav"> <Link to="/"> InfoShare </Link></div>
                <div className="rightNav">
                    <Link className="link" to="/public"> <li> Public Room </li> </Link>
                    <Link className="link" to="/private"> <li> Private Room </li> </Link>
                </div>
            </div>
        </>
    );
}