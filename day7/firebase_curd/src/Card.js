import './Card.css';

export default function Card({ userName , title , message }){

    return(
        <div className="card">
        <div className="card-body">
            <h2>{title}</h2>
            <p>{message}</p>
            <h5>Posted By {userName}</h5>
        </div>
        <button className='edit'>Edit</button>
        <button className='delete'>Delete</button>
        </div>
    );
}