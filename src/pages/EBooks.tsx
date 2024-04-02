import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link} from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import { MdOutlinePostAdd } from "react-icons/md";

const EBooks:FC = () => {  
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
  // function redirect(id:string)  {
  //   localStorage.setItem('categoryid',id);
  //   window.location.href=window.location.protocol + '//' + window.location.host +'/kpiupload';
  //   return;
  // }
  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
        if(role=='reader'||role=='librarian') {
          return <div style={{textAlign:'left', width:'1200px'}}>
              <KPINavbar/>  
              <br/><br/>
              <Link to={"/"}><button style={{backgroundColor:'silver'}}><TiArrowBack style={{verticalAlign:'middle', marginTop:'-4px'}}/> Вернуться назад</button></Link> <br/><br/>
              {localStorage.getItem('role')=='librarian'? <div><Link to={"/"}><button className='navbarbutton'>Добавить новую книгу &nbsp;<MdOutlinePostAdd style={{verticalAlign:'middle', marginTop:'-5px', fontSize:'15pt'}}/></button></Link> </div>:''}
        </div>
        }
        else{
          return <div><button onClick={() => store.logout()}>Назад</button>  
          <h4>Нет доступа к странице</h4></div>
        }
      } )()}

    </div>
  );
}

export default observer(EBooks)