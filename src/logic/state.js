import Piece from './piece'

function between(x, min, max) {
    return x >= min && x <= max;
  }

export default class State {
    constructor() {
        // So the lists can start from 1
        this.white_pieces = ['-']
        this.black_pieces = ['-']
        this.next_player = 'black'

        for(let col = 1; col <= 4; col++) {
            let new_white_piece = new Piece(1, col, 'white')
            let new_black_piece = new Piece(4, col, 'black')

            this.white_pieces.push(new_white_piece)
            this.black_pieces.push(new_black_piece)
        }
    }

    createState(white_pieces, black_pieces, next_player) {

        let state = new State()

        state.white_pieces = white_pieces
        state.black_pieces = black_pieces
        state.next_player = next_player

        return state
    }
   
    validMove(colStart,rowStart, colFinal,rowFinal)
    {
        let table = this.getTable()
        if(table[rowStart][colStart] ==='blank')
        {
            console.log('no piece is there')
            return false
        }
        if(!(table[rowStart][colStart]===this.next_player))
        {
            console.log('wrong player')
            return false
        }     
        if(!(table[rowFinal][colFinal]==='blank'))
        {
            console.log('not blank position')
            return false
        }
        if(!(Math.abs(rowFinal-rowStart)<=1 && Math.abs(colFinal-colStart)<=1))
        {
            console.log('too far')
            return false
        }

        if(!(between(colStart,1,4)&&between(colStart,1,4)&&between(colStart,1,4)&&between(colStart,1,4)))
        {
            console.log('out of bounds')
            return false
        }
        return true
    }

    makeMove(colStart, rowStart, colFinal, rowFinal){
        if(this.validMove(colStart, rowStart, colFinal, rowFinal))
        {
            if(this.next_player==='white')
            {
                console.log('white pieces:')
                console.log(this.white_pieces)
                this.white_pieces = this.white_pieces.filter(piece=> !(piece.line===rowStart&&piece.column===colStart))

                if(this.white_pieces[0]!=='-') 
                    this.white_pieces=['-',...this.white_pieces]
                
                this.white_pieces.push(new Piece(rowFinal, colFinal, 'white'))
                this.next_player='black'
            }
            else if (this.next_player==='black'){
                
                console.log('black pieces:')
                console.log(this.black_pieces)
                this.black_pieces = this.black_pieces.filter(piece=> !(piece.line===rowStart&&piece.column===colStart))

                if(this.black_pieces[0]!=='-') 
                    this.black_pieces=['-',...this.black_pieces]
                
                this.black_pieces.push(new Piece(rowFinal, colFinal, 'white'))
                this.next_player='white'
            }
        }
    }
    getTable(){
        let table = [['-','-','-','-','-'],['-',0,0,0,0], ['-',0,0,0,0], ['-',0,0,0,0], ['-',0,0,0,0,]]

        this.black_pieces.forEach((element,idx)=>{
            if(idx===0)
            {
                return
            }
            table[element.line][element.column] = 1
        })
        this.white_pieces.forEach((element,idx)=>{
            if(idx===0)
            {
                return
            }
            table[element.line][element.column] = 2
        })
        return table.map(
            val=>val.map(
                val2=>val2===1?'black':val2===2?'white':val2===0?'blank':'padding'))

    }

    is_final() {
        var flag_white = true
        var flag_black = true

        for(let i = 1; i <= 4; i++) {
            if(this.white_pieces[i].line !== 4) {
                flag_white = false
                break
            }
        }

        for(let i = 1; i <= 4; i++) {
            if(this.black_pieces[i].line !== 4) {
                flag_black = false
            }
        }

        if(!flag_white && !flag_black) {
            return false
        }

        return this.is_valid()
    }

    is_valid() {
        for(let i = 1; i <= 4; i++) {
            for(let j = i + 1; j <= 4; j++) {
                if( this.white_pieces[i].col === this.white_pieces[j].col &&
                    this.white_pieces[i].lin === this.white_pieces[j].lin) {
                    return false
                }

                if( this.black_pieces[i].col === this.black_pieces[j].col &&
                    this.black_pieces[i].lin === this.black_pieces[j].lin) {
                    return false
                }
            }
        }

        return true
    }

    compute_fitness() {
        let fitness = 0
        for(let i = 1; i <= 4; i++) {
            fitness += 4 - this.white_pieces[i].lin
            fitness -= this.black_pieces[i].lin - 1
        }

        return fitness
    }

    generate_next_states() {
        let next_states = []

    
        let flag = this.next_player === this.white_pieces[1].color
        for(let i = 1; flag  && i <= 4; i++) {
            for(let dir = 0; dir < 3; dir++) {
                this.white_pieces[i].move(dir)
                
                let possible_state = this.createState(this.white_pieces, this.black_pieces, "black")

                if(possible_state.is_valid()) {
                    next_states.push(possible_state)
                }

                this.white_pieces[i].move((dir + 2) % 4)
            }
        }

        flag = this.next_player === this.black_pieces[1].color
        for(let i = 1; flag  && i <= 4; i++) {
            for(let dir = 0; dir < 3; dir++) {
                this.black_pieces[i].move(dir)
                
                let possible_state = this.createState(this.white_pieces, this.black_pieces, "white")

                if(possible_state.is_valid()) {
                    next_states.push(possible_state)
                }

                this.black_pieces[i].move((dir + 2) % 4)
            }
        }

        return next_states
    }

    get_best_next_step() {
        let next_states = this.generate_next_states()

        let best_state = next_states[0]
        let best_fitness = next_states[0].compute_fitness()
        for(let i = 1; i < next_states.length; i++) {
            if(next_states[i].compute_fitness() > best_fitness) {
                best_fitness = next_states[i].compute_fitness()
                best_state = next_states[i]
            }
        }

        return best_state
    }
}