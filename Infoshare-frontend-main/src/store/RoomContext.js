import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {toast} from "react-toastify";

const RoomContext = React.createContext({
    publicData: "",
    privateData: "",
    privateRoomFound: "",
    findPublicData: ()=>{},
    updatePublicData: (codeVal)=>{},
    createPrivateRoom: (room_name)=>{},
    findPrivateData: (room_name)=>{},
    updatePrivateData: (room_name, codeVal)=>{},
});

export const RoomContextProvider = (props)=>{
    const [publicData, setPublicData] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [privateRoomFound, setPrivateRoomFound] = useState("");
    
    const BACKEND_URL = process.env.REACT_APP_DB;

    const findPublicData = ()=>{
        const SEARCH_URL = `${BACKEND_URL}/public-room`;
        axios.get(SEARCH_URL).then((response)=>{
            setPublicData(response.data[0].code);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const updatePublicData = (codeVal)=>{
        const UPDATE_URL = `${BACKEND_URL}/public-room`;
        axios.patch(UPDATE_URL, {code: codeVal}).then((response)=>{
            setPublicData(response.data.code);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const createPrivateRoom = (room_name, room_pass)=>{
        const CREATE_URL = `${BACKEND_URL}/rooms`;
        setPrivateRoomFound("");
        setTimeout(() => {
            axios.post(CREATE_URL, {roomName: room_name, roomPass: room_pass, code: ""}).then((response)=>{
                if(response.data.code && response.data.code===11000){
                    throw new Error("Room already Registered");
                }
                findPrivateData(room_name, room_pass);
                return response;
            }).catch((err)=>{
                setPrivateRoomFound("notFound");
                setPrivateData("");
                toast.error("Room already registered");
                return {err: err};
            })
        }, 2000);
    }
    const findPrivateData = (room_name, room_pass)=>{
        const SEARCH_URL = `${BACKEND_URL}/rooms/${room_name}`;
        setPrivateRoomFound("");
        setTimeout(()=>{
            axios.get(SEARCH_URL).then((response)=>{
                if(response.data[0].roomPass === room_pass){
                    setPrivateData(response.data[0].code);
                    setPrivateRoomFound("found");
                    return response;
                }
                else{
                    setPrivateRoomFound("notFound");
                    setPrivateData("");
                    return new Error("Room Password Mismatched");
                }
            }).catch((err)=>{
                setPrivateRoomFound("notFound");
                setPrivateData("");
                return {err: err};
            })
        },2000);
    }
    const updatePrivateData = (room_name, codeVal)=>{
        const UPDATE_URL = `${BACKEND_URL}/rooms/${room_name}`;
        axios.patch(UPDATE_URL, {code: codeVal}).then((response)=>{
            setPrivateData(response.data.code);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }

    const roomContext = {
        publicData: publicData,
        privateData: privateData,
        privateRoomFound: privateRoomFound,
        findPublicData: findPublicData,
        updatePublicData: updatePublicData,
        createPrivateRoom: createPrivateRoom,
        findPrivateData: findPrivateData,
        updatePrivateData: updatePrivateData
    }

    return <RoomContext.Provider value={roomContext}> {props.children} </RoomContext.Provider>
}

export default RoomContext;