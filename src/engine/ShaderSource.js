// File generated with util/buildShaders.py. Do not edit //

J3D.ShaderSource = {};

J3D.ShaderSource.BasicFilterVertex = [
	"attribute vec2 aVertexPosition;",
	"attribute vec2 aTextureCoord;",

	"varying vec2 vTextureCoord;",

	"void main(void) {",
	"gl_Position = vec4(aVertexPosition, 0.0, 1.0);",
	"vTextureCoord = aTextureCoord;",
	"}",

""].join("\n");

J3D.ShaderSource.CommonFilterInclude = [
	"#ifdef GL_ES",
	"precision highp float;",
	"#endif",

	"uniform float uTime;",
""].join("\n");

J3D.ShaderSource.CommonInclude = [
	"#ifdef GL_ES",
	"precision highp float;",
	"#endif",

	"struct lightSource {",
	"int type;",
	"vec3 direction;",
	"vec3 color;",
	"vec3 position;",
	"};",

	"uniform float uTime;",
	"uniform mat4 mMatrix;",
	"uniform mat4 vMatrix;",
	"uniform mat3 nMatrix;",
	"uniform mat4 pMatrix;",
	"uniform vec3 uEyePosition;",
	"uniform lightSource uLight[4];",
	"uniform vec3 uAmbientColor;",
	"uniform vec4 uTileOffset;",

	"mat4 mvpMatrix() {",
	"return pMatrix * vMatrix * mMatrix;",
	"}",

	"mat4 mvMatrix() {",
	"return vMatrix * mMatrix;",
	"}",

	"float luminance(vec3 c) {",
	"return c.r * 0.299 + c.g * 0.587 + c.b * 0.114;",
	"}",

	"float brightness(vec3 c) {",
	"return c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722;",
	"}",

	"vec3 computeLight(vec4 p, vec3 n, float si, float sh, lightSource light){",
	"vec3 ld;",

	"if(light.type == 0) return vec3(0);",
	"else if(light.type == 1) ld = -light.direction;",
	"else if(light.type == 2) ld = normalize(light.position - p.xyz);",

	"float dif = max(dot(n, ld), 0.0);",

	"float spec = 0.0;",

	"if(si > 0.0) {",
	"vec3 eyed = normalize(uEyePosition - p.xyz);",
	"vec3 refd = reflect(-ld, n);",
	"spec = pow(max(dot(refd, eyed), 0.0), sh) * si;",
	"};",

	"return light.color * dif + light.color * spec;",
	"}",

	"vec3 computeLights(vec4 p, vec3 n, float si, float sh) {",
	"vec3 s = uAmbientColor;",
	"s += computeLight(p, n, si, sh, uLight[0]);",
	"s += computeLight(p, n, si, sh, uLight[1]);",
	"s += computeLight(p, n, si, sh, uLight[2]);",
	"s += computeLight(p, n, si, sh, uLight[3]);",
	"return s;",
	"}",

	"vec2 getTextureCoord(vec2 uv) {",
	"return uv * uTileOffset.xy + uTileOffset.zw;",
	"}",
""].join("\n");

J3D.ShaderSource.DepthVertex = [
	"varying float depth;",

	"void main(void) {",
	"vec4 p = mMatrix * vec4(aVertexPosition, 1.0);",
	"gl_Position = pMatrix * vMatrix * p;",
	"depth = gl_Position.z/gl_Position.w;",
	"}",

""].join("\n");

J3D.ShaderSource.DepthFragment = [
	"varying float depth;",

	"void main(void) {",
	"float d = 1.0 - depth;",
	"gl_FragColor = vec4(d, d, d, 1.0);",
	"}",
""].join("\n");

J3D.ShaderSource.GouraudVertex = [
	"uniform float uSpecularIntensity;",
	"uniform float uShininess;",

	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",

	"void main(void) {",
	"vec4 p = mMatrix * vec4(aVertexPosition, 1.0);",
	"gl_Position = pMatrix * vMatrix * p;",
	"vTextureCoord = getTextureCoord(aTextureCoord);",
	"vec3 n = normalize( nMatrix * aVertexNormal );",
	"vLight = computeLights(p, n, uSpecularIntensity, uShininess);",
	"}",

""].join("\n");

