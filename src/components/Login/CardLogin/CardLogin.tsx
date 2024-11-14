import { FormEvent, useState } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';



const CardLogin = () => {
   
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      auth.handleLogin(email, password);
    } catch (exception) {
      setTimeout(() => {
        console.log('credentials wrong', exception);
      }, 5000);
    }
  };
  return (
    <section className={style.container}>
      <div className={style.loginBox}>
        <h2 className={style.welcome}>Bem-vindo</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="E-mail de usuário"
            name="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit" className={style.submitButton}>Entrar</button>
          <div className={style.options}>
            <label className={style.rememberMe}>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <a href="#" className={style.forgotPassword}>Esqueceu sua senha?</a>
          </div>
         <p>Não é um membro? <Link to="/register">Inscreva-se agora </Link>  </p>  
        </form>
      </div>
    </section>
  )
}


export default CardLogin
