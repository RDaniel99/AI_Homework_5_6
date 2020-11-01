import Grid from '@material-ui/core/Grid'
import { useState } from 'react'
import State from './logic/state'
import Piece from './Piece'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';

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

function App() {

  let classes = useStyles()
  const [board, setBoard] = useState(new State())
  const [table, updateTable] = useState(board.getTable())
  const [move, updateMove] = useState({start:{col:null, row:null}})

  function makeMove(col, row, collor){
    if(move.start.col!==null)
    {
      if(board.validMove(move.start.col,move.start.row, col, row))
      {
        board.makeMove(move.start.col,move.start.row,col,row)
        setBoard(board)
        updateMove({start:{col:null, row:null}})
        updateTable(board.getTable())
      }
      else
      {
        updateMove({start:{col:null, row:null}})
      }
      
    }
    else{
      if(table[row][col]===board.next_player)
      {
        updateMove({start:{col:col,row:row}})
      }
      else{
        updateMove({start:{col:null,row:null}})
      }
    }
  }

  function getPaperStyle(col, row)
  {
    if(move.start.col)
    {
      if(move.start.col===col && move.start.row ===row)
      {
        return {cursor:'pointer', backgroundColor:'red'}
      }
      else if (board.validMove(move.start.col,move.start.row,col,row))
      {
        return {cursor:'pointer', backgroundColor:'yellow'}
      }
    }
    else{
      if(table[row][col]===board.next_player)
      {
        return {cursor:'pointer'}
      }
    }
  }
  return (
    <div >
      <h1>{`${board.next_player}'s turn`}</h1>
      <Grid container spacing={3}>
        {
        table.map((val,row)=>
          <Grid container item xs={12} spacing={3}>
          {
            row!==0?
              val.map((val2,col)=>
                col!==0?
                <Grid item xs={3} className={classes.piece}>
                  <Paper className={classes.paper} onClick={()=>makeMove(col,row,val2)} style={getPaperStyle(col,row)} >
                  {
                    val2==='white'?<Piece collor = 'white' />:
                    val2==='black'?<Piece collor = 'black' />:
                    val2==='blank'?<Piece collor = 'blank' fitness ={board.getFitnessOfMove(move.start.col,move.start.row,col,row)} />:null
                  }
                  </Paper>
                </Grid>
                :null)
              :null
          }
          </Grid>)
        }
      </Grid>
    </div>
  );
}

export default App;
