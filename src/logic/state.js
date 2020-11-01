import Piece from './piece'

export class State {
    constructor() {
        // So the lists can start from 1
        this.white_pieces = ['-']
        this.black_pieces = ['-']
        this.next_player = 'white'

        for(col = 1; col <= 4; col++) {
            let new_white_piece = new Piece(1, col, 'white')
            let new_black_piece = new Piece(4, col, 'black')

            this.white_pieces.push(new_white_piece)
            this.black_pieces.push(new_black_piece)
        }
    }

    constructor(white_pieces, black_pieces, next_player) {
        this.white_pieces = white_pieces
        this.black_pieces = black_pieces
        this.next_player = next_player
    }

    is_final() {
        let flag_white = true
        let flag_black = true

        for(let i = 1; i <= 4; i++) {
            if(this.white_pieces[i].line != 4) {
                flag_white = false
                break
            }
        }

        for(let i = 1; i <= 4; i++) {
            if(this.black_pieces[i].line != 4) {
                flag_black = false
                break
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
                if( this.white_pieces[i].col == this.white_pieces[j].col &&
                    this.white_pieces[i].lin == this.white_pieces[j].lin) {
                    return false
                }

                if( this.black_pieces[i].col == this.black_pieces[j].col &&
                    this.black_pieces[i].lin == this.black_pieces[j].lin) {
                    flag_black = false
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
        next_states = []

        let flag = next_player == this.white_pieces[1].color
        for(let i = 1; flag  && i <= 4; i++) {
            for(let dir = 0; dir < 3; dir++) {
                this.white_pieces[i].move(dir)
                
                possible_state = new State(this.white_pieces, this.black_pieces, "black")

                if(possible_state.is_valid()) {
                    next_states.push(possible_state)
                }

                this.white_pieces[i].move((dir + 2) % 4)
            }
        }

        flag = next_player == this.black_pieces[1].color
        for(let i = 1; flag  && i <= 4; i++) {
            for(dir = 0; dir < 3; dir++) {
                this.black_pieces[i].move(dir)
                
                possible_state = new State(this.white_pieces, this.black_pieces, "white")

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

        best_state = next_states[0]
        best_fitness = next_states[0].compute_fitness()
        for(let i = 1; i < next_states.length; i++) {
            if(next_states[i].compute_fitness() > best_fitness) {
                best_fitness = next_states[i].compute_fitness()
                best_state = next_states[i]
            }
        }

        return best_state
    }
}