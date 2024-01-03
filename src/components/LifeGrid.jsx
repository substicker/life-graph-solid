import { onMount } from "solid-js";



export default function LifeGrid(){
  let years = 80;
  let canvas;
  onMount(() => {
    const ctx = canvas.getContext('2d');
    const height = 2500;
    const width = 1500;
    // Cómo hago que no se vea borroso maldito canvas!
    function fixHiPPICanvas() {
      const ratio = window.devicePixelRatio;
      window.devicePixelRatio=12;
  
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(ratio, ratio);
    }
    function fixBlurry(){

      // Set display size (css pixels).
      const size = 1500;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      // Set actual size in memory (scaled to account for extra pixel density).
      const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
      canvas.width = Math.floor(size * scale);
      canvas.height = Math.floor(size * scale);

      ctx.scale(scale, scale);
    }

    function drawGrid() {
      fixBlurry();
      ctx.font = "15px Arial";
      ctx.textAlign = "right";
      let size = {height: 15, width: 15};
      let canvasPadding = {x: 100, y: 20};
      let margin = {x: 10, y: 10};

      ctx.lineWidth = 2;
      for (let i = 0; i < years; i++){

        for (let j = 0; j < 52; j++) {
          ctx.fillStyle = i % 5 == 0 ? "black": "lightgray" ;
          ctx.strokeRect(
            canvasPadding.x + (size.width + margin.x) * j,
            canvasPadding.y + (size.height + margin.y) * i,
            size.width,
            size.height,
          );
          ctx.fillText(
            i.toString(),
            canvasPadding.x - 10, 
            (size.height + margin.y) * i + 32,
          );
        }

      }
    }
    drawGrid();
  })

  return <canvas ref={canvas} height="2500" width="1500" class="subpixel-antialiased"></canvas>
}