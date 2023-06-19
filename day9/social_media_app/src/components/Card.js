import './Card.css';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faEdit } from '@fortawesome/free-solid-svg-icons';

const ConfirmationToast = ({ onConfirm, onCancel }) => (
    <div className='confirmationStyle'>
      <div>Are you sure you want to proceed?</div><br/>
      <button className='buttonStyle' onClick={onConfirm}>Yes</button>
      <button className='buttonStyle' onClick={onCancel}>No</button>
    </div>
);

export default function Card({ gmail , title , Quote, id }){

    const handleClick = () => {
        toast(
          <ConfirmationToast onConfirm={deletePost} onCancel={handleCancel} />,
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
            draggable: false,
            closeButton: false,
            closeOnClick: false,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            hideProgressBar: true,
          }
        );
    };

    const handleCancel = () => {
        toast.dismiss();
    };

    const deletePost = (e) => {
        e.preventDefault();
        toast.dismiss();
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
        <div className="card-body">
            <h2 className='title'  >{title}</h2>
            <div className='message-box'>
                <p className='quote'>{Quote}</p>
            </div>
            <h5 className='posted-by' >Posted By {gmail.toString().split('@')[0]}</h5>
        </div>
        <FontAwesomeIcon  className='edit' icon={faEdit} />
        <FontAwesomeIcon  className='delete' icon={faTrash} onClick={handleClick}/>
        </div>
    );
}