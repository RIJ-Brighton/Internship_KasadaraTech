import './Card.css';

export default function Card({ gmail , title , Quote }){

    // update , delete post

    return(
        <div className="card">
        <div className="card-body">
            <h2 className='title'  >{title}</h2>
            <div className='message-box'>
                <p className='p' style={{overflowWrap: 'break-word'}} >{Quote}</p>
            </div>
            <h5 className='posted-by' >Posted By {gmail.toString().split('@')[0]}</h5>
        </div>
        <button className='edit'>Edit</button>
        <button className='delete'>Delete</button>
        </div>
    );
}