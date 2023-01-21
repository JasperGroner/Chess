import Move from "../Move"

class Piece {
    constructor(color, blackImage, whiteImage, moveSet) {
        this.color = color
        this.setImage(blackImage, whiteImage)
        this.moveSet = []
        if (moveSet) {
            moveSet.forEach(move => {
                this.moveSet.push(new Move(move))
            })
        }
    }

    setImage(blackImage, whiteImage) {
        if (this.color === "black") {
            this.image = blackImage
        } else {
            this.image = whiteImage
        }
    }

    // move this to board?
    // makes sense given board data is already there

}

export default Piece