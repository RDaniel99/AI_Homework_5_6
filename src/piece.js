import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
  
export default function Piece({collor, fitness}){

    return(
        <div>
        {
            collor==='white'?<FiberManualRecordIcon style={{alignContent:'center', fontSize:50, fill:'grey'}}/>:
            collor==='black'?<FiberManualRecordIcon style={{alignContent:'center', fontSize:50, fill:'black'}}/>:
            collor==='blank'?<div>{fitness!==-9999?fitness:null}</div>:
            <div></div>
        }    
        </div>    
    ) 
}