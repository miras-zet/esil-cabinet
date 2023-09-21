import React, {FC, useState} from "react";
import {Context} from "../main";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = React.useContext(Context);

    return (
    <div> 
        <img src="https://esil.edu.kz/bitrix/templates/UniverNew/img/logo_new.png" width={300} />
        <h2 style={{fontSize: 30}}>АВТОРИЗУЙТЕСЬ</h2>
        
        < input onChange = {
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
        <div>{store.errors === 401 && <span style={{color: 'red'}}>Не верно введен логин или пароль</span>} {store.errors === 500 && <span style={{color: 'red'}}>Ошибка сервера</span>} &nbsp;</div> 
          
        <button onClick = {
            () => store.login(username, password)
        } 
        style={{padding: 10,
            margin: 10,
            background: "#47a847",
            color: "white"}}> Войти</button>
        <p>Если вы в первый раз введите логин и пароль ваш ИИН</p>
    </div>);
};

export default observer(LoginForm);