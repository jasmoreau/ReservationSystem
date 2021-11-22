import React, { Component, useState } from 'react';
import DatePicker from 'react-datepicker'
import NumericInput from 'react-numeric-input';
import dateFormat, { masks } from "dateformat";
import 'react-datepicker/dist/react-datepicker.css'

export default class Search extends Component {
    constructor(props){
        super(props); 
        this.state = { 
            showMessage: props.state.showMessage, 
            data: props.state.data,
            startDate: props.state.startDate,
            numPeople: props.state.numPeople,
            cannotSeat: props.state.cannotSeat
        }
    }

    toggleButtonState = async () => {
        try{
          this.generate()
        }
        catch(err){
          console.log(err.message);
        }
      };
    
    generate = async () => {
        try{
        this.props.cannotSeat(false);
        const date = this.state.startDate
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
          if(jsonResponse[index].max_size >= this.state.numPeople){
            validSeating = true
            jsonData[n] = jsonResponse[index]
            n++
          }
        }
    
        jsonResponse.sort(function(a,b){
          return a.max_size > b.max_size ? 1 : -1
        })

        var combination = []
        var remaining = this.state.numPeople;
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
            this.props.cannotSeat(true)
            jsonData = []
          }
        }
        console.log(jsonData)
    

        this.props.changeData(jsonData);
        this.props.showMessage(true);
        }
        catch(err){
          console.log(err.message);
        }
        
      };

      
    render(){
        return(
        <>
        <div>
            <DatePicker 
            selected={this.state.startDate} 
            onChange={this.state.handleChange}
            showTimeSelect 
            dateFormat="MMMM d, yyyy h:mm aa"/>
            <form>
            <label>Number of people:
                <NumericInput min={1} value={this.state.numPeople} onChange={value => {this.setState({numPeople: value}); this.generate()}}/>
            </label>
            </form>
            <button onClick={this.toggleButtonState}> Click me </button>
        </div>
        </>
        );
    }
}


