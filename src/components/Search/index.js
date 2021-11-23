import React, { useState } from 'react';
import dateFormat from "dateformat";
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

    const generate = async () => {
        try{
        props.setCannotSeat(false);
        const date = props.startDate;
        const dateT = dateFormat(date, "yyyy-mm-dd H:MM:ss")
        const response = await fetch('/api/search',{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({dateTime: dateT})
        });
        const jsonResponse = await response.json();
        //console.log(jsonResponse)
        var jsonData = []
        var validSeating = false
        var n = 0
        for(var index = 0; index < jsonResponse.length; ++index){
          if(jsonResponse[index].max_size >= numPeople){
            validSeating = true
            jsonData[n] = jsonResponse[index]
            n++
          }
        }
    
        jsonResponse.sort(function(a,b){
          return a.max_size > b.max_size ? 1 : -1
        })

        var combination = []
        var remaining = numPeople;
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
    
            if(remaining >= jsonResponse[i].max_size || remaining+1 >= jsonResponse[i].max_size){
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
    

        props.setData(jsonData);
        props.setShowMessage(true);

        }
        catch(err){
          console.log(err.message);
        }
        
      };

    const toggleButtonState = async () => {
        try{
          generate()
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
            dateFormat="MMMM d, yyyy h:mm aa"/>
            <Form>
            <NumericInp format={myFormat} min={1} value={numPeople} onChange={value => {setNumPeople(value); generate()}}/>
            </Form>
            <Button onClick={toggleButtonState}> Find Table </Button>
        </FuncWrapper>
    </Wrapper>
    </>
    );
    
}

