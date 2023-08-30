import "./Room.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import RoomContext from "../../store/RoomContext";
import {toast} from "react-toastify";
import { Circles } from 'react-loader-spinner'
import { IoMdRefreshCircle } from "react-icons/io";

export default function Room(props){
    const [code, setCode] = useState("");
    const roomCtx = useContext(RoomContext);
    const [reloading, setReloading] = useState(false);
    useEffect(()=>{
        roomCtx.findPublicData();
        setCode(roomCtx.publicData);
    },[roomCtx.publicData])

    function reload(){
        setReloading(true);
        roomCtx.findPublicData();
        setCode(roomCtx.publicData);
        setTimeout(() => {
            setReloading(false);
        }, 700);
    }

    function updatePublicData(){
        if(code.trim().length===0){
            toast.error("Unable to save empty data");
            return;
        }
        roomCtx.updatePublicData(code);
        toast.success("Changes saved successfully");
    }

    return (
        <>
            <div className="room-heading">{props.roomType}</div>
            <div className="room-description">
                <textarea name="" id="" cols="30" rows="10" value={code} onChange={(e)=>{setCode(e.target.value)}}/>
                <Circles
                    height="80"
                    width="80"
                    // color="#4fa94d"
                    color="rgb(4, 111, 219)"
                    ariaLabel="circles-loading"
                    wrapperStyle={roomCtx.visibleLoader}
                    wrapperClass="circle-loader"
                    visible={roomCtx.publicData.length===0}
                    />
            </div>
            <div className="button-box">
                <button className="save" onClick={updatePublicData}>Save Changes</button>
                <Link className="back-link" to="/"> <button className="back">  Go Back </button> </Link>
                
                <IoMdRefreshCircle className={reloading?"reload-button reloading":"reload-button"} onClick={reload}/>
            </div>
        </>
    );
}