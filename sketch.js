let symmetry = 8;
let angle = 360 / symmetry;
let t = 0;
let brandColors;
let startColorPicker, endColorPicker, regenerateButton, frameInput, speedInput;
let maxFrames = 150;
let colorSpeed = 1.2;

function setup() {
  let cnv = createCanvas(720, 720, SVG);
  cnv.id("p5Canvas");

  angleMode(DEGREES);
  colorMode(RGB, 255);
  background(255);
  noFill();

  brandColors = [
    color("#000000"),
    color("#D01F30"),
    color("#FED140"),
    color("#28A7DE"),
  ];

  startColorPicker = createColorPicker("#D01F30");
  startColorPicker.position(10, height + 10);
  endColorPicker = createColorPicker("#28A7DE");
  endColorPicker.position(150, height + 10);

  frameInput = createInput(maxFrames.toString(), "number");
  frameInput.position(10, height + 40);
  frameInput.input(() => (maxFrames = int(frameInput.value())));

  speedInput = createInput(colorSpeed.toString(), "number");
  speedInput.position(150, height + 40);
  speedInput.input(() => (colorSpeed = float(speedInput.value())));

  regenerateButton = createButton("Regenerate");
  regenerateButton.position(300, height + 10);
  regenerateButton.mousePressed(resetSketch);
}

function draw() {
  background(255);

  translate(width / 2, height / 2);

  brandColors[1] = color(startColorPicker.value());
  brandColors[3] = color(endColorPicker.value());

  let x1 = ((noise(t) - 0.5) * width) / 2;
  let y1 = ((noise(t + 1000) - 0.5) * height) / 2;
  let x2 = ((noise(t + 0.05) - 0.5) * width) / 2;
  let y2 = ((noise(t + 1000 + 0.05) - 0.5) * height) / 2;

  t += 0.01;

  let totalColors = brandColors.length;
  let tNorm = (t * colorSpeed) % totalColors;
  let colorIndex = floor(tNorm);
  let tColor = tNorm - colorIndex;
  let colFrom = brandColors[colorIndex];
  let colTo = brandColors[(colorIndex + 1) % totalColors];
  let col = lerpColor(colFrom, colTo, tColor);

  for (let i = 0; i < symmetry; i++) {
    rotate(angle);
    stroke(col);
    strokeWeight(10);
    line(x1, y1, x2, y2);

    push();
    scale(1, -1);
    line(x1, y1, x2, y2);
    pop();
  }

  if (frameCount > maxFrames) {
    noLoop();
  }
}

function resetSketch() {
  clear();
  background(255);

  t = 0;
  frameCount = 0;
  randomSeed(millis());
  noiseSeed(millis());

  symmetry = floor(random(4, 12));
  angle = 360 / symmetry;

  loop();
}

function exportSVG() {
  save("kaleidoscope_sketch.svg");
}
