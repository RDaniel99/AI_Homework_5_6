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

  console.log('refresh')
  let classes = useStyles()
  const [board, setBoard] = useState(new State())
  const [table, updateTable] = useState(board.getTable())
  const [move, updateMove] = useState({start:{x:null, y:null}})

  function makeMove(col, row, collor){
    console.log('called make move')
    if(move.start.x!==null)
    {
      if(board.validMove(move.start.x,move.start.y, col, row))
      {
        console.log(`legal move from ${move.start.y},${move.start.x} to ${row}${col}`)
        board.makeMove(move.start.x,move.start.y,col,row)
        setBoard(board)
        updateMove({start:{x:null, y:null}})
        updateTable(board.getTable())
      }
      else
      {
        console.log(`ilegal move from ${move.start.y},${move.start.x} to ${row},${col}`)
        updateMove({start:{x:null, y:null}})
      }
      
    }
    else{
      console.log('first move')
      updateMove({start:{x:col,y:row}})
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
                  <Paper className={classes.paper} onClick={()=>makeMove(col,row,val2)} style={{cursor:'pointer'}} >
                  {
                    val2==='white'?<Piece collor = 'white' />:
                    val2==='black'?<Piece collor = 'black' />:
                    val2==='blank'?<Piece collor = 'blank' />:null
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
