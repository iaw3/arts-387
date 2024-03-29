import React from "react";
import { useNavigate } from "react-router-dom";

import QuitComponent from "../components/quitComponent";
import Background from "../components/backgroundComponent";
import { useSounds } from "../soundManager";

import Webcam from "react-webcam";

import choiceImg from '../assets/backgrounds/choice.png'

function LocationPage() {  
    const {sounds} = useSounds();
    const soundOn = sessionStorage.getItem('music');
    if (soundOn === 'true') {
        sounds[1].play();
        sounds[1].loop = true;
        sessionStorage.setItem('current_sound', 'credits') ;
    }

    const round = sessionStorage.getItem('round');
    const parseRound = parseInt(round, 10);

    var locations = [
        'a healing place', 'a soft place', 'a chaotic place', 'an eternal place', 'random!'
    ]

    // change available locations based on the current round 
    if (parseRound >= 3) {
        // calculate all the points and list all available ones
        var final_locations = []
        // iterate through the meter and set the locations based on the threshold
        const meter_status = JSON.parse(sessionStorage.getItem('meter'));
        for (let i = 0; i < meter_status.length; i++) {
            console.log(meter_status[i])
            if (meter_status[i] > 9) {
                final_locations.push(locations[i])
            }
        }
        final_locations.push('an empty place');
        final_locations.push('random!')
        locations = final_locations
    }

    let navigate = useNavigate();     
    const clickOption = (place) => {
        // if the selected location is random randomly select one
        var selected_place = place;
        if (place === 'random!') {
            const random_idx = Math.floor(Math.random() * locations.length)
            selected_place = locations[random_idx]
        }
        // store the current location
        sessionStorage.setItem('location', selected_place);
        sessionStorage.setItem('round', (parseRound + 1).toString());

        sounds[1].pause();
        
        // route to the right url
        if (selected_place === 'a healing place') {
            navigate(`/a-healing-place`);            
        } else if (selected_place === 'a soft place') {
            navigate(`/a-soft-place`);  
        } else if (selected_place === 'a chaotic place') {
            navigate(`/a-chaotic-place`);  
        } else if (selected_place === 'an eternal place') {
            navigate(`/an-eternal-place`);  
        } else if (selected_place === 'an empty place') {
            navigate(`/an-empty-place`)
        }
    }

    const generateRandomColor = () => {
        var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        if (randomColor === '#000000') {
            randomColor = '#FFB6C1'
        }
        return randomColor;
    };

    const html = 
    <div>
        <Background backgroundImg={choiceImg}></Background>
        <QuitComponent></QuitComponent>
        <div className="choice-display-container">
            <p className="choice-display-label">choose a location to visit:</p>
            <div className="choice-display">
                    {locations.map((option, idx) => {
                        return (
                            <div className='individual-option' key={`option_${idx}`} style={{'backgroundColor': generateRandomColor()}} onClick={() => clickOption(option)}>
                                <p>{option}</p>
                            </div>
                            );
                        })}
                </div>  
        </div>        
    </div>

    return html
}

export default LocationPage;