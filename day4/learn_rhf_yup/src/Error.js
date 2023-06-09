import './Error.css';
import { Link } from 'react-router-dom';

export default function Error() {

  return (
      <div className="login">
        <h1>Invalid Page, Go Back?</h1>
        <Link to='/'> <input type="submit" className="form-button" value="Home Page"/> </Link>
      </div>
  );
}