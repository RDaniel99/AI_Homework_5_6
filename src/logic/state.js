<<<<<<< HEAD
import Piece from './pieceLogic'
=======
import { Copyright } from '@material-ui/icons';
import Piece from './piece'
>>>>>>> 904d8e9d076859d4769ab82bb6fd6ef5e73b2e63

function between(x, min, max) {
    return x >= min && x <= max;
}

function createState(white_pieces, black_pieces, next_player) {

    let state = new State()

    state.white_pieces = white_pieces
    state.black_pieces = black_pieces
    state.next_player = next_player

    return state
}

export default class State {
    constructor() {
        // So the lists can start from 1
        this.white_pieces = ['-']
        this.black_pieces = ['-']
        this.lastMove = undefined
        this.next_player = 'black'

        for (let col = 1; col <= 4; col++) {
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

    validMove(colStart, rowStart, colFinal, rowFinal) {
        let table = this.getTable()
        if (table[rowStart][colStart] === 'blank') {
            return false
        }
        if (!(table[rowStart][colStart] === this.next_player)) {
            return false
        }
        if (!(table[rowFinal][colFinal] === 'blank')) {
            return false
        }
        if (!(Math.abs(rowFinal - rowStart) <= 1 && Math.abs(colFinal - colStart) <= 1)) {
            return false
        }

        if (!(between(colStart, 1, 4) && between(colStart, 1, 4) && between(colStart, 1, 4) && between(colStart, 1, 4))) {
            return false
        }
        return true
    }

    makeMove(colStart, rowStart, colFinal, rowFinal) {
        if (this.validMove(colStart, rowStart, colFinal, rowFinal)) {
            this.lastMove = (colStart, rowStart, colFinal, rowFinal)
            if (this.next_player === 'white') {
                this.white_pieces = this.white_pieces.filter(piece => !(piece.row === rowStart && piece.column === colStart))

                if (this.white_pieces[0] !== '-')
                    this.white_pieces = ['-', ...this.white_pieces]

                this.white_pieces.push(new Piece(rowFinal, colFinal, 'white'))
                this.next_player = 'black'
            }
            else if (this.next_player === 'black') {

                this.black_pieces = this.black_pieces.filter(piece => !(piece.row === rowStart && piece.column === colStart))

                if (this.black_pieces[0] !== '-')
                    this.black_pieces = ['-', ...this.black_pieces]

                this.black_pieces.push(new Piece(rowFinal, colFinal, 'white'))
                this.next_player = 'white'
            }
        }
    }
    getTable() {
        let table = [['-', '-', '-', '-', '-'], ['-', 0, 0, 0, 0], ['-', 0, 0, 0, 0], ['-', 0, 0, 0, 0], ['-', 0, 0, 0, 0,]]

        this.black_pieces.forEach((element, idx) => {
            if (idx === 0) {
                return
            }
            table[element.row][element.column] = 1
        })
        this.white_pieces.forEach((element, idx) => {
            if (idx === 0) {
                return
            }
            table[element.row][element.column] = 2
        })
        return table.map(
            val => val.map(
                val2 => val2 === 1 ? 'black' : val2 === 2 ? 'white' : val2 === 0 ? 'blank' : 'padding'))

    }

    is_final() {
        var flag_white = true
        var flag_black = true

        for (let i = 1; i <= 4; i++) {
            if (this.white_pieces[i].row !== 4) {
                flag_white = false
                break
            }
        }

        for (let i = 1; i <= 4; i++) {
            if (this.black_pieces[i].row !== 1) {
                flag_black = false
            }
        }

        return flag_white || flag_black

    }

    is_valid() {
        for (let i = 1; i <= 4; i++) {
            for (let j = i + 1; j <= 4; j++) {
                if (this.white_pieces[i].col === this.white_pieces[j].col &&
                    this.white_pieces[i].row === this.white_pieces[j].row) {
                    return false
                }

                if (this.black_pieces[i].col === this.black_pieces[j].col &&
                    this.black_pieces[i].row === this.black_pieces[j].row) {
                    return false
                }
            }
        }

        return true
    }

    compute_fitness(collor) {
        let fitness = 0

        if (collor) {
            let aux = this.next_player
            this.next_player = collor
            let res = this.compute_fitness()
            this.next_player = aux

            return res
        }
        /// the board is in whites turn after it does blacks move, we compute black move fitness here
        if (this.next_player === 'white') {
            for (let idx = 1; idx <= 4; idx++) {
                fitness = fitness + (4 - this.black_pieces[idx].row) ** 2
            }
        }

        /// the board is in black turn after it does whites move, we compute whites move fitness here
        else if (this.next_player === 'black') {
            for (let idx = 1; idx <= 4; idx++) {
                fitness = fitness + (this.white_pieces[idx].row - 1) ** 2
            }
        }

        return fitness
    }

    getFitnessOfMove(col, row, colFinal, rowFinal) {
        if (!col)
            return -9999
        if (!row)
            return -9999
        if (!colFinal)
            return -9999
        if (!rowFinal)
            return -9999

        let boardCpy = this.createState(this.white_pieces, this.black_pieces, this.next_player)
        if (!(boardCpy.validMove(col, row, colFinal, rowFinal))) {
            return -9999
        }
        boardCpy.makeMove(col, row, colFinal, rowFinal)
        return boardCpy.compute_fitness()
    }

    generate_next_states() {
        let next_states = []

        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 4; j++) {
                for (let i2 = 1; i2 <= 4; i2++) {
                    for (let j2 = 1; j2 <= 4; j2++) {
                        if (this.validMove(i, j, i2, j2)) {
                            let aux = this.createState(this.white_pieces, this.black_pieces, this.next_player)
                            aux.makeMove(i, j, i2, j2)
                            next_states.push(aux)
                        }
                    }
                }
            }
        }
        return next_states
    }