J3D.ShaderSource.GouraudFragment = [
	"uniform vec4 uColor;",
	"uniform sampler2D uColorSampler;",
	"uniform bool uHasColorSampler;",

	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",

	"void main(void) {",
	"vec4 tc = uColor.rgba;",
	"if(uHasColorSampler) tc *= texture2D(uColorSampler, vTextureCoord);",
	"gl_FragColor = vec4(tc.rgb * vLight, uColor.a);",
	"}",
""].join("\n");

J3D.ShaderSource.LightmapVertex = [
	"uniform vec4 uLightmapAtlas;",

	"varying vec2 vTextureCoord;",
	"varying vec2 vTextureCoord2;",

	"void main(void) {",
	"vTextureCoord = getTextureCoord(aTextureCoord);",
	"vTextureCoord2 = aTextureCoord2 * uLightmapAtlas.xy + uLightmapAtlas.zw;",

	"gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);",
	"}",

""].join("\n");

J3D.ShaderSource.LightmapFragment = [
	"uniform vec4 uColor;",
	"uniform sampler2D uColorSampler;",
	"uniform sampler2D uLightmapSampler;",

	"varying vec2 vTextureCoord;",
	"varying vec2 vTextureCoord2;",

	"void main(void) {",

	"vec4 tc = texture2D(uColorSampler, vTextureCoord);",
	"vec4 lm = texture2D(uLightmapSampler, vTextureCoord2);",

	"if(tc.a < 0.1) discard;",
	"else gl_FragColor = vec4(uColor.rgb * tc.rgb * lm.rgb, 1.0);",
	"}",
""].join("\n");

J3D.ShaderSource.Normal2ColorVertex = [
	"varying vec3 vColor;",

	"void main(void) {",
	"gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);",
	"vColor = normalize( aVertexNormal / 2.0 + vec3(0.5) );",
	"}",

""].join("\n");

J3D.ShaderSource.Normal2ColorFragment = [
	"varying vec3 vColor;",

	"void main(void) {",
	"gl_FragColor = vec4(vColor, 1.0);",
	"}",
""].join("\n");

J3D.ShaderSource.PhongVertex = [
	"varying vec4 vPosition;",
	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",
	"varying vec3 vNormal;",

	"void main(void) {",
	"vTextureCoord = getTextureCoord(aTextureCoord);",
	"vNormal = nMatrix * aVertexNormal;",
	"vPosition = mMatrix * vec4(aVertexPosition, 1.0);",
	"gl_Position = pMatrix * vMatrix * vPosition;",
	"gl_PointSize = 5.0;",
	"}",

""].join("\n");

J3D.ShaderSource.PhongFragment = [
	"uniform vec4 uColor;",
	"uniform sampler2D uColorSampler;",
	"uniform bool uHasColorSampler;",

	"uniform float uSpecularIntensity;",
	"uniform float uShininess;",

	"varying vec4 vPosition;",
	"varying vec3 vLight;",
	"varying vec2 vTextureCoord;",
	"varying vec3 vNormal;",

	"void main(void) {",
	"vec4 tc = uColor;",
	"if(uHasColorSampler) tc *= texture2D(uColorSampler, vTextureCoord);",

	"vec3 l = computeLights(vPosition, vNormal, uSpecularIntensity, uShininess);// * brightness(tc.rgb);",

	"gl_FragColor = vec4(tc.rgb * l, uColor.a);",
	"}",
""].join("\n");


J3D.ShaderSource.ReflectiveVertex = [
	"varying vec3 vNormal;",
	"varying vec3 refVec;",

	"void main(void) {",
	"gl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);",
	"vNormal = normalize(nMatrix * aVertexNormal);",
	"vec3 incident = normalize( (vec4(aVertexPosition, 1.0) * mMatrix).xyz - uEyePosition);",
	"refVec = reflect(incident, vNormal);",
	"}",

""].join("\n");

