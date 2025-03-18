const RoomButton = (props) => {
    return (
        <>
            <button className="room-button" type={props.type} onClick={props.onClick}>
            {props.children}
        </button>
    
        </>
    );
}

export default RoomButton;