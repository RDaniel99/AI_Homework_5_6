import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding: theme.spacing(1),
        height:'100%',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    piece:{
        minHeight:'100px'
    }
  }));

  
export default function Piece({collor}){

    const classes = useStyles();

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