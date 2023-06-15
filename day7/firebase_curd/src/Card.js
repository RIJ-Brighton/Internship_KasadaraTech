import './Card.css';

export default function Card({ userName , title , message }){

    return(
        <div className="card">
        <div className="card-body">
            <h2 className='title'  >{title}</h2>
            <textarea>{message}</textarea>
            <h5 className='posted-by' >Posted By {userName}</h5>
        </div>
        <button className='edit'>Edit</button>
        <button className='delete'>Delete</button>
        </div>
    );
}