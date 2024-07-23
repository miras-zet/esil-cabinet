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
import { InventoryReceiptRu } from './pages/tamplate/InventoryReceiptRu'
import EBooks from './pages/EBooks'
import ApplicantList from './pages/ApplicantList'
import AddApplicant from './pages/AddApplicant'
import { AnketaKz } from './pages/tamplate/AnketaKz'
import { InventoryReceiptKz } from './pages/tamplate/InventoryReceiptKz'
import { ContractRu } from './pages/tamplate/ContractRu'
import { ContractKz } from './pages/tamplate/ContractKz'
import TechAddNewDocument from './pages/TechAddNewDocument'
import TechDueDocuments from './pages/TechDueDocuments'
//import AdmissionStats from './pages/AdmissionStats'
import { TitleRu } from './pages/tamplate/TitleRu'
import { TitleKz } from './pages/tamplate/TitleKz'
import TechPageConstructor from './pages/TechPageConstructor'
import TechAct from './pages/TechAct'
import AdmissionStatsUpdated from './pages/AdmissionStatsUpdated'
import AdmissionStatsMain from './pages/AdmissionStatsMain'
//import PhysicalBooks from './pages/[unused]PhysicalBooks'
import AddLibraryBook from './pages/AddLibraryBook'
import DueBooks from './pages/DueBooks'
import EditLibraryBook from './pages/EditLibraryBook'
import TransferBook from './pages/TransferBook'
import PhysicalBooksPages from './pages/PhysicalBooksPages'
import PhysicalBooksSearch from './pages/PhysicalBooksSearch'
import ReadEBook from './pages/ReadEBook'
  

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

        

        <Route path="/applicants" element={<ApplicantList />}/>
        <Route path="/addapplicant" element={<AddApplicant/>}/>
        {/* <Route path="/statistics_specialization" element={<AdmissionStats/>}/> */}
        <Route path="/statistics_weekly" element={<AdmissionStatsUpdated/>}/>
        <Route path="/statistics_main" element={<AdmissionStatsMain/>}/>

        <Route path="/applicationRu" element={<AnketaRu />}/>
        <Route path="/applicationKz" element={<AnketaKz />}/>
        <Route path="/inventoryRu" element={<InventoryReceiptRu />}/>
        <Route path="/inventoryKz" element={<InventoryReceiptKz />}/>
        <Route path="/contractRu" element={<ContractRu/>}/>
        <Route path="/contractKz" element={<ContractKz/>}/>
        <Route path="/titleRu" element={<TitleRu/>}/>
        <Route path="/titleKz" element={<TitleKz/>}/>
        
        <Route path="/techNewDocument" element={<TechAddNewDocument/>}/>
        <Route path="/techDueDocuments" element={<TechDueDocuments/>}/>
        <Route path="/techOldDocuments" element={<TechDueDocuments/>}/>
        <Route path="/techSpecifyDocument" element={<TechPageConstructor/>}/>
        <Route path="/techActDocument" element={<TechAct/>}/>

        {/* <Route path="/physicalbooks" element={<PhysicalBooks/>}/> */}
        <Route path="/ebooks" element={<EBooks />}/>
        <Route path="/readPDF" element={<ReadEBook />}/>
        <Route path="/physicalbooksPages" element={<PhysicalBooksPages/>}/>
        <Route path="/searchbook" element={<PhysicalBooksSearch/>}/>
        <Route path="/addlibrarybook" element={<AddLibraryBook/>}/>
        <Route path="/editlibrarybook" element={<EditLibraryBook/>}/>
        <Route path="/transferlibrarybook" element={<TransferBook/>}/>
        <Route path="/duebooks" element={<DueBooks/>}/>

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