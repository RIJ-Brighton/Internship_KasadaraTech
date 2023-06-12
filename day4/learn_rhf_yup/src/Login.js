import './Login.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const nav = useNavigate();

  const schema = yup.object().shape({
    Email : yup.string().email().required(),
    Password : yup.string().min(8).max(12).required()
  })

  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver : yupResolver(schema)
  });

  const onSub = (data) => {
    nav('/LogSuccess');
    console.log(data);
  }

  return (
    <form className="login" onSubmit={handleSubmit(onSub)}>
      <h1>Login</h1>
      <span className="form-input">
        <input type="text" placeholder="Email" {...register("Email")} />
       {errors.Email?.message && 'Invalid Email'}
      </span>
      <br/>
      <span className="form-input">
        <input type="password" placeholder="Password" {...register("Password")} />
        {(errors.Password?.message) && 'Enter a valid password' }
      </span>
      <br/>
      <input type="submit" className="form-button" value="Log in"/>
      <div className="box1"></div>
      <div className="box2"></div>
    </form>
  );
}