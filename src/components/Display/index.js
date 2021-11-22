import React, {Component} from 'react';
import { BasicTable } from './BasicTable';

export default class Display extends Component{
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

    render(){
        return(
        <>
        <div>
            {this.props.state.cannotSeat && <p cannotSeat>We apologize, but we cannot seat you for this time!</p>}
            {this.props.state.showMessage && !this.props.state.cannotSeat && (<BasicTable data={this.props.state.data}></BasicTable>)}
        </div>
        </>
        )
    }
}
