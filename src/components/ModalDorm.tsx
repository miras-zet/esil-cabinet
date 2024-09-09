import { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import './CreateCert.css';
import { ModalContext } from "../http/ModalContext";
import UploadService from "../services/UploadService";

const ModalDorm: FC = () => {
    const [dormtype, setDormType] = useState<string>('dorm');
    const [message, setMessage] = useState<string>('');
    const [buttonpressed, setButtonPressed] = useState<boolean>(false);
    const [roomnumber, setRoomNumber] = useState<string>('');
    const { close } = useContext(ModalContext);

    useEffect(() => {
        if(localStorage.getItem('editMode')=='true'){
            localStorage.setItem('editMode','false');
            setDormType(localStorage.getItem('dormType'));
            setMessage(localStorage.getItem('dormMessage'));
            setRoomNumber(localStorage.getItem('dormRoomNumber'));
            
        }
        
    })
    const redirectApprove = () => {
        setButtonPressed(true);
        localStorage.setItem('dormType', dormtype);
        localStorage.setItem('dormMessage', message);
        localStorage.setItem('dormRoomNumber', roomnumber);
        UploadService.approveDormRequestForUser().then(() => {
            location.reload();
        });
    }
    const redirectDeny = () => {
        setButtonPressed(true);
        localStorage.setItem('dormMessage', message);
        UploadService.denyDormRequestForUser().then(() => {
            location.reload();
        });
    }

    return (
        <div className="modal_new">
            <div className="modalblock_new">
                <center><h2>Ответ на заявку</h2>
                    <h3>{localStorage.getItem('dormFIO')}</h3>
                    <p style={{ color: "black" }}>Вид общежития</p>
                    <select className="btn" style={{ color: 'black', backgroundColor: 'white', border: 'solid 1px', borderColor: 'gray' }} value={dormtype} onChange={event => setDormType(event.target.value)}>
                        <option key='1' selected={localStorage.getItem('dormType')=='dorm'} value='dorm'>Собственное общежитие</option>
                        <option key='2' selected={localStorage.getItem('dormType')=='hostel'} value='hostel'>Хостел</option>
                    </select>
                    <br /><br />
                    <p style={{ color: "black" }}>Номер комнаты</p>
                    <input type='text' className="btn" style={{ color: 'black', width: '40%', backgroundColor: 'white', border: 'solid 1px', borderColor: 'gray' }} placeholder='Номер комнаты' maxLength={10} value={roomnumber} onChange={event => setRoomNumber(event.target.value)}></input><br /><br />
                    <p></p>
                    <p style={{ color: "black" }}>Сообщение для уведомления</p>
                    <input type='text' className="btn" style={{ color: 'black', width: '80%', backgroundColor: 'white', border: 'solid 1px', borderColor: 'gray' }} placeholder='Сообщение' maxLength={254} value={message} onChange={event => setMessage(event.target.value)}></input><br /><br />
                    <p></p>
                    <button disabled={buttonpressed} style={{ backgroundColor: '#088c64' }} onClick={() => redirectApprove()}>Принять</button>
                    &nbsp;<button disabled={buttonpressed} style={{ backgroundColor: 'crimson' }} onClick={() => redirectDeny()}>Отклонить</button>
                    &nbsp;<button disabled={buttonpressed} style={{ background: "blue", marginLeft: 20 }} onClick={close}>Отмена</button>
                </center>
            </div>

        </div>);
};

export default observer(ModalDorm);