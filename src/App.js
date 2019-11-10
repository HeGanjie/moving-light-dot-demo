import React from 'react';
import Regl, { Draw } from 'react-regl';
import './App.css'

let vertShader = `
precision mediump float;
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0, 1);
}`
let fragShader = `
precision mediump float;
uniform vec4 color;
void main() {
  gl_FragColor = color;
}`

function App() {
  return (
    <Regl
      width={window.innerWidth}
      height={window.innerHeight}
      color={[0, 0, 0, 1]}
    >
      <Draw
        vert={vertShader}
        frag={fragShader}
        attributes={{
          position: [[-0.5, 0],[0, -0.5],[0.25, 1]]
        }}
        uniforms={{
          color: [1,1,0.5,1]
        }}
        count={3}
      />
    </Regl >
  );
}

export default App;