    get_best_next_step() {
        let y = this.getBestAlphaBeta(this, 2, -9999, 9999, true)

        return y
        let next_states = this.generate_next_states()

        let best_state = next_states[0]
        let best_fitness = next_states[0].compute_fitness()

        for (let i = 1; i < next_states.length; i++) {
            if (next_states[i].compute_fitness() > best_fitness) {
                best_fitness = next_states[i].compute_fitness()
                best_state = next_states[i]
            }
        }

        return best_state
    }

    getBestAlphaBeta(node, depth, a, b, maximizingPlayer) {
        console.log(depth)
        if (depth === 0)
            return node

        let bestChild = undefined
        if (maximizingPlayer) {
            let value = -9999
            for (let child of node.generate_next_states()) {
                let aux = child.getBestAlphaBeta(child, depth - 1, a, b, false)
                if (aux) {
                    if (value < aux.compute_fitness_using_perm_strategy()) {
                        value = aux.compute_fitness_using_perm_strategy()
                        bestChild = child
                    }
                }
                a = a > value ? a : value
                if (a >= b)
                    break
            }
        }
        else {
            bestChild = undefined
            let value = 9999
            for (let child of node.generate_next_states()) {
                let aux = child.getBestAlphaBeta(child, depth - 1, a, b, true)
                if (aux) {
                    if (value > aux.compute_fitness_using_perm_strategy() {
                        value = aux.compute_fitness_using_perm_strategy()
                        bestChild = child
                    }
                    b = b < value ? b : value
                    if (b <= a)
                        break
                }
            }
        }
        return bestChild
    }

    getBestMinMax() {

        let nextStates = this.generate_next_states()

        let best = undefined
        let maxFitness1 = -9999
        let minFitness1 = 9999

        let maxFitness2 = -9999
        let minFitness2 = 9999

        /// max
        for (let state of nextStates) {
            /// min
            for (let state2 of state.generate_next_states()) {
                /// max
                for (let state3 of state.generate_next_states()) {
                    if (state3.compute_fitness()) {
                        /// min
                        for (let state4 of state.generate_next_states()) {
                            if (state4.compute_fitness() < minFitness2) {
                                best = state
                                minFitness2 = state4.compute_fitness()
                            }
                            else if (state4.compute_fitness() === minFitness2) {
                                if (state3.compute_fitness() > maxFitness2) {
                                    best = state
                                    maxFitness2 = state3.compute_fitness()
                                }
                                else if (state3.compute_fitness() === maxFitness2) {
                                    if (state2.compute_fitness() < minFitness1) {
                                        best = state
                                        minFitness1 = state.compute_fitness()
                                    }
                                    else if (state2.compute_fitness() === minFitness1) {
                                        if (state.compute_fitness() > maxFitness1) {
                                            maxFitness1 = state.compute_fitness()
                                            best = state
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return best
    }

    compute_distance_between_position(rowStart, colStart, rowEnd, colEnd) {
        let difRows = (rowStart < rowEnd ? rowEnd - rowStart : rowStart - rowEnd)
        let difCols = (colStart < colEnd ? colEnd - colStart : colStart - colEnd)

        return difRows + difCols
    }

    compute_best_permutation(color) {
        fn_pos = []
        curr_pos = []
        if(color == 'white') {
            curr_pos = this.white_pieces
            for(let i = 1; i <= 4; i++) {
                fn_pos.push([4, i])
            }
        }
        else {
            curr_pos = this.black_pieces
            for(let i = 1; i <= 4; i++) {
                fn_pos.push([1, i])
            }
        }

        bst = 29909259 // ceva super mare idk
        for(let a = 1; a <= 4; a++) {
            for(let b = 1; b <= 4; b++) {
                if(a != b) {
                    for(let c = 1; c <= 4; c++) {
                        if(a != c && b != c) {
                            for(let d = 1; d <= 4; d++) {
                                if(a != d && b != d && c != d) {
                                    fn_perm = [a, b, c, d]
                                    ans = 0
                                    for(let k = 1; k <= 4; k++) {
                                        let rowStart = curr_pos[k][0]
                                        let rowEnd = fn_pos[fn_perm[k][0]]

                                        let colStart = curr_pos[k][1]
                                        let colEnd = fn_pos[fn_perm[k][1]]

                                        dist = compute_distance_between_position(rowStart, colStart, rowEnd, colEnd)
                                        ans += dist
                                    }

                                    if(bst > ans) {
                                        bst = ans
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return bst
    }

    compute_fitness_using_perm_strategy() {
        other = (this.next_player == 'black' ? 'white' : 'black')

        return this.compute_best_permutation(this.next_player) - this.compute_best_permutation(other)
    }
}
