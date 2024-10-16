import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate, useNavigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import DocsService from '../services/DocsService';
//import { Tooltip } from 'react-tooltip';
import { EmployeeTitleResponse } from '../models/response/EmployeeTitleResponse';

const HREmployeeList: FC = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [employees, setEmployeeList] = useState<Array<EmployeeTitleResponse>>([]);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        DocsService.getEmployeeList().then((response) => {
            setEmployeeList(response.data);
        }).catch((err) => {
            console.log(err);
            setEmployeeList([]);
        });
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [])

    // useEffect(()=>{
    //   setModal(modals)
    // },[])


    const employeeList = employees.map((element, index) =>
        <tr key={element.iin} style={{ textAlign: 'center' }}>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{index + 1}&nbsp;&nbsp;&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.lastname + ' ' + element.firstname + ' ' + element.patronymic}&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.iin}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', width:'20%' }}>{element.dep}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.workstatus}</td>
            <td id="table-divider"><button onClick={() => redirect(element.lastname,element.firstname,element.patronymic,element.iin,element.icnumber,element.living_adress,element.registration_adress,element.phone,element.dep,element.academic,element.workstatus)}>Титульный лист</button></td>
        </tr>
    );
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

    const redirect = (lastname,firstname,patronymic,iin,icnumber,living_adress,registration_adress,phone,dep,academic,workstatus) => {
        const constructor = `\{"lastname": "${lastname}","firstname": "${firstname}","patronymic": "${patronymic}","iin": "${iin}","icnumber": "${icnumber}","living_adress": "${living_adress}","registration_adress": "${registration_adress}","phone": "${phone}","dep": "${dep}","academic": "${academic}","workstatus": "${workstatus}"\}`;
        localStorage.setItem('employeeData', constructor);
        navigate(`/titleemployee`);
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'hradmin') {
                    return <div style={{ textAlign: 'left', width: '1200px', marginTop: '10%' }}>
                        <KPINavbar />
                        <br /><br /><br /><br />
                        <h2>Список сотрудников</h2>
                        <h4>({employees.length} сотрудников)</h4> 
                        {/* <Link to={"/dormrequests"}><button className='graybutton'>Заявки на общежитие</button></Link> <br /><br /> */}
                        <br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ИИН<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Подразделение / кафедра<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Статус<br />&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                            {employeeList}
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                        </table>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(HREmployeeList)