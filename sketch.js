let x;
let y = 50;
let pascal2 = [
  [0, 0],
  [0, 1, 0],
]; // a few rows of the
let lgsz = 20;
let nbCheck;
function newRow(oldRow) {
  let new_row = [];
  for (let i = 0; i < oldRow.length - 1; i++) {
    new_row[i] = oldRow[i] + oldRow[i + 1]; // the new row is the sum of neighbors of the old row
  }
  new_row.push(0); // put a zero on the back
  new_row.unshift(0); // put a zero on the front

  return new_row;
}

function makeTriangle(n) {
  for (let i = 1; i < n; i++) {
    // need to start with the second index to form the triangle
    pascal2[i + 1] = newRow(pascal2[i]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  x = width / 2;
  textSize(50);
  background(0);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  frameRate(20);
  makeTriangle(58);
  nbCheck = createCheckbox("label", false);
  nbCheck.position(50, 100);

  print(pascal2);
}

function draw() {
  background(0);
  lgsz = map(mouseX, 0, width, 60, 5);
  for (let row = 0; row < pascal2.length; row++) {
    // loops through rows of the pascal 2d array

    for (let i = 0; i < pascal2[row].length; i++) {
      // loops through items in each row
      //fill(random(255), random(255), random(255));

      push(); // push for each item
      let txsz = map(str(pascal2[row][i]).length, 1, 27, lgsz, 2); // changes the size of the text according to number of digits to print
      textSize(txsz);
      translate(x + i * lgsz, y);
      if (pascal2[row][i] == 0) {
        rotate(frameCount * 10); // zero has a random color
        fill(random(255), random(255), random(255));
      } else if (pascal2[row][i] % 2 === 0) {
        rotate(frameCount * 10); // rotates even numbers in positive direction
        fill(255, 0, 0); // red color
      } else {
        rotate(frameCount * -10); // rotates odd numbers in a negative drection
        fill(0, 255, 0); // green color
      }
      if (nbCheck.checked()) {
        text(pascal2[row][i], 0, 0);
      } else {
        rect(0, 0, txsz, txsz);
      }
      //
      pop(); // pop for each item
    }
    x -= lgsz / 2;
    y += lgsz;
  }
  //noLoop();
  x = width / 2;
  y = 100;
}
