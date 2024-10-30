import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import '../PDF.css';
import config from "../http/config.json";
import { API_URL } from '../http';

export const path = config.eBookPath;

const ReadEBook: FC = () => {
    //const [numPages, setNumPages] = useState<number>(1);
    //const [pageNumber, setPageNumber] = useState<number>(1);

    //const navigate = useNavigate();
    //let fileUrl = path + localStorage.getItem('pdfURL');
    //fileUrl = 'http://10.0.1.22/CSP/euniversity/img/eLibraryBooks/Qatarlar.Eselik%20intervaldar.%20Oris%20teoriasinin%20elementterie.pdf';
    //fileUrl = 'http://arxiv.org/pdf/2407.15633';
    useEffect(() => {
        const handleContextmenu = e => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }
    }, [])
    // function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    //     setNumPages(numPages);
    // }
    // const return = () => {
    //     
    //     navigate(`/ebooks`);
    // }
    return (
        <div>
            {(() => {
                return <div style={{width:'100%', height:'100%'}}>
                     {/* <button className='backbutton' onClick={() => pageNumber > 1 ? setPageNumber(pageNumber - 1) : setPageNumber(1)}>Пред. страница</button>&nbsp;<button className='backbutton' onClick={() => pageNumber < numPages ? setPageNumber(pageNumber + 1) : setPageNumber(numPages)}>След. страница</button> 
                    <p>
                        Страница {pageNumber} из {numPages}
                    </p>  */}
                    {/* <Document file={'http://10.0.1.22/CSP/euniversity/img/eLibraryBooks/'+localStorage.getItem('pdfURL')} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document> */}
                    {/* <div style={{position:'absolute', width:'98.5%', height:'100%', zIndex:2, backgroundColor:'rgba(0,0,0,0)'}}></div>
                    <embed style={{height: '100%', width: '99%'}} id="pdfframe" onContextMenu={(e) => e.preventDefault()}
                        src={'http://10.0.1.22/CSP/euniversity/img/eLibraryBooks/'+localStorage.getItem('pdfURL') + "#toolbar=0"} 
                    /> */}
                     <iframe 
    src={API_URL+'/view/'+localStorage.getItem('pdfURL')} 
    style={{border: "none", width:'100%', height:'105%',position:'absolute', top:-40,left:0}}>
  </iframe>
                </div>

            })()}

        </div>
    );
}

export default observer(ReadEBook)