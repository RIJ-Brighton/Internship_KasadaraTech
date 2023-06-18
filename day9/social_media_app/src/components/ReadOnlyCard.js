import './ReadOnlyCard.css';

export default function ReadOnlyCard({ gmail , title , Quote }){

    return(
        <div className="ReadOnlyCard" >
        <div className="ReadOnlyCard-body">
            <h2 className='ReadOnlyCard-title'  >{title}</h2>
            <div className='ReadOnlyCard-message-box'>
                <p className='ReadOnlyCard-p' style={{overflowWrap: 'break-word',backgroundColor:'transparent'}} >{Quote}</p>
            </div>
            <h5 className='ReadOnlyCard-posted-by' >Posted By {gmail.split('@')[0]}</h5>
        </div>
        </div>
    );
}