import "./Body.css";
import { Link } from "react-router-dom";
import RoomContext from "../../store/RoomContext";
import { useContext } from "react";
import Card from "../Card/Card";

export default function Body(){
    const roomCtx = useContext(RoomContext);

    const findPublicData = ()=>{
        roomCtx.findPublicData();
    }

    return (
        <>
            <div className="body-container">
                <div className="body-heading">
                    Welcome to InfoShare
                </div>

                <div className="cards-container">
                    <Card heading="Create Room" description="Create a Private Room with entering a unique name and password" imgSrc="create.png"/>
                    <Card heading="Share Room Details" description="Share the room's name and password with your friends" imgSrc="share.png"/>
                    <Card heading="Join Room" description="Join the room you are looking for after entering the room credentials and enjoy" imgSrc="join.png"/>
                </div>

                <div className="rooms">
                    <Link className="link" to="/public" > <div className="public-room" onClick={findPublicData}>  Public Room  </div> </Link>
                    <Link className="link" to="/private"> <div className="private-room">  Private Room </div> </Link>
                </div>
            </div>
        </>
    );
}