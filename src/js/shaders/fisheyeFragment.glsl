precision highp float;

	varying vec2 vUV;

	uniform sampler2D textureSampler;
	uniform vec2 u_resolution;
	uniform float u_distortion;

	void main() {

		vec2 uv = (gl_FragCoord.xy / u_resolution.xy) - vec2(0.5);

		float uva = atan(uv.x, uv.y);
		float uvd = sqrt(dot(uv, uv));
		float k = sin(u_distortion);

		uvd *= 1.0 + k*uvd*uvd;

		gl_FragColor = texture(textureSampler, vec2(0.5) + vec2(sin(uva), cos(uva))*uvd);

			 // vec3 color = texture2D(textureSampler, vUV).xyz;
			 // gl_FragColor = vec4(color, 1.0);
	}