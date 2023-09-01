import React, {FC, useContext, useState} from "react";
import {Context} from "../main";
import { observer } from "mobx-react-lite";
import './CreateCert.css';
import { ModalContext } from "../http/ModalContext";

const CreateCert: FC = () => {
    const [value, setValue] = useState<string>('');    
    const {store} = React.useContext(Context);    
    const {close} = useContext(ModalContext);     

    const typeCert = [        
        "Приложение 2" ,
        "Приложение 4" ,
        "Приложение 6" , 
        "Приложение 29" ,
        "Приложение 31" ,
        "По месту требования" 
      ];
    const options = typeCert.map((text, index) => {
		return <option key={index+1} value={index+1}>{text}</option>;
	});
   

    return (
    <div className="modal"> 
        <div className="modalblock">
        <h1>Выберите тип справки</h1>
        <select value={value} onChange={event => setValue(event.target.value)}>
            <option key='0' value='0'>---</option>
            {options}
	    </select>        
        <p></p>
        <button onClick = {
            () => store.prepareCert(parseInt(value))
        } > Создать справку</button>         <button  style={{background:"blue", marginLeft:20}}   onClick={close}> Отмена</button>
        </div>
        
    </div>);
};

export default observer(CreateCert);