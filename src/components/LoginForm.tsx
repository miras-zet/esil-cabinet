import React, {FC, useState} from "react";
import {Context} from "../main";
import { observer } from "mobx-react-lite";
import logo from '/logo_new.png';

const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const {store} = React.useContext(Context);
    // const debugAdmin = () => {
    //     store.login('6172', '020815550281');
    // }
    // const debugTutor = () => {
    //     store.login('730705301528', '730705301528');
    // }
    function sanitizeInput(username) {
        const forbiddenChars = "'`,+=<>?{}";
        const forbiddenSet = new Set(forbiddenChars);

        const removeForbiddenChars = (input) => {
            return [...input].filter(char => !forbiddenSet.has(char)).join('');
        };
    
        const sanitizedUsername = removeForbiddenChars(username);
        return sanitizedUsername;
    }

    const handleLogin = (isSuccessful: boolean, username, password) => {
        if (isLocked) return;
        if (username.length > 1) store.login(sanitizeInput(username), password);
        if (isSuccessful) {
          setFailedAttempts(0);
        } else {
          const newAttempts = failedAttempts + 1;
          if (username.length > 1) setFailedAttempts(newAttempts);
    
          if (newAttempts >= 5) {
            setIsLocked(true);
            alert("Слишком много попыток входа. Попробуйте снова через 10 секунд. Логин и пароль - ваш ИИН.");
            
            setTimeout(() => {
              setFailedAttempts(0);
              setIsLocked(false);
            }, 10000);
          }
        }
      };
    
    return (
    <div> 
        <img src={logo} width={300} /> 
        <h2 style={{fontSize: 40}}>{window.location.port=='5173'? 'dev build':'Esil Кабинет'}</h2>
        <input onChange = {
            e => setUsername(e.target.value)
        }
        value = {
            username
        }
        type = "text" placeholder = "ИИН или логин" 
        style={{fontSize: 16,
            padding: 5,
            margin: 5,
          }}
        /> 
        <br/>
        
        <input onChange = {
            e => setPassword(e.target.value)
        }
        value = {
            password
        }
        type = "password" placeholder = "пароль"
        style={{fontSize: 16,
            padding: 5,
            margin: 5,
          }}
        /> 
        <div>{store.errors === 401 && <span style={{color: 'red'}}>Не верно введен логин или пароль</span>} {store.errors === 500 && <span style={{color: 'red'}}>Ошибка сервера</span>} {store.errors === 400 && <span style={{color: 'red'}}>Не верно введен логин или пароль</span>} &nbsp;</div> 
        <div>{localStorage.getItem('login_token_incorrect') === '1' && <span style={{color: 'red'}}>Сессия устарела. Войдите в аккаунт заново</span>}</div> 
        {/* <button className='navbarbutton' onClick = {
            () => store.login(sanitizeInput(username), password)
        }
        style={{padding: 10,
            margin: 10}}> Войти</button> */}
        <button className='navbarbutton' style={{padding: 10, margin: 10}} onClick={() => handleLogin(false,username,password)} disabled={isLocked}>
      {isLocked ? `Подождите.. (10 сек)` : "Войти"}
    </button>
        <p>Если Вы на сайте в первый раз, логин и пароль - ИИН</p>
        <p>При возникновении проблем с входом в личный кабинет просим Вас обратиться в ЦИТ</p>
    </div>);
};

export default observer(LoginForm);