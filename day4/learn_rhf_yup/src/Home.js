import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
      <div className="login">
        <h1>Hello, loggin?</h1>
        <Link to='/login'> <input type="submit" className="form-button" value="Log in"/> </Link>
      </div>
  );
}