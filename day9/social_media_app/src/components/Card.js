import './Card.css';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Card({ gmail , title , Quote, id }){

    const deletePost = (e) => {
        e.preventDefault();
        const documentReference = doc(db, 'posts', id);
        deleteDoc(documentReference).then(() => {
            console.log('Deleted post with id',id);
            toast.success('Post Deleted', {position: toast.POSITION.TOP_LEFT});
        }).catch(() => {
            toast.error('Error Occured', {position: toast.POSITION.TOP_LEFT});
        });
    }

    return(
        <div className="card">
        <div className="card-body" style={{backgroundColor:'lightblue'}}>
            <h2 className='title'  >{title}</h2>
            <div className='message-box'>
                <p className='quote' style={{backgroundColor:'transparent'}}>{Quote}</p>
            </div>
            <h5 className='posted-by' >Posted By {gmail.toString().split('@')[0]}</h5>
        </div>
        <button className='edit'>Edit</button>
        <button className='delete' onClick={deletePost}>Delete</button>
        </div>
    );
}