function Cell (x, y) {
  this.x = x
  this.y = y
  this.isSet = false
  this.col = color(0, 0, 0)
  this.isActive = true

  this.show = function () {
    fill(this.col)
    noStroke()
    rect(
      this.x * cellWidth.value(),
      this.y * cellWidth.value(),
      cellWidth.value(),
      cellWidth.value()
    )
  }

  this.updateColor = function (col) {
    this.col = col
  }
}
