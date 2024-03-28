import React, {useEffect} from "react";
import Background from "../components/backgroundComponent";

import titlePageImg from "../assets/backgrounds/title_page.PNG"
import StartButton from '../components/startComponent';

function TitlePage() {

    return (
        <div>  
            <StartButton></StartButton>
            <img className='title-bg' width={window.innerWidth} src={titlePageImg}></img>
        </div>

    )
}

export default TitlePage;