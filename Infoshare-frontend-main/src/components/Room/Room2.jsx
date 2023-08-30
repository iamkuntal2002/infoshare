import "./Room.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import RoomContext from "../../store/RoomContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaStarOfLife } from "react-icons/fa";
import {toast} from "react-toastify";
import { IoMdRefreshCircle } from "react-icons/io";
import { Circles } from 'react-loader-spinner'

export default function Room2(props){
    const roomCtx = useContext(RoomContext);
    const [code, setCode] = useState("");
    const [visibleName, setVisibleName] = useState(false);
    const roomName = props.roomName;
    const [reloading, setReloading] = useState(false);

    useEffect(()=>{
    //     roomCtx.findPrivateData(roomName);
        setCode(roomCtx.privateData);
    },[roomCtx.privateData])

    function reload(){
        setReloading(true);
        setCode(roomCtx.privateData);
        setTimeout(() => {
            setReloading(false);
        }, 700);
    }

    function updatePrivateData(){
        roomCtx.updatePrivateData(roomName, code);
        toast.success("Changes saved successfully");
    }

    const toggleRoomName = ()=>{
        setVisibleName(!visibleName);
    }

    return (
        <>
            {roomCtx.privateRoomFound==="found" && <div>
                <div className="room-heading">{props.roomType}</div>
                <div className="room-name">
                    <span className="room-name-roomName">{visibleName? roomName:<div className="pass-stars"><FaStarOfLife/><FaStarOfLife/><FaStarOfLife/><FaStarOfLife/><FaStarOfLife/></div>}</span>
                    <span className="room-name-icon">
                        {visibleName? <AiFillEye onClick={toggleRoomName}/>:<AiFillEyeInvisible onClick={toggleRoomName}/>}
                    </span>
                </div>
                <div className="room-description">
                    <textarea name="" id="" cols="30" rows="10" value={code} onChange={(e)=>{setCode(e.target.value)}} placeholder="Write your data here..."/>
                </div>
                <div className="button-box">
                    <button className="save" onClick={updatePrivateData}>Save Changes</button>
                    <Link className="back-link" to="/"> <button className="back">  Go Back </button> </Link>
                    <IoMdRefreshCircle className={reloading?"reload-button reloading":"reload-button"} onClick={reload}/>
                </div>
            </div>}

            {roomCtx.privateRoomFound==="notFound" &&
                <div className="roomNotFound">
                    <img src={require("./../../assets/error.png")} alt="img" />
                    <div className="room-text">
                        <h3>Room Not Found</h3>
                        <h4>Sorry, but we can't find the room you are looking for...</h4>

                        <div className="button-box2">
                            <Link className="back-link" to="/"> <button className="back">  Go Back </button> </Link>
                        </div>
                    </div>
                </div>
            }
            <Circles
                    height="80"
                    width="80"
                    // color="#4fa94d"
                    color="rgb(4, 111, 219)"
                    ariaLabel="circles-loading"
                    wrapperClass="circle-loader2"
                    visible={roomCtx.privateRoomFound===""}
            />
        </>
    );
}