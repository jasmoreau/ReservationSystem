import React, {usestate} from 'react';
import { AboutMeBox } from '../components/AboutMe';
import { LoggedInBar } from '../components/LoggedInBar';

export const AboutMe = (props) => {

    return (
        <div>
        <LoggedInBar/>
        
        <AboutMeBox />
        </div>
    )
}