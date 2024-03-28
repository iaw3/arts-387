import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSounds } from '../soundManager';

import startImage from '../assets/buttons/Menu-01.png'
import soundOnImage from '../assets/buttons/sound-on.png'
import soundOffImage from '../assets/buttons/sound-off.png'


function NameInputBox() {
    const {sounds} = useSounds();
    
    const mainMenuSound = sounds[0];
    const creditSound = sounds[1];

    const [playerName, setName] = useState('');
    const [warningMsg, setWarningMsg] = useState('');
    const [showWarning, setShowWarning] = useState(false)
    const [playing, setPlaying] = useState(true);

    const changeName = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        // pause the sound and load new sound
        if (playing) {
            mainMenuSound.pause();
            // creditSound.play();
            // creditSound.loop = true;
            // sessionStorage.setItem('current_sound', 'credits');
        }
        // sets error message in any weird cases lol
        event.preventDefault();
        if (playerName.trim().length === 0 && playerName.length !== 0 ) {
            console.log(playerName, playerName.trim.length, playerName.length)
            setWarningMsg('sorry, your name cant only be spaces.');
            setShowWarning(true);
            setName('');
            console.log(showWarning);
            return;
        }
        else if (playerName.length === 0) {
            setWarningMsg('please enter at least one character.');
            setShowWarning(true);
            setName('');
            console.log(showWarning);
            return;
        } else {
            routeChange();
        }
    }

    const clearWarning = () => {
        setShowWarning(false);
    }

    let navigate = useNavigate(); 
    // initalize all values
    const routeChange = () =>{  
      navigate(`/space`);
      let meter = [0, 0, 0, 0] // 0 = andy, 1 = pixie, 2 = gouda, 3 = WD
      sessionStorage.setItem('player_name', playerName)
      sessionStorage.setItem('meter', JSON.stringify(meter))
      sessionStorage.setItem('round', (0).toString());
    }

    // sound stuff

    console.log(playing);
    useEffect(() => {
        if (playing) {
            sessionStorage.setItem('music', 'true');
            sessionStorage.setItem('current_sound', 'main menu');
            mainMenuSound.play();
            mainMenuSound.loop = true;
        } else {
            sessionStorage.setItem('music', 'false');
            mainMenuSound.pause();
        }
    }, [mainMenuSound, playing]);

    function toggleSound() {
        setPlaying(!playing);
    }

    // when click ok, hide the whole form
    const html = 
    <div>
        {/* <button className='sound-button' onClick={toggleSound}>
            <img src={playing ? soundOnImage : soundOffImage} className='sound-button-img'></img>                
        </button>         */}
        <div className="input-name">
            <form className="input-name-form" onSubmit={handleSubmit}>
                <label className="input-label">
                    please enter a name:
                </label> 
                <div>
                    <input type="text" id="player-name" value={playerName} onChange={changeName} className="input-box"></input> 
                </div>
                <div>
                <input type="image" src={startImage} className='start-button-img'></input> 
                </div>
                <div className='form-group'>
                    {showWarning && 
                    <div className="no-name-warning">
                        <p>{warningMsg}</p>
                    </div>}                
                </div> 
                <p className="sound-warning">press enter to finish dialogue, and enter again to move on to the next line.</p>                     
                <p className="sound-warning">turn sound on for best playing experience.</p>
            </form>        
        </div>        
    </div>


    return html
}

export default NameInputBox;