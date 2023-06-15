import './ReadOnlyCard.css';

export default function ReadOnlyCard({ gmail , title , message }){

    return(
        <div className="card">
        <div className="card-body">
            <h2 className='title'  >{title}</h2>
            <div className='message-box'>
                <p className='p' style={{overflowWrap: 'break-word'}} >{message}</p>
            </div>
            <h5 className='posted-by' >Posted By {gmail.split('@')[0]}</h5>
        </div>
        </div>
    );
}