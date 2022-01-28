
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const makeNoise = (count) => {
  const out = [];

  for (let i = 0; i < count; i++) {
    const n = {
      x: (Math.random() * canvas.width),
      y: (Math.random() * canvas.height),
      brightness: 255
    }
    out.push(n)
  }
  return out;

}

let noise = makeNoise(4000);

function drawPixel(x, y, brightness) {
  const rgb = `rgb(0, 255, 0)`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, 1.5, 1.5);
};

const clear = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function drawNoise() {
  clear();
  console.log(noise);
  for (let p of noise) {
    drawPixel(p.x, p.y, p.brightness);
  }
}

drawNoise();

const moveNoise = (distance) => {
  const count = noise.length;
  for (let i = 0; i < count; i++) {
    const n = noise[i];
    n.y += distance;
    if (n.y >= canvas.height) {
      noise.splice(i, 1);
      noise.push({
        x: (Math.random() * canvas.width),
        y: (0),
        brightness: 255
      });
    }
    // while (n.y <= 1) {
    //   n.y += .1;
    // }
  }

};

window.addEventListener("click", () => {
  moveNoise(100);
  drawNoise();
});


function animate() {
  moveNoise(.4);
  drawNoise();
  requestAnimationFrame(animate);
}

animate();

// // const clear = () => {
// //   ctx.fillStyle = "black";
// //   ctx.fillRect(0, 0, canvas.width, canvas.height);
// // };

// // const putPixel = (x, y, brightness) => {
// //   const intensity = Math.random() * 255;
// //   const rgb = `rgb(0, ${intensity}, 0)`;
// //   ctx.fillStyle = rgb;
// //   ctx.fillRect(x, y, 1, 1);
// // };

// // const moveNoise = (distance) => {
// //   const count = noise.length;
// //   for (let i = 0; i < count; i++) {
// //     const n = noise[i];
// //     n.y -= distance;
// //     while (n.y <= 1) {
// //       n.y += 10;
// //     }
// //   }
// // };

// // let prevTime;
// // const init = (time) => {
// //   prevTime = time;
// //   requestAnimationFrame(tick);
// // }

// // const tick = (time) => {
// //   let elapsed = time - prevTime;
// //   prevTime = time;

// //   moveNoise(elapsed * 0.01);

// //   clear();

// //   const count = noise.length;

// //   for (let i = 0; i < count; i++) {
// //     const n = noise[i];

// //     const x = n.x;
// //     const y = n.y;

// //     if (x < 0 || x >= w || y < 0 || y >= h) {
// //       continue;
// //     }
// //     putPixel(x, y, 255); // put pixel at new coordinates with specified brightness
// //   }
// //   requestAnimationFrame(tick); // call on the next refresh
// // };

// // requestAnimationFrame(init);