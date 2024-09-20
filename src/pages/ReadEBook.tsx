import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import { EmbedPDF } from "@simplepdf/react-embed-pdf";
import config from "../http/config.json";

export const path = config.eBookPath;


const ReadEBook: FC = () => {
    //const [numPages, setNumPages] = useState<number>(1);
    //const [pageNumber, setPageNumber] = useState<number>(1);

    //const navigate = useNavigate();
    let fileUrl = path + 'eLibraryBooks/' + localStorage.getItem('pdfURL');
    //fileUrl = 'http://10.0.1.22/CSP/euniversity/img/eLibraryBooks/Qatarlar.Eselik%20intervaldar.%20Oris%20teoriasinin%20elementterie.pdf';
    //fileUrl = 'http://arxiv.org/pdf/2407.15633';
    useEffect(() => {

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
                return <div>
                    {/* <button onClick={() => pageNumber > 1 ? setPageNumber(pageNumber - 1) : setPageNumber(1)}>Пред. страница</button>&nbsp;<button onClick={() => pageNumber < numPages ? setPageNumber(pageNumber + 1) : setPageNumber(numPages)}>След. страница</button> */}
                    {/* <p>
                        Страница {pageNumber} из {numPages}
                    </p> */}
                    <EmbedPDF
                        mode="inline"
                        style={{ width: 900, height: 800 }}
                        documentURL={fileUrl}
                    />
                </div>

            })()}

        </div>
    );
}

export default observer(ReadEBook)