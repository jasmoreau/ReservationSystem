import React, { useState } from 'react';
import dateFormat from "dateformat";
import Holidays from "date-holidays"
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import 'react-datepicker/dist/react-datepicker.css'
import {
    Wrapper, 
    Word,
    FuncWrapper,
    DatePick,
    Form,
    NumericInp,
    Button
} from './SearchElements';

export const Search = (props) => {

    const [numPeople, setNumPeople] = useState(1);

    const generate = async (value) => {
        try{
        props.setCannotSeat(false);
        
        const date = props.startDate;
        const dateT = dateFormat(date, "yyyy-mm-dd H:MM:ss")

        const hd = new Holidays('US')
        if(hd.isHoliday(props.startDate)){
          props.setHighTraffic(hd.isHoliday(props.startDate)[0].name)
        }
        else{
          if(date.getDay() == 0)
            props.setHighTraffic("Sunday")
          else if (date.getDay() == 6)
            props.setHighTraffic("Saturday")
          else
            props.setHighTraffic(false)
        }

        const response = await fetch('/api/search',{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({dateTime: dateT})
        });
        const jsonResponse = await response.json();
        //console.log(jsonResponse)
        var jsonData = []
        var validSeating = false
        var n = 0;
        
        for(var index = 0; index < jsonResponse.length; ++index){
          if(jsonResponse[index].max_size >= value){
            validSeating = true
            jsonData[n] = jsonResponse[index]
            n++
          }
        }
    
        jsonResponse.sort(function(a,b){
          return a.max_size > b.max_size ? 1 : -1
        })
        var combination = []
        var remaining = value;
        var new_max = 0;
        if(!validSeating){
          var combinationPossible = false
          console.log(jsonResponse)
          for(var i = jsonResponse.length - 1; i >= -1; i--){
            if(remaining <= 0){
              combinationPossible = true
              combination = combination.sort(function(a,b){
                return a > b ? 1 : -1
              })
              var combString = ""
              for(var x=0;x<combination.length;x++){
                if(x==combination.length-1) combString += combination[x]
                else combString += combination[x] + " + "
              }
              jsonData = [{id: combString,max_size: new_max}]
              break
            }
    
            if(i == -1) break
            
            if(i == 0 && jsonResponse[i].max_size >= remaining){
              combination.push(jsonResponse[i].id)
              remaining -= jsonResponse[i].max_size
              new_max += jsonResponse[i].max_size
            }
            else if(i != 0 && (remaining >= jsonResponse[i].max_size || remaining > jsonResponse[i-1].max_size)){
              combination.push(jsonResponse[i].id)
              remaining -= jsonResponse[i].max_size
              new_max += jsonResponse[i].max_size
            }
          }
          if(!combinationPossible){
            props.setCannotSeat(true)
            jsonData = []
          }
        }
    
        setNumPeople(value);
        props.setData(jsonData);
        props.setShowMessage(true);
        props.setDateT(dateT)

        }
        catch(err){
          console.log(err.message);
        }
        
      };

    const toggleButtonState = async () => {
        try{
          generate(numPeople)
        }
        catch(err){
          console.log(err.message);
        }
      };

    const myFormat = (num) => {
        return num + ' people';
    }

    return(
    <>
    <Wrapper>
        <Word>
            Reserve Table Here
        </Word>
        <FuncWrapper>
            <DatePick
            selected={props.startDate} 
            onChange={(date) => props.setStartDate(date)}
            showTimeSelect 
            dateFormat="MMMM d, yyyy h:mm aa"
            excludeTimes={[
              setHours(setMinutes(new Date(), 0), 0),
              setHours(setMinutes(new Date(), 30), 0),
              setHours(setMinutes(new Date(), 0), 1),
              setHours(setMinutes(new Date(), 30), 1),
              setHours(setMinutes(new Date(), 0), 2),
              setHours(setMinutes(new Date(), 30), 2),
              setHours(setMinutes(new Date(), 0), 3),
              setHours(setMinutes(new Date(), 30), 3),
              setHours(setMinutes(new Date(), 0), 4),
              setHours(setMinutes(new Date(), 30), 4),
              setHours(setMinutes(new Date(), 0), 5),
              setHours(setMinutes(new Date(), 30), 5),
              setHours(setMinutes(new Date(), 0), 6),
              setHours(setMinutes(new Date(), 30), 6),
              setHours(setMinutes(new Date(), 0), 7),
              setHours(setMinutes(new Date(), 30), 7),
              setHours(setMinutes(new Date(), 0), 8),
              setHours(setMinutes(new Date(), 30), 8),
              setHours(setMinutes(new Date(), 0), 9),
              setHours(setMinutes(new Date(), 30), 9),
              setHours(setMinutes(new Date(), 30), 23),
            ]}/>
            <Form>
            <NumericInp format={myFormat} min={1} value={numPeople} onChange={ async (value) => {await generate(value)}}/>
            </Form>
            <Button onClick={toggleButtonState}> Find Table </Button>
        </FuncWrapper>
    </Wrapper>
    </>
    );
    
}


