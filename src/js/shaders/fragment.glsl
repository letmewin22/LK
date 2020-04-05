precision highp float;

     uniform sampler2D u_mainTexture;
     varying vec2 vUV;

     void main() {
       vec2 uv = vUV;

       vec2 Position = vec2(uv.x, uv.y);

       vec4 _texture = texture2D(u_mainTexture, Position);

       gl_FragColor = _texture;
     }