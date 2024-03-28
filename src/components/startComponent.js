import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import playButton from '../assets/buttons/play-button.png'
import titlePageImg from "../assets/backgrounds/title_page.PNG"

import SoundToggle from './soundToggleComponent';
import Background from './backgroundComponent';

import { useSounds } from '../soundManager';


function StartButton() {
  const {sounds} = useSounds();
    
  const mainMenuSound = sounds[0];

  const [playing, setPlaying] = useState(false);

  // useEffect(() => {
  //     if (playing) {
  //         sessionStorage.setItem('music', 'true');
  //         sessionStorage.setItem('current_sound', 'main menu');
  //         mainMenuSound.load();
  //         mainMenuSound.play();
  //         mainMenuSound.loop = true;
  //     } else {
  //         sessionStorage.setItem('music', 'false');
  //         mainMenuSound.pause();
  //     }
  // }, [mainMenuSound, playing]);


  let navigate = useNavigate(); 
  const routeChange = () =>{  
    setPlaying(!playing);
    navigate(`start`);
  }

  const html = 
  <div>
    <div className='start'>
        <button className='start-button' onClick={routeChange}>
          <img src={playButton} className='play-button-img'></img>
        </button>
    </div>    
  </div>

  return html;
}

export default StartButton;