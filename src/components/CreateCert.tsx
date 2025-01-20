import React, {FC, useContext, useState} from "react";
import {Context} from "../main";
import { observer } from "mobx-react-lite";
import './CreateCert.css';
import { ModalContext } from "../http/ModalContext";

const CreateCert: FC = () => {
    const [value, setValue] = useState<string>('');
    const [lang, setLang] = useState<string>('');    
    const {store} = React.useContext(Context);    
    const {close} = useContext(ModalContext);     

    const typeCert = [        
        "Приложение 2" ,
        "Приложение 4" ,
        //"Приложение 6" , 
        "Приложение 29 (без лицензии)" ,
        "Приложение 29 (с лицензией)" ,
        //"Приложение 31" ,
        "По месту требования" 
      ];
    const options = typeCert.map((text, index) => {
		return <option key={index+1} value={index+1}>{text}</option>;
	});
   

    return (
    <div className="modal"> <br/><br/><br/><br/><br/>
        <div className="modalblock">
        <h2>Выберите тип справки</h2>
        <select value={value} onChange={event => setValue(event.target.value)}>
            <option key='0' value=''>---</option>
            {options}
	    </select>  
        <p style={{color:"black"}}>Выберите язык</p>
        <select value={lang} onChange={event => setLang(event.target.value)}>
            <option key='ru' value='ru'>Русский</option>
            <option key='kz' value='kz'>Казахский</option>
            <option key='en' value='en'>Английский</option>
	    </select>      
        <p></p>
        <button onClick = {
            () => store.prepareCert(parseInt(value), lang)
        } > Создать справку</button>         <button  style={{background:"blue", marginLeft:20}}   onClick={close}> Отмена</button>
        </div>
        
    </div>);
};

export default observer(CreateCert);