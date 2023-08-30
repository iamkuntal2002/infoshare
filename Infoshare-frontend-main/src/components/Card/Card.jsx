import "./Card.css";

export default function Card(props){
    return (
        <>
            <div className="card-container">
                <div className="image-box">
                    <img src={require(`./../../assets/${props.imgSrc}`)}/>

                </div>
                <div className="text-box">
                    <div className="text-head">{props.heading}</div>
                    <div className="text-desc">{props.description}</div>
                </div>
            </div>
        </>
    );
}