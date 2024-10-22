import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import AdminService from '../services/AdminService';

const AddNewUser: FC = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState<string>("");
    let [roleString, setRole] = useState<string>('notchosen');
    const [messagecolor, setMessageColor] = useState<string>("red");
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    // useEffect(()=>{
    // setModal(modals)
    // },[])

    if (store.isLoading) {
        return <div>Loading ...</div>
    }


    if (!store.isAuth) {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
    const addUser = () => {
        if (roleString != 'notchosen') {
            const iin = (document.getElementById("inputIIN") as HTMLInputElement).value;
            const lastname = (document.getElementById("inputLastname") as HTMLInputElement).value;
            const firstname = (document.getElementById("inputFirstname") as HTMLInputElement).value;
            const patronymic = (document.getElementById("inputPatronymic") as HTMLInputElement).value;
            const role = roleString;
            AdminService.addNewUser(iin,lastname,firstname,patronymic,role).then((response) => {
                setMessage(response.data.message);
                if (response.data.message.indexOf('успешно') !== -1) {
                    setMessageColor("#2ecc71");
                    setButtonDisabled(true);
                } else {
                    setMessageColor("red");
                }
            })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.message) {
                        setMessage(err.response.data.message);
                    } else {
                        setMessage("Ошибка");
                    }
                });
        }
        else {
            alert('Выберите роль');
        }

    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'admin') {
                    return <div style={{ textAlign: 'left', width: '500px' }}>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br />
                        <Link to='/'><button className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link><br /><br />
                        <br />
                        <h3>Добавить нового пользователя</h3>
                        <table >
                            <tr>
                                <td style={{ paddingTop: '10px' }}>ИИН</td>
                                <td style={{width:'50px'}}></td>
                                <td><input id="inputIIN" className='btnNeutral' style={{ width: '200px' }} type="text" placeholder='ИИН'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Фамилия</td>
                                <td style={{width:'50px'}}></td>
                                <td><input id="inputLastname" className='btnNeutral' style={{ width: '200px' }} type="text" placeholder='Фамилия'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Имя</td>
                                <td style={{width:'50px'}}></td>
                                <td><input id="inputFirstname" className='btnNeutral' style={{ width: '200px' }} type="text" placeholder='Имя'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Отчество</td>
                                <td style={{width:'50px'}}></td>
                                <td><input id="inputPatronymic" className='btnNeutral' style={{ width: '200px' }} type="text" placeholder='Отчество'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Роль</td>
                                <td style={{width:'50px'}}></td>
                                <td><select className='btnNeutral' style={{ width: '240px' }} name="roles" id="role" onChange={event => setRole(event.target.value)}>
                                    <option value="notchosen">Роль</option>
                                    <option value="plt_foreign_student">Студент (рос. вуз)</option>
                                    <option value="plt_employee">Сотрудник</option>
                                </select></td>
                            </tr>
                        </table>
                        <br/>
                        {!buttonDisabled?<button className="navbarbutton" onClick={() => addUser()}>Добавить</button>:<button className="graybutton" disabled={true}>Готово</button>}<br />
                        <br/><div style={{ color: messagecolor, fontWeight: 'bold' }}>{message}</div>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(AddNewUser)