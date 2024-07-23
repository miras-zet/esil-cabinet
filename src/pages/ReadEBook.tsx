import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const ReadEBook: FC = () => {
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);

    //const navigate = useNavigate();
    let fileUrl = localStorage.getItem('pdfURL');
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
                    <button onClick={()=>pageNumber>1?setPageNumber(pageNumber-1):setPageNumber(1)}>Назад</button>&nbsp;<button onClick={()=>pageNumber<numPages?setPageNumber(pageNumber+1):setPageNumber(numPages)}>Вперед</button>
                    <p>
                        Страница {pageNumber} из {numPages}
                    </p>
                    <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    
                </div>

            })()}

        </div>
    );
}

export default observer(ReadEBook)