export default class Piece {
    dline    = [1, 0, -1, 0]
    dcolumn  = [0, 1, 0, -1]

    // rows and columns on table are from 1 to 4
    constructor(line, column, color) {
        this.line   = line
        this.column = column
        this.color  = color
    }

    move(direction) {
        this.line   += this.dline[direction]
        this.column += this.dcolumn[direction]
    }
}