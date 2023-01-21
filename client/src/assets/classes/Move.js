class Move {
    constructor({vertical, horizontal, repeating, jumpOver, specialConditions}) {
        this.vertical = vertical
        this.horizontal = horizontal
        this.repeating = repeating
        this.jumpOver = jumpOver
        this.specialConditions = specialConditions
    }
}

export default Move