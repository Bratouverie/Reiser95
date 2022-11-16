import React from 'react';
import { useParams } from 'react-router-dom';

import About from "../../components/About";
import BrandBg from "../../components/BrandBg";
import ImgBlock from "../../components/ImgBlock";
import Preloader from '../../common/Preloader';

import {getPage} from '../../functions/data';

const TemplatePage = () => {
    const [pageData, setPageData] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const {url} = useParams();

    React.useEffect(() => {
        setLoading(true);
        const pageInfo = getPage(url);
        pageInfo.then(data => setPageData(data.data)).finally(() => setLoading(false));
    }, [url]);

    if(loading){
        return <Preloader />
    }

    return(
        <>
            <BrandBg src={pageData.banner} />

            <About title={pageData.title_1} text={pageData.description} />

            <ImgBlock title={pageData.title_2} data={[]} />
        </>
    )
}

export default TemplatePage;