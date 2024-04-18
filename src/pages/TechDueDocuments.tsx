import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate} from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';

const TechDueDocuments:FC = () => {  
  const {store} = useContext(Context);  
  // const [user, setUser] = useState([]);  
  //const {modal, open} = useContext(ModalContext); 
  

 useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('data'));
    // if (user) {
    //   setUser(user);
    // }
    if (localStorage.getItem('token')){
      store.checkAuth()
    }    
     
  },[])

// useEffect(()=>{
//   setModal(modals)
// },[])
  

  if (store.isLoading){
    return <div>Loading ...</div>
  }

 
  if (!store.isAuth) {
    return (
        <div>
            <LoginForm/>            
        </div>
    );
  } 
//   function redirect(id:string)  {
//     localStorage.setItem('categoryid',id);
//     window.location.href=window.location.protocol + '//' + window.location.host +'/kpiupload';
//     return;
//   }
  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
        if(role=='technician') {
          return <div>
              <KPINavbar/>  
              <br/><br/>
              <div className=''>
                <h3>Активные представления</h3>
                <br/>
                <Link to={"/"}><button style={{backgroundColor:'silver'}}><TiArrowBack style={{verticalAlign:'middle'}}/> Вернуться назад</button></Link> 
              </div>
        </div>
        }
        else{
          return <Navigate to="/"/>
        }
      } )()}

    </div>
  );
}

export default observer(TechDueDocuments)