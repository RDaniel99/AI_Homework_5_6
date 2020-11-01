export class Piece {
    static dline    = [1, 0, -1, 0]
    static dcolumn  = [0, 1, 0, -1]

    // rows and columns on table are from 1 to 4
    constructor(line, column, color) {
        this.line   = line
        this.column = column
        this.color  = color
    }

    move(direction) {
        this.line   += dline[direction]
        this.column += dcolumn[direction]
    }
}