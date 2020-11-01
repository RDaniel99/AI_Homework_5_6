export default class Piece {
    drow    = [1, 1, 1, 0, -1, -1, -1, 0]
    dcolumn  =[-1, 0, 1, 1, 1, 0, -1, -1]

    // rows and columns on table are from 1 to 4
    constructor(row, column, color) {
        this.row   = row
        this.column = column
        this.color  = color
    }

    move(direction) {
        this.row   += this.drow[direction]
        this.column += this.dcolumn[direction]
    }
}