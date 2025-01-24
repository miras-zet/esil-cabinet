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
import { AnketaRu } from './pages/template/AnketaRu'
import { InventoryReceiptRu } from './pages/template/InventoryReceiptRu'
import EBooks from './pages/EBooks'
import ApplicantList from './pages/ApplicantList'
import AddApplicant from './pages/AddApplicant'
import { AnketaKz } from './pages/template/AnketaKz'
import { InventoryReceiptKz } from './pages/template/InventoryReceiptKz'
import { ContractRu } from './pages/template/ContractRu'
import { ContractKz } from './pages/template/ContractKz'
import TechAddNewDocument from './pages/TechAddNewDocument'
import TechDueDocuments from './pages/TechDueDocuments'
//import AdmissionStats from './pages/AdmissionStats'
import { TitleRu } from './pages/template/TitleRu'
import { TitleKz } from './pages/template/TitleKz'
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
import DormList from './pages/DormList'
import TransferBookJSON from './pages/TransferBookJSON'
import NotificationsList from './pages/NotificationsList'
import PictureUpload from './pages/PictureUpload'
import PhysicalBooksPagesCatalogue from './pages/PhysicalBooksPagesCatalogue'
import PhotoAdminPage from './pages/PhotoAdminPage'
import PhysicalBooksSearchCatalogue from './pages/PhysicalBooksSearchCatalogue'
import HREmployeeList from './pages/HREmployeeList'
import { TitleEmployeeRu } from './pages/template/TitleEmployeeRu'
import AddNewUser from './pages/AddNewUser'
import EBooksSearch from './pages/EBooksSearch'
import AddEBook from './pages/AddEBook'
import ScanPage from './pages/ScanPage'
import StudentInfo from './pages/StudentInfo'
import CafedraManagement from './pages/CafedraManagement'
import TutorBonusPage from './pages/TutorBonusPage'
import TutorBonusPageSelf from './pages/TutorBonusPageSelf'
import EditEBook from './pages/EditEBook'
import AttendanceRecordStudent from './pages/AttendanceRecordStudent'
import TutorDataExport from './pages/TutorDataExport'
import TutorPenalty from './pages/TutorPenalty'
import TutorCSEI from './pages/TutorCSEI'
import FacultyManagement from './pages/FacultyManagement'

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
        <Route path="/notifications" element={ <NotificationsList/>} />
        <Route path="/scan/:id" element={ <ScanPage /> } />
        <Route path="/studentinfo" element={ <StudentInfo /> } />
        <Route path="/attendance" element={ <AttendanceRecordStudent/>} />

        <Route path="/accounting" element={ <TutorDataExport/>} />
        <Route path="/cseipage" element={ <TutorCSEI/>} />
        <Route path="/tutorpenalty" element={ <TutorPenalty/>} />

        <Route path="/applicants" element={<ApplicantList />}/>
        <Route path="/dormrequests" element={<DormList />}/>
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
        <Route path="/photoadminpage" element={<PhotoAdminPage/>}/>
        <Route path="/addUser" element={<AddNewUser/>}/>

        {/* <Route path="/physicalbooks" element={<PhysicalBooks/>}/> */}
        <Route path="/ebooks" element={<EBooks />}/>
        <Route path="/ebooksfilter" element={<EBooksSearch />}/>
        <Route path="/readPDF" element={<ReadEBook />}/>
        <Route path="/physicalbooksPages" element={<PhysicalBooksPages/>}/>
        <Route path="/bookrepo" element={<PhysicalBooksPagesCatalogue/>}/>
        <Route path="/bookcataloguefilter" element={<PhysicalBooksSearchCatalogue/>}/>
        <Route path="/searchbook" element={<PhysicalBooksSearch/>}/>
        <Route path="/addlibrarybook" element={<AddLibraryBook/>}/>
        <Route path="/addebook" element={<AddEBook/>}/>
        <Route path="/editlibrarybook" element={<EditLibraryBook/>}/>
        <Route path="/editebook" element={<EditEBook/>}/>
        <Route path="/transferlibrarybook" element={<TransferBook/>}/>
        <Route path="/transferlibrarybookJSON" element={<TransferBookJSON/>}/>
        <Route path="/duebooks" element={<DueBooks/>}/>

        <Route path="/employeelist" element={<HREmployeeList/>}/>
        <Route path="/titleemployee" element={<TitleEmployeeRu/>}/>
        
        <Route path="/kpi" element={ <KPIPage /> } />
        <Route path="/kpiupload" element={ <KPIUpload /> } />
        <Route path="/kpiadmin" element={<KPIAdminPage />} />
        <Route path="/kpiadminview" element={<KPIAdminViewUser/>} />
        <Route path="/kpistats" element={<KPIStats/>} />
        <Route path="/kpitopten" element={<KPITopTen/>} />

        <Route path="/cafedramanagement" element={<CafedraManagement/>} />
        <Route path="/facultymanagement" element={<FacultyManagement/>} />
        <Route path="/tutorpage" element={<TutorBonusPage/>} />
        <Route path="/ktu" element={<TutorBonusPageSelf/>} />

        <Route path="/takephoto" element={ <PictureUpload /> } />
        <Route path="/certificate" element={ <CertificatePage /> } />
        <Route path="/list" element={ <CertificateListPage /> } />
        <Route path="/list/certificate/:id" element={ <CertificateLinkPage /> } />
        <Route path="/certificate/student/:id" element={ <QrPage /> } />
      </Routes>
         
    </>
  );
}

export default observer(App)