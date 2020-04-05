precision highp float;

     // Attributes
     attribute vec3 position;
     attribute vec3 normal;
     attribute vec2 uv;

     // Uniforms
     uniform mat4 worldViewProjection;

     // Varying
     varying vec2 vUV;

     void main(void) {
         vec3 pos = position;
         gl_Position = worldViewProjection * vec4(pos, 1.0);

         vUV = uv;
     }