import './ReadOnlyCard.css';
import { useUserAuth } from '../context/UserAuthContext';

export default function ReadOnlyCard({ title , Quote , uid }){

    const { allUsers } = useUserAuth();
    let name = '';
    allUsers.forEach(user => {
        if(user.id === uid) {name = user.Username}
    })

    return(
        <div className="ReadOnlyCard">
        <div className="ReadOnlyCard-body">
            <h2 className='ReadOnlyCard-title'  >{title}</h2>
            <div className='ReadOnlyCard-message-box'>
                <p className='quote'>{Quote}</p>
            </div>
            <h5 className='ReadOnlyCard-posted-by' >Posted By {name ? name : 'Deleted User'}</h5>
        </div>
        </div>
    );
}