J3D.ShaderSource.ReflectiveFragment = [
	"uniform samplerCube uCubemap;",

	"varying vec3 refVec;",

	"void main(void) {",
	"gl_FragColor = textureCube(uCubemap, refVec);",
	"}",
""].join("\n");

J3D.ShaderSource.SkyboxVertex = [
	"uniform float mid;",

	"varying vec3 vVertexPosition;",

	"void main(void) {",
	"gl_Position = pMatrix * vMatrix * vec4(uEyePosition + aVertexPosition * mid, 1.0);",
	"vVertexPosition = aVertexPosition;",
	"}",

""].join("\n");

J3D.ShaderSource.SkyboxFragment = [
	"uniform samplerCube uCubemap;",

	"varying vec3 vVertexPosition;",

	"void main(void) {",
	"gl_FragColor = textureCube(uCubemap, vVertexPosition);",
	"}",
""].join("\n");

J3D.ShaderSource.ToonVertex = [
	"varying float vLight;",
	"varying vec2 vTextureCoord;",

	"float cli(vec4 p, vec3 n, lightSource light){",
	"vec3 ld;",
	"if(light.type == 0) return 0.0;",
	"else if(light.type == 1) ld = -light.direction;",
	"else if(light.type == 2) ld = normalize(light.position - p.xyz);",
	"return max(dot(n, ld), 0.0);",
	"}",

	"float lightIntensity(vec4 p, vec3 n) {",
	"float s = cli(p, n, uLight[0]);",
	"s += cli(p, n, uLight[1]);",
	"s += cli(p, n, uLight[2]);",
	"s += cli(p, n, uLight[3]);",
	"return s;",
	"}",

	"void main(void) {",
	"vec4 p = mMatrix * vec4(aVertexPosition, 1.0);",
	"gl_Position = pMatrix * vMatrix * p;",
	"gl_PointSize = 10.0;",
	"vTextureCoord = getTextureCoord(aTextureCoord);",
	"vec3 n = normalize( nMatrix * aVertexNormal );",
	"vLight = lightIntensity(p, n);",
	"}",

""].join("\n");

J3D.ShaderSource.ToonFragment = [
	"uniform vec4 uColor;",
	"uniform sampler2D uColorSampler;",

	"varying float vLight;",
	"varying vec2 vTextureCoord;",

	"void main(void) {",
	"vec4 tc = texture2D(uColorSampler, vec2(vLight, 0.5) );",
	"gl_FragColor = vec4(tc.rgb, 1.0);",
	"}",
""].join("\n");

J3D.ShaderSource.VertexInclude = [
	"attribute vec3 aVertexPosition;",
	"attribute vec3 aVertexNormal;",
	"attribute vec2 aTextureCoord;",
	"attribute vec2 aTextureCoord2;",
	"attribute vec4 aVertexColor;",

	"vec3 bend(vec3 ip, float ba, vec2 b, float o, float a) {",
	"vec3 op = ip;",

	"ip.x = op.x * cos(a) - op.y * sin(a);",
	"ip.y = op.x * sin(a) + op.y * cos(a);",

	"if(ba != 0.0) {",
	"float radius = b.y / ba;",
	"float onp = (ip.x - b.x) / b.y - o;",
	"ip.z = cos(onp * ba) * radius - radius;",
	"ip.x = (b.x + b.y * o) + sin(onp * ba) * radius;",
	"}",

	"op = ip;",
	"ip.x = op.x * cos(-a) - op.y * sin(-a);",
	"ip.y = op.x * sin(-a) + op.y * cos(-a);",

	"return ip;",
	"}",
""].join("\n");

J3D.ShaderSource.Vignette = [
	"uniform sampler2D uTexture;",
	"varying vec2 vTextureCoord;",

	"void main(void) {",
	"vec2 m = vec2(0.5, 0.5);",
	"float d = distance(m, vTextureCoord) * 1.0;",
	"vec3 c = texture2D(uTexture, vTextureCoord).rgb * (1.0 - d * d);",
	"gl_FragColor = vec4(c.rgb, 1.0);",
	"}",
""].join("\n");

