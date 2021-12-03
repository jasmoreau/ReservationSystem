import {React, useState}  from 'react';
import { Tables } from '../components/Tables';
import { LoggedInBar } from '../components/LoggedInBar'

export const TablesPage = (props) => {
  return (
    <div>
      <LoggedInBar/>
      <Tables></Tables>
    </div>
  );
  
}