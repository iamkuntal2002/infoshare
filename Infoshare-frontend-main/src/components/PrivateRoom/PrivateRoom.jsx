import "./PrivateRoom.css";
import { useState } from "react";
import Modal from "./../Modal/Modal";
import { useContext } from "react";
import RoomContext from "../../store/RoomContext";
import Room2 from "./../Room/Room2";

export default function PrivateRoom(){
    const [visibleCreateModal, setVisibleCreateModal] = useState(false);
    const [visibleJoinModal, setVisibleJoinModal] = useState(false);
    const [visiblePrivate, setVisiblePrivate] = useState(false);

    // const navigate = useNavigate();
    const [roomName, setRoomName] = useState("");


    const roomCtx = useContext(RoomContext);

    const showCreateModal = ()=>{
        setVisibleCreateModal(true);
    }
    const showJoinModal = ()=>{
        setVisibleJoinModal(true);
    }
    const hideModal = ()=>{
        setVisibleCreateModal(false);
        setVisibleJoinModal(false);
    }
    const createRoom = ()=>{
        showCreateModal();
    }
    const joinRoom = ()=>{
        showJoinModal();
    }
    const handleCreate = (room_name, room_pass)=>{
        hideModal();
        setVisiblePrivate(true);
        setRoomName(room_name);
        roomCtx.createPrivateRoom(room_name, room_pass);
    }
    const handleJoin = (room_name, room_pass)=>{
        hideModal();
        setVisiblePrivate(true);
        setRoomName(room_name);
        // navigate(`/private/${room_name}`);
        roomCtx.findPrivateData(room_name, room_pass);
    }
    return (
        <>
            {visibleCreateModal && <Modal onCancel={hideModal} onEnter={handleCreate} modalType="Create"/>}
            {visibleJoinModal && <Modal onCancel={hideModal} onEnter={handleJoin} modalType="Join"/>}
            {!visiblePrivate && 
                <div className="room-button-box">
                    <button onClick={createRoom}>Create Room</button>
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            }
            {visiblePrivate && <Room2 roomName={roomName} roomType="Private Room"/>}
        </>
    );
}