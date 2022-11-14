import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import About from "../../components/About";
import BrandBg from "../../components/BrandBg";
import ImgBlock from "../../components/ImgBlock";
import Preloader from '../../common/Preloader';

import {getPage} from '../../functions/data';

const TemplatePage = () => {
    const auth = useSelector(state => state.auth);
    const [pageData, setPageData] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const {url} = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!auth.loadAuth){
            if(auth.isAuth){
                setLoading(true);
                const res = getPage(auth.accessToken, url);
                res.then(data => setPageData(data.data)).finally(() => setLoading(false));
            }
            else{
                navigate("/");
            }
        }
    }, [auth, url]);

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