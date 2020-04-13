precision highp float;

     // Varying
     varying vec2 vUV;
     uniform float u_distortion;

     void main() {
         vec3 pos = position;
         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);

         vUV = uv;
     }