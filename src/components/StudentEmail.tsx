import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import InfoService from "../services/InfoService";

const StudentEmail: FC = () => {
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    InfoService.getStudentMail().then((response) => {
      setEmail(response.data);
    });

  }, []);

  const sendEmail = () => {
    if (!(document.getElementById("inputEmail") as HTMLInputElement).value.includes('@')){
      alert('Неверный формат почты');
      return;
    }
    InfoService.sendNewEmail((document.getElementById("inputEmail") as HTMLInputElement).value).then(() => {
      alert('Новая электронная почта была отправлена. Ожидайте приглашение.');
      location.reload();
    });
  }
  if (email.length > 0 && email!=='') return (
    <div><p>Приглашение было отправлено на адрес <b>{email}</b>.</p>
    <p>Если почта указана неправильно, отправьте исправленный адрес:</p>
    <input className='btnNeutral' style={{ width: '200px' }} placeholder='Ваша электронная почта' type="text" id='inputEmail'></input>
      <br/><button className='navbarbutton' style={{marginTop:'5px'}} onClick={sendEmail}>Отправить</button><br/><br/>
    </div>);
  else {
    return (<div>
      <p>Вашей электронной почты нет в системе. Напишите действующий электронный адрес, чтобы получить приглашение Coursera.</p>
      <input className='btnNeutral' style={{ width: '200px' }} placeholder='Ваша электронная почта' type="text" id='inputEmail'></input>
      <br/><button className='navbarbutton' style={{marginTop:'5px'}} onClick={sendEmail}>Отправить</button><br/><br/>
    </div>);
  }
};

export default observer(StudentEmail);