import * as React from 'react';
//import Graph from '../../components/TickerInfo/Graph/Graph';
import About from '../../components/TickerInfo/About/About';
import CompanyInfo from '../../components/TickerInfo/CompanyInfo/CompanyInfo';
import { useParams } from 'react-router-dom';

export default function TickerInfoPage(){

    const { ticker } = useParams();
    
    return(
        <div>
            <Header/>
            <Graph/>
            <About/>
            <CompanyInfo/>
        </div>
    )
}

