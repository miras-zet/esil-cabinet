import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Document, Page, pdfjs } from "react-pdf";
import '../App.css';
import config from "../http/config.json";

export const path = config.eBookPath;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

const ReadEBook: FC = () => {
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);

    //const navigate = useNavigate();
    //let fileUrl = path + localStorage.getItem('pdfURL');
    //fileUrl = 'http://10.0.1.22/CSP/euniversity/img/eLibraryBooks/Qatarlar.Eselik%20intervaldar.%20Oris%20teoriasinin%20elementterie.pdf';
    //fileUrl = 'http://arxiv.org/pdf/2407.15633';
    useEffect(() => {

    }, [])
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }
    // const return = () => {
    //     
    //     navigate(`/ebooks`);
    // }
    return (
        <div>
            {(() => {
                return <div>
                     <button onClick={() => pageNumber > 1 ? setPageNumber(pageNumber - 1) : setPageNumber(1)}>Пред. страница</button>&nbsp;<button onClick={() => pageNumber < numPages ? setPageNumber(pageNumber + 1) : setPageNumber(numPages)}>След. страница</button> 
                    <p>
                        Страница {pageNumber} из {numPages}
                    </p> 
                    <Document file={'http://10.0.1.22/CSP/euniversity/img/eLibraryBooks/'+localStorage.getItem('pdfURL')} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    {/* <iframe onContextMenu={(e) => e.preventDefault()}
                        src={'http://10.0.1.22/CSP/euniversity/img/eLibraryBooks/Qatarlar.Eselik%20intervaldar.%20Oris%20teoriasinin%20elementterie.pdf' + "#toolbar=0"}
                        height={650}
                        width={1300}
                    /> */}
                </div>

            })()}

        </div>
    );
}

export default observer(ReadEBook)