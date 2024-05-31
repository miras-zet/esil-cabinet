import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';

const TechPageConstructor: FC = () => {
    const { store } = useContext(Context);
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
    let elementcount;
    try{
        elementcount = parseInt(localStorage.getItem('techAmountInfo'));
    }
    catch{
        elementcount = 0;
    }
    
    const constructed = () =>{
        let val = [];
        for(let i=1; i<=elementcount; i++){
            val.push(<div key={i} style={{backgroundColor:'#f2f0f0', padding:'25px 70px 25px 25px', borderRadius:'20px', marginBottom:'30px'}}>
            <b>Предмет {i}</b><br/><br/>
            Наименование оборудования:<br/>
            <input type='text' className='btn' id={i+'elementName'} style={{color:'black', backgroundColor:'lightgray', width:'100%'}}></input><br/>
            Инвентарный номер:<br/>
            <input type='text' className='btn' id={i+'elementInventoryNumber'} style={{color:'black', backgroundColor:'lightgray', width:'35%'}}></input><br/>
            Зав. номер:<br/>
            <input type='text' className='btn' id={i+'elementSerialNumber'} style={{color:'black', backgroundColor:'lightgray', width:'35%'}}></input><br/>
            Количество:<br/>
            <input type='text' className='btn' id={i+'elementCount'} style={{color:'black', backgroundColor:'lightgray', width:'35%'}}></input><br/>
            Год выпуска:<br/>
            <input type='text' className='btn' id={i+'elementYear'} style={{color:'black', backgroundColor:'lightgray', width:'21%'}}></input><br/>
            Техническое состояние:<br/>
            <input type='text' className='btn' id={i+'elementState'} style={{color:'black', backgroundColor:'lightgray', width:'21%'}}></input><br/><br/>
            </div>);
        }
        
        return val;
    }
    const processContinue = () =>{

        let arr = []
        for(let i=1; i<=elementcount; i++){
            let inputName = (document.getElementById(i+'elementName') as HTMLInputElement).value;
            let inputInventoryNumber = (document.getElementById(i+'elementInventoryNumber') as HTMLInputElement).value;
            let inputSerialNumber = (document.getElementById(i+'elementSerialNumber') as HTMLInputElement).value;
            let inputCount = (document.getElementById(i+'elementCount') as HTMLInputElement).value;
            let inputYear = (document.getElementById(i+'elementYear') as HTMLInputElement).value;
            let inputState = (document.getElementById(i+'elementState') as HTMLInputElement).value;

            arr.push({'name':inputName,'inventorynumber':inputInventoryNumber,'serialnumber':inputSerialNumber,'count':inputCount,'year':inputYear,'state':inputState});
        }
        localStorage.setItem('techpageitemsJSON',JSON.stringify(arr));
        window.location.href = window.location.protocol + '//' + window.location.host + '/techActDocument';
    }
    
    
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'technician') {
                    return <div>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br /><br />
                        <div className=''>
                        <Link to={"/technewdocument"}><button style={{ backgroundColor: 'silver', color: 'black' }}><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link><br/><br /><br /><br /> 
                            <h3>Конструктор акта выдачи</h3>
                            <br />
                            <div>{elementcount==0 ? <div>Введите правильное количество предметов</div>:<div></div>}</div>
                            <div style={{textAlign:'left', width:'400px'}}>{constructed()}</div>
                            <br/><button className='navbarbutton' onClick={processContinue}>Далее</button><br/><br /><br /><br />     
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

export default observer(TechPageConstructor)