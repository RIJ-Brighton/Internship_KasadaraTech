import './ReadOnlyCard.css';

export default function ReadOnlyCard({ gmail , title , Quote }){

    return(
        <div className="card" >
        <div className="card-body">
            <h2 className='title'  >{title}</h2>
            <div className='message-box'>
                <p className='p' style={{overflowWrap: 'break-word',backgroundColor:'transparent'}} >{Quote}</p>
            </div>
            <h5 className='posted-by' >Posted By {gmail.split('@')[0]}</h5>
        </div>
        </div>
    );
}