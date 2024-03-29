import { FC } from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import { observer } from 'mobx-react-lite'
import HomePage from './pages/HomePage'
import CertificatePage from './pages/CertificatePage'
import QrPage from './pages/QrPage'
import CertificateListPage from './pages/CertificateListPage'
import CertificateLinkPage from './pages/CertificateLinkPage'
import KPIPage from './pages/KPIPage'
import KPIUpload from './pages/KPIUpload'
import KPIAdminPage from './pages/KPIAdminPage'
import KPIAdminViewUser from './pages/KPIAdminViewUser'
import KPIStats from './pages/KPIStats'
import KPITopTen from './pages/KPITopTen'
import { AnketaRu } from './pages/tamplate/AnketaRu'

  

const App:FC = () => {  
//   const {store} = useContext(Context);    
//   const [user, setUser] = useState([]);
//   const {modal, open, close} = useContext(ModalContext)


//  useEffect(() => {
//     if (localStorage.getItem('token')){
//       store.checkAuth()
//     }
//   },[])


  

//   if (store.isLoading){
//     return <div>Loading ...</div>
//   }

 
//   if (!store.isAuth) {
//     return (
//         <div>
//             <LoginForm/>            
//         </div>
//     );
//   } 

  return (
    <>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/test" element={<AnketaRu />}/>
        <Route path="/kpi" element={ <KPIPage /> } />
        <Route path="/kpiupload" element={ <KPIUpload /> } />
        <Route path="/kpiadmin" element={<KPIAdminPage />} />
        <Route path="/kpiadminview" element={<KPIAdminViewUser/>} />
        <Route path="/kpistats" element={<KPIStats/>} />
        <Route path="/kpitopten" element={<KPITopTen/>} />
        <Route path="/certificate" element={ <CertificatePage /> } />
        <Route path="/list" element={ <CertificateListPage /> } />
        <Route path="/list/certificate/:id" element={ <CertificateLinkPage /> } />
        <Route path="/certificate/student/:id" element={ <QrPage /> } />
      </Routes>
         
    </>
  );
}

export default observer(App)