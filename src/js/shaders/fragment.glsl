
precision highp float;

	varying vec2 vUV;
     
	uniform sampler2D uTexture;
	uniform sampler2D textureSampler;
	uniform vec2 u_resolution;
	uniform float u_distortion;

	void main() {
		vec2 position = vUV;
		vec2 uv = position.xy - vec2(0.5);
		float uva = atan(uv.x, uv.y);
		float uvd = sqrt(dot(uv, uv));
		float k = sin(u_distortion * 4.);

		// uv.y = gl_FragCoord.y * sin(u_distortion / 20.);

		uvd *= 1.0 + k*uvd*uvd;

		gl_FragColor = texture2D(uTexture, vec2(0.5) + vec2(sin(uva), cos(uva))*uvd);
     
  }