import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import '../pages/Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import moment from 'moment';
import { FaDownload } from 'react-icons/fa';

const TechAct: FC = () => {
    const { store } = useContext(Context);
    // const [info, setInfo] = useState<number>(0);
    // const [message, setMessage] = useState<string>("");
    //const [messagecolor, setMessageColor] = useState<string>("red");
    // const [user, setUser] = useState([]);  
    //const {modal, open} = useContext(ModalContext); 


    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        // if (user) {
        //   setUser(user);
        // }
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [])

    // useEffect(()=>{
    //   setModal(modals)
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
    // const create = () => {
    //     if (info+'' == '0' && info+'' == '') setMessage("Введите количество");
    //     else {
    //         localStorage.setItem('techAmountInfo',info+'');
    //         window.location.href = window.location.protocol + '//' + window.location.host + '/techSpecifyDocument';
    //         return;
    //     }
    // };

    // const constructed = () =>{
    //     let val = [];
    //     for(let i=1; i<=elementcount; i++){
    //         val.push(<div key={i} style={{backgroundColor:'#f2f0f0', padding:'25px 70px 25px 25px', borderRadius:'20px', marginBottom:'30px'}}>
    //         <b>Предмет {i}</b><br/><br/>
    //         Наименование оборудования:<br/>
    //         <input type='text' className='btn' id={i+'elementName'} style={{color:'black', backgroundColor:'lightgray', width:'100%'}}></input><br/>
    //         Инвентарный номер:<br/>
    //         <input type='text' className='btn' id={i+'elementInventoryNumber'} style={{color:'black', backgroundColor:'lightgray', width:'35%'}}></input><br/>
    //         Зав. номер:<br/>
    //         <input type='text' className='btn' id={i+'elementSerialNumber'} style={{color:'black', backgroundColor:'lightgray', width:'35%'}}></input><br/>
    //         Количество:<br/>
    //         <input type='text' className='btn' id={i+'elementCount'} style={{color:'black', backgroundColor:'lightgray', width:'35%'}}></input><br/>
    //         Год выпуска:<br/>
    //         <input type='text' className='btn' id={i+'elementYear'} style={{color:'black', backgroundColor:'lightgray', width:'21%'}}></input><br/>
    //         Техническое состояние:<br/>
    //         <input type='text' className='btn' id={i+'elementState'} style={{color:'black', backgroundColor:'lightgray', width:'21%'}}></input><br/><br/>
    //         </div>);
    //     }
        
    //     return val;
    // }
    // const processContinue = () =>{

    //     let arr = []
    //     for(let i=1; i<=elementcount; i++){
    //         let inputName = (document.getElementById(i+'elementName') as HTMLInputElement).value;
    //         let inputInventoryNumber = (document.getElementById(i+'elementInventoryNumber') as HTMLInputElement).value;
    //         let inputSerialNumber = (document.getElementById(i+'elementSerialNumber') as HTMLInputElement).value;
    //         let inputCount = (document.getElementById(i+'elementCount') as HTMLInputElement).value;
    //         let inputYear = (document.getElementById(i+'elementYear') as HTMLInputElement).value;
    //         let inputState = (document.getElementById(i+'elementState') as HTMLInputElement).value;

    //         arr.push({'id':inputName},{'inventorynumber':inputInventoryNumber},{'serialnumber':inputSerialNumber},{'count':inputCount},{'year':inputYear},{'state':inputState});
    //     }
    //     localStorage.setItem('techpageitemsJSON',JSON.stringify(arr));
    //     alert(localStorage.getItem('techpageitemsJSON'));
    //     window.location.href = window.location.protocol + '//' + window.location.host + '/techActDocument';
    // }
    
    const generatePdf = () => {
        const report = document.getElementById('act');
        var opt = {
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 3 },
          filename: `Акт_передачи_${localStorage.getItem('receiverName')}_${moment(Date.now()).format('DD.MM.YYYY')}.pdf`,
          jsPDF: { orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        html2pdf().set(opt).from(report).save()
    };
    /*arr.push({
        'name':inputName,
        'inventorynumber':inputInventoryNumber,
        'serialnumber':inputSerialNumber,
        'count':inputCount,
        'year':inputYear,
        'state':inputState});
        */
    const actData = JSON.parse(localStorage.getItem('techpageitemsJSON'));
    const tableContent = actData.map((element, index) => {
        return <tr id="actTr">
          <td style={{width:'5%'}} id='actTd'>{index+1}</td>
          <td id='actTd'>{element.name}</td>
          <td id='actTd'>{element.inventorynumber}</td>
          <td id='actTd'>{element.serialnumber}</td>
          <td style={{width:'5%'}} id='actTd'>{element.count}</td>
          <td style={{width:'6%'}} id='actTd'>{element.year}</td>
          <td id='actTd'>{element.state}</td>
        </tr>;
      }
      ); 
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'technician') {
                    return <div>
                        
                        <div id='documentNavbar'><Link to="/technewdocument"><button id="documentNavbarButton">Назад</button></Link> &nbsp;
                        <button id="documentNavbarButton" onClick={generatePdf}>Скачать&nbsp;&nbsp;<FaDownload /></button></div>
                        <div id='act'>
                            <div id='actpadding'>
                                <br/><br/><br/><br/>
                                <div style={{textAlign:'center'}}>Акт №____<br/>
                                От {moment(Date.now()).format('DD.MM.YYYY')} г.<br/>
                                передачи основных средств из ЦИТ в подразделения университета:<br/>
                                </div><br/><br/><br/><br/>
                                <table id="actTable" style={{border:'solid 0.5px', width:'83%', marginLeft:'10%'}}>
                                    <tr id="actTr">
                                        <th style={{width:'5%'}} id='actTd'>№</th>
                                        <th id='actTd'>Наименование оборудования</th>
                                        <th id='actTd'>Ин. номер</th>
                                        <th id='actTd'>Зав. номер</th>
                                        <th style={{width:'5%'}} id='actTd'>Кол-во</th>
                                        <th style={{width:'6%'}} id='actTd'>Год выпуска</th>
                                        <th id='actTd'>Техническое состояние</th>
                                    </tr>
                                    {tableContent}
                                </table>
                                <br/><br/><br/>
                                <div style={{marginLeft:'13%'}}>Передал: ______________ директор ЦИТ Акпаров Ж.А.<br/><br/>
                                Принял: <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u> {localStorage.getItem('receiverName')}<br/><br/>
                                Через: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;______________ Главный специалист ОТОиР Жаншарипов А.Ж.
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
    
}

export default observer(TechAct)

