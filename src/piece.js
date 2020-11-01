import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
  
export default function Piece({collor}){

    return(
        <div>
        {
            collor==='white'?<FiberManualRecordIcon style={{alignContent:'center', fontSize:50, fill:'grey'}}/>:
            collor==='black'?<FiberManualRecordIcon style={{alignContent:'center', fontSize:50, fill:'black'}}/>:
            collor==='blank'?<div></div>:
            <div></div>
        }    
        </div>    
    ) 
}