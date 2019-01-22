var grid,
  lod,
  cellWidth,
  imageWidth,
  imageHeight,
  falloff,
  threshold,
  seedButton,
  activeColor,
  r,
  g,
  b,
  setButton,
  cols,
  rows,
  color1,
  color2,
  color3,
  color4
var padding = 10

function setup () {
  colorMode(HSB)

  imageWidth = createInput(500, 'number')
  imageWidth.size(50)
  imageWidth.position(windowWidth - imageWidth.size().width * 2 - padding, 0)
  imageWidth.changed(resizeImage)
  label1 = createDiv('Width and Height:')
  label1.position(1100, imageWidth.position().y)

  imageHeight = createInput(500, 'number')
  imageHeight.size(50)
  imageHeight.position(windowWidth - imageHeight.size().width - padding, 0)
  imageHeight.changed(resizeImage)

  cellWidth = createInput(10, 'number')
  cellWidth.size(50)
  cellWidth.position(windowWidth - cellWidth.size().width - padding, 50)
  cellWidth.changed(resizeImage)
  label2 = createDiv('Cell Size:')
  label2.position(1100, cellWidth.position().y)

  lod = createInput(4, 'number')
  lod.size(50)
  lod.position(windowWidth - lod.size().width - padding, 100)
  label3 = createDiv('Octaves:')
  label3.position(1100, lod.position().y)

  falloff = createSlider(0.1, 2, 1, 0.01)
  falloff.size(200)
  falloff.position(windowWidth - falloff.size().width - padding, 150)
  label4 = createDiv('Falloff Factor:')
  label4.position(1100, falloff.position().y)

  threshold = createSlider(1, 255, 0, 1)
  threshold.size(200)
  threshold.position(windowWidth - threshold.size().width - padding, 200)
  label5 = createDiv('Color Threshold:')
  label5.position(1100, threshold.position().y)

  color1 = createInput(0, 'color')
  color1.value('#03409b')
  color1.position(windowWidth - color1.size().width - padding, 250)
  label6 = createDiv('Color:')
  label6.position(1100, color1.position().y)

  setButton = createButton('Set Color')
  setButton.mousePressed(setColors)
  setButton.position(windowWidth - setButton.size().width - padding, 300)

  seedButton = createButton('New Noise Seed')
  seedButton.mousePressed(newSeed)
  seedButton.size(100, 50)
  seedButton.position(windowWidth - seedButton.size().width - padding, 350)

  cols = imageWidth.value() / cellWidth.value()
  rows = imageHeight.value() / cellWidth.value()
  createCanvas(imageWidth.value(), imageHeight.value())

  grid = new Array(cols)

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j)
    }
  }
}

function draw () {
  noiseDetail(lod.value(), falloff.value())
  background(51)

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      var cell = grid[i][j]

      if (!cell.isSet) {
        var n = Math.round(noise(i / rows, j / rows) * 100 * 100) / 100
        var col = color(n, 50, 80)
        cell.updateColor(col)

        if (n < threshold.value()) {
          col = color1.value()
          cell.updateColor(col)
          cell.isActive = true
        } else {
          cell.isActive = false
        }
      }
      cell.show()
    }
  }
  //   for (let i = 0; i < cols; i++) {
  //     for (let j = 0; j < rows; j++) {
  //       var cell = grid[i][j]

  //       if (!cell.isSet) {
  //         var col = noise(i / rows, j / cols) * 100
  //         cell.updateColor(col)

  //         if (col > threshold.value()) {
  //           col = colorPicker.value()
  //           cell.updateColor(col)
  //           cell.isActive = true
  //         } else {
  //           cell.isActive = false
  //         }
  //       }

  //       cell.show()
  //     }
  //   }
}

function setColors () {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      var cell = grid[i][j]
      if (cell.isActive && !cell.isSet) {
        cell.isSet = true
        cell.isActive = false
      }
    }
  }
}

function resizeImage () {
  createCanvas(imageWidth.value(), imageHeight.value())
  cols = imageWidth.value() / cellWidth.value()
  rows = imageHeight.value() / cellWidth.value()
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j)
    }
  }
}

function newSeed () {
  noiseSeed()
}
