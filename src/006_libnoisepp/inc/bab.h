#ifndef BAB_H
#define BAB_H
#include<iostream>
#include<vector>
#include<sstream>
#include<json/json.h>
using namespace std;
//--------------------------------------------------------------------------------
//Decl
//--------------------------------------------------------------------------------
class Vector3;
class Vector4;
class Color3;
class Color4;
class Matrix;
class Camera;
class CameraInputMap;
class Light;
class Material;
class FresnelParameter;
class Texture;
class ReflectionProbe;
class RenderTargetTexture;
class MultiMaterial;
class _Geometry;
class Box;
class Sphere;
class Cylinder;
class Torus;
class Ground;
class Plane;
class TorusKnot;
class VertexData;
class Instance;
class Mesh;
class SubMesh;
class Animation;
class AnimationKey;
class ShadowGenerator;
class Skeleton;
class Bone;
class ParticleSystem;
class LensFlareSystem;
class LensFlare;
class Sound;
class Property;
class Action;
class Babylon;
class _Global;
class BabylonSceneBuilder;
class BabylonSceneBuilder{
	public:
		BabylonSceneBuilder();
		~BabylonSceneBuilder();
		_Global build_global();
	private:
	protected:
};
//--------------------------------------------------------------------------------
//Vector3
class Vector3{
	public:
		Vector3();
		~Vector3();
		const Json::Value toJson();
		friend ostream & operator <<(ostream &out,const Vector3& v);
		friend istream & operator >>(istream &in,Vector3& v);
		friend _Global BabylonSceneBuilder::build_global();
	private:
		float m_data[3];
	protected:
};
ostream & operator <<(ostream &out,const Vector3& v);
istream & operator >>(istream &in,Vector3& v);
//--------------------------------------------------------------------------------
//Vector4
class Vector4{
	public:
		Vector4();
		~Vector4();
		const Json::Value toJson();
		friend ostream & operator <<(ostream &out,const Vector4& v);
		friend istream & operator >>(istream &in,Vector4& v);
		friend _Global build_global();
	private:
		float m_data[4];
	protected:
};
ostream & operator <<(ostream &out,const Vector4& v);
istream & operator >>(istream &in,Vector4& v);
//--------------------------------------------------------------------------------
//Color3
class Color3{
	public:
		Color3();
		~Color3();
		const Json::Value toJson();
		friend ostream & operator <<(ostream &out,const Color3& c);
		friend istream & operator >>(istream &in,Color3& c);
		friend _Global BabylonSceneBuilder::build_global();
	private:
		float m_data[3];
	protected:
};
//--------------------------------------------------------------------------------
//Color4
class Color4{
	public:
		Color4();
		~Color4();
		const Json::Value toJson();
		friend ostream & operator <<(ostream &out,const Color4& c);
		friend istream & operator >>(istream &in,Color4& c);
		friend _Global BabylonSceneBuilder::build_global();
	private:
		float m_data[4];
	protected:
};
ostream & operator <<(ostream &out,const Color4& c);
istream & operator >>(istream &in,Color4& c);
//--------------------------------------------------------------------------------
//Matrix
class Matrix{
	public:
		Matrix();
		~Matrix();
		const Json::Value toJson();
	private:
	protected:
		float m_data[4][4];
};
//--------------------------------------------------------------------------------
//CameraInputMap
//	this is an object literal using the input type as a key
//	and the input settings as a child object
//	each type has its own properties
//	?????
class CameraInputMap{
	public:
		CameraInputMap();
		~CameraInputMap();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
	protected:
};

//--------------------------------------------------------------------------------
//Camera
class Camera{
	public:
		Camera();
		~Camera();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
		std::string		name;
		std::string		id;
		std::string		type;
		std::string		tags;
		std::string		parentId;
		std::string		lockedTargetId;
		Vector3			position;
		Vector3			target;
		float			alpha;//only for ArcRotateCamera and AnaglyphArcRotateCamera
		float			beta;//only for ArcRotateCamera and AnaglyphArcRotateCamera
		float			radius;//only for ArcRotateCamera and AnaglyphArcRotateCamera
		float			eye_space;//only for ArcRotateCamera and AnaglyphArcRotateCamera
		float			heightOffset;//only for FollowCamera
		float			rotationOffset;//only for FollowCamera
		int			cameraRigMode;//can be omitted
		float			fov;//in radians
		float			minZ;
		float			maxZ;
		float			speed;
		float			inertia;//between 0 and 1
		bool			checkCollisions;
		bool			applyGravity;
		Vector3			ellipsoid;
		std::vector<Animation>	animations;//array of Animations (can be omitted)
		bool			autoAnimate;
		int			autoAnimateFrom;
		int			autoAnimateTo;
		bool			autoAnimateLoop;//can be omitted
		float			autoAnimateSpeed;//can be omitted
		CameraInputMap		inputmgr;//map of camera inputs (can be omitted)
	protected:
};
//--------------------------------------------------------------------------------
//Light
class Light{
	public:
		Light();
		~Light();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
		std::string			name;
		std::string			id;
		std::string			tags;
		int				type;
		Vector3				position;
		Vector3				direction;
		float				angle;
		float				exponent;
		Color3				groundColor;
		float				intensity;
		float				range;
		Color3				diffuse;
		Color3				specular;
		std::vector<std::string>	excludedMeshesIds;
		std::vector<std::string>	includedOnlyMeshesIds;
		std::vector<Animation>		animations;
		bool				autoAnimate;
		int				autoAnimateFrom;
		int				autoAnimateTo;
		bool				autoAnimateLoop;
		float				autoAnimateSpeed;
	protected:
};
//--------------------------------------------------------------------------------
//FresnelParameter
class FresnelParameter{
	public:
		FresnelParameter();
		~FresnelParameter();
		const Json::Value toJson();
	private:
		bool	isenabled;
		Color3	leftColor;
		Color3	rightColor;
		float	bias;
		float	power;
	protected:
};
//--------------------------------------------------------------------------------
//Texture
class Texture{
	public:
		Texture();
		~Texture();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
		std::string		name;//filename
		float			level;
		bool			hasAlpha;
		bool			getAlphaFromRGB;
		int			coordinatesMode;
		float			uOffset;
		float			vOffset;
		float			uScale;
		float			vScale;
		float			uAng;
		float			vAng;
		float			wAng;
		bool			wrapU;
		bool			wrapV;
		int			coordinatesIndex;
		std::vector<Animation>	animations;//array of Animation
		std::string		base64String;//can be omitted
	protected:
};
//--------------------------------------------------------------------------------
//Material
class Material{
	public:
		Material();
		~Material();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
		std::string		name;
		std::string		id;
		std::string		tags;
		bool			disableDepthWrite;
		Color3			ambient;
		Color3			diffuse;
		Color3			specular;
		float			specularPower;
		Color3			emissive;
		float			alpha;
		bool			backFaceCulling;
		bool			wireframe;
		Texture			diffuseTexture;
		Texture			ambientTexture;
		Texture			opacityTexture;
		Texture			reflectionTexture;
		Texture			refractionTexture;
		float			indexOfRefraction;
		Texture			emissiveTexture;
		Texture			specularTexture;
		Texture			bumpTexture;
		Texture			lightmapTexture;
		bool			useLightmapAsShadowmap;
		bool			checkReadOnlyOnce;
		bool			useReflectionFresnelFromSpecular;
		bool			useEmissiveAsIllumination;
		FresnelParameter	diffuseFresnelParameters;
		FresnelParameter	opacityFresnelParameters;
		FresnelParameter	reflectionFresnelParameters;
		FresnelParameter	refractionFresnelParameters;
		FresnelParameter	emissiveFresnelParameters;
	protected:
};
//--------------------------------------------------------------------------------
//ReflectionProbe
class ReflectionProbe{
	public:
		ReflectionProbe();
		~ReflectionProbe();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
		int				refreshRate;
		bool				isCube;
		bool				is3D;
		int				renderTragetSize;
		std::vector<std::string>	renderList;//string[]
	protected:
};
//--------------------------------------------------------------------------------
//RenderTragetTexture
class RenderTargetTexture{
	public:
		RenderTargetTexture();
		~RenderTargetTexture();
		const Json::Value toJson();
	private:
	protected:
};
//--------------------------------------------------------------------------------
//_Geometry
class _Geometry{
	public:
		_Geometry();
		~_Geometry();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
		std::vector<Box>	boxes;//array of Boxes (see below),
		std::vector<Sphere>	spheres;//array of Spheres (see below),
		std::vector<Cylinder>	cylinders;//array of Cylinders (see below),
		std::vector<Torus>	toruses;//array of Toruses (see below),
		std::vector<Ground>	grounds;//array of Grounds (see below),
		std::vector<Plane>	planes;//array of Planes (see below),
		std::vector<TorusKnot>	torusKnots;//array of TorusKnots (see below),
		std::vector<VertexData>	vertexData;//array of VertexData (see below)
	protected:
};
//--------------------------------------------------------------------------------
//Box
class Box{
	public:
		Box();
		~Box();
		const Json::Value toJson();
	private:
		std::string	id;
		float		size;
		bool		canBeRegenerated;
		std::string	tags;
	protected:
};
//--------------------------------------------------------------------------------
//Sphere
class Sphere{
	public:
		Sphere();
		~Sphere();
		const Json::Value toJson();
	private:
		std::string	id;
		float		segments;
		float		diameter;
		bool		canBeRegenerated;
		std::string	tags;
	protected:
};
//--------------------------------------------------------------------------------
//Cylinder
class Cylinder{
	public:
		Cylinder();
		~Cylinder();
		const Json::Value toJson();
	private:
		std::string	id;
		float		height;
		float		diameterTop;
		float		diameterBottom;
		float		tesselation;
		int		subdivisions;
		bool		canBeRegenerated;
		std::string	tags;
	protected:
};
//--------------------------------------------------------------------------------
//Torus
class Torus{
	public:
		Torus();
		~Torus();
		const Json::Value toJson();
	private:
		std::string	id;
		float		diameter;
		float		thickness;
		float		tesselation;
		bool		canBeRegenerated;
		std::string	tags;
	protected:
};
//--------------------------------------------------------------------------------
//Ground
class Ground{
	public:
		Ground();
		~Ground();
		const Json::Value toJson();
	private:
		std::string	id;
		float		width;
		float		height;
		float		subdivisions;
		bool		canBeRegenerated;
		std::string	tags;
	protected:
};
//--------------------------------------------------------------------------------
//Plane
class Plane{
	public:
		Plane();
		~Plane();
		const Json::Value toJson();
	private:
		std::string	id;
		float		size;
		bool		canBeRegenerated;
		std::string	tags;
	protected:
};
//--------------------------------------------------------------------------------
//TorusKnot
class TorusKnot{
	public:
		TorusKnot();
		~TorusKnot();
		const Json::Value toJson();
	private:
		std::string	id;
		float		radius;
		float		tube;
		float		radialSegments;
		float		tubularSegments;
		float		p;
		float		q;
		bool		canBeRegenerated;
		std::string	tags;
	protected:
};
//--------------------------------------------------------------------------------
//VertexData
class VertexData{
	public:
		VertexData();
		~VertexData();
		const Json::Value toJson();
	private:
		std::string			id;
		bool				updatable;
		std::vector<float>		positions;//array of floats, 3 per vertex
		std::vector<float>		normals;//array of floats 3 per vertex
		std::vector<float>		uvs;//array of floats 2 per vertex
		std::vector<float>		uvs2;//array of floats 2 per vertex which is the 2nd texture coordinates (can be omitted)
		std::vector<float>		uvs3;//array of floats 2 per vertex which is the 3d  texture coordinates (can be omitted)
		std::vector<float>		uvs4;//array of floats 2 per vertex which is the 4th texture coordinates (can be omitted)
		std::vector<float>		uvs5;//array of floats 2 per vertex which is the 5th texture coordinates (can be omitted)
		std::vector<float>		uvs6;//array of floats 2 per vertex which is the 6th texture coordinates (can be omitted)
		std::vector<float>		colors;//array of floats 3 per vertex which is the matrices indices for bones (can be omitted)
		std::vector<int>		matricesIndices;//array of ints 4 per vertex which is the matrices indices for bones (can be omitted)
		std::vector<float>		matricesWeights;//array of floats 4 per vertex which is the matrices weights for bones (can be omitted)
		std::vector<int>		indices;//array of ints 3 per face
		std::string			tags;
	protected:
};
//--------------------------------------------------------------------------------
//MultiMaterial
class MultiMaterial{
	public:
		MultiMaterial();
		~MultiMaterial();
		const Json::Value toJson();
	private:
		std::vector<Box>		boxes;//array of Box
		std::vector<Sphere>		spheres;//array of Sphere
		std::vector<Cylinder>		cylinders;//array of Cylinder
		std::vector<Torus>		toruses;//array of Torus
		std::vector<Ground>		grounds;//array of Ground
		std::vector<Plane>		planes;//array of Plane
		std::vector<TorusKnot>		torusKnots;//arrray of TorusKnot
		std::vector<VertexData>		vertexData;//array of VertexData
	protected:
};
//--------------------------------------------------------------------------------
//Instance
class Instance{
	public:
		Instance();
		~Instance();
		const Json::Value toJson();
	private:
		std::string	name;
		std::string	tags;
		Vector3		position;
		Vector3		rotation;//can be omitted
		Vector4		rotationQuaternion;//can be omitted
		Vector3		scaling;
	protected:
};
//--------------------------------------------------------------------------------
//Mesh
class Mesh{
	public:
		Mesh();
		~Mesh();
		const Json::Value toJson();
	private:
		std::string			name;
		std::string			id;
		std::string			tags;
		std::string			parentId;
		std::string			materialId;
		std::string			geometryId;//can be omitted
		Vector3				position;
		Vector3				rotation;//can be omitted
		Vector4				rotationQuaternion;//can be omitted
		Vector3				scaling;
		Matrix				pivotMatrix;
		bool				freezWorldMatrix;//can be omitted
		bool				infiniteDistance;
		bool				showBoundingBox;
		bool				showSubMeshesBoundingBox;
		bool				isInvisible;
		bool				isEnabled;
		bool				pickable;
		bool				applyFog;
		int				alphaIndex;
		bool				checkCollisions;
		int				billboardMode;
		bool				receiveShadows;
		int				physicsImpostor;
		float				physicsMass;
		float				physicsFriction;
		float				physicsRestitution;
		std::vector<float>		positions;//array of floats 3 per vertex
		std::vector<float>		normals;//array of floats 3 per vertex
		std::vector<float>		uvs;//array of floats 2 per vertex
		std::vector<float>		uvs2;//array of floats 2 per vertex which is the 2nd texture coordinates (can be omitted)
		std::vector<float>		uvs3;//array of floats 2 per vertex which is the 3d  texture coordinates (can be omitted)
		std::vector<float>		uvs4;//array of floats 2 per vertex which is the 4th texture coordinates (can be omitted)
		std::vector<float>		uvs5;//array of floats 2 per vertex which is the 5th texture coordinates (can be omitted)
		std::vector<float>		uvs6;//array of floats 2 per vertex which is the 6th texture coordinates (can be omitted)
		std::vector<float>		colors;//array of floats 4 per vertex which is the per vertex color (can be omitted)
		bool				hasVertexAlpha;//boolean to indicate if colors field contains useful alpha value (can be omitted)
		std::vector<int>		matricesIndices;//array of ints 4 per vertex which is the matrices indices for bones (can be omitted)
		std::vector<float>		matricesWeights;//array of floats 4 per vertex which is the matrices weights for bones (can be omitted)
		std::vector<int>		indices;//array of ints 3 per faces
		std::vector<SubMesh>		subMeshes;//array of SubMeshes
		std::vector<Animation>		animations;//array of Animations (can be omitted)
		bool				autoAnimate;
		int				autoAnimateFrom;
		int				autoAnimateTo;
		bool				autoAnimateLoop;
		float				autoAnimateSpeed;
		std::vector<Instance>		instances;//array of Instances (can be omitted)
		std::vector<Action>		actions;//array of actions
	protected:
};
//--------------------------------------------------------------------------------
//SubMesh
class SubMesh{
	public:
		SubMesh();
		~SubMesh();
		const Json::Value toJson();
	private:
		int	materialIndex;
		int	verticesStart;
		int	verticesCount;
		int	indexStart;
		int	indexCount;
	protected:
};
//--------------------------------------------------------------------------------
//Animation
class Animation{
	public:
		Animation();
		~Animation();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
		int				dataType;
		int				framePerSecond;
		int				loopBehavior;
		std::string			name;
		std::string			property;
		std::vector<AnimationKey>	keys;//array of AnimationKeys
		bool				autoAnimate;
		int				autoAnimateFrom;
		int				autoAnimateTo;
		bool				autoAnimateLoop;
	protected:
};
//--------------------------------------------------------------------------------
//AnimationKey
class AnimationKey{
	public:
		AnimationKey();
		~AnimationKey();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
		int			frame;
		std::vector<float>	values;//array of floats (depending on animation value)
	protected:
};
//--------------------------------------------------------------------------------
//ShadowGenerator
class ShadowGenerator{
	public:
		ShadowGenerator();
		~ShadowGenerator();
		const Json::Value toJson();
	private:
		bool				useBlurVarianceShadowMap;
		bool				useVarianceShadowMap;
		bool				usePoissonSampling;
		int				mapSize;
		float				bias;
		float				forceBackFacesOnly;
		std::string			lightId;
		std::vector<std::string>	renderList;//array of string (which are IDs of meshes)
	protected:
};
//--------------------------------------------------------------------------------
//Skeleton
class Skeleton{
	public:
		Skeleton();
		~Skeleton();
		const Json::Value toJson();
	private:
		std::string		name;
		std::string		id;
		std::vector<Bone>	bones;//array of Bone
		bool			needInitialSkinMatrix;
	protected:
};
//--------------------------------------------------------------------------------
//Bone
class Bone{
	public:
		Bone();
		~Bone();
		const Json::Value toJson();
	private:
		int			parentBoneIndex;
		std::string		name;
		Matrix			matrix;
		std::vector<Animation>	animations;//array of Animations (must of matrix type)
	protected:
};
//--------------------------------------------------------------------------------
//ParticleSystem
class ParticleSystem{
	public:
		ParticleSystem();
		~ParticleSystem();
		const Json::Value toJson();
	private:
		std::string		emitterId;
		Vector3			gravity;
		Vector3			direction1;
		Vector3			direction2;
		Vector3			minEmitBox;
		Vector3			maxEmitBox;
		Color3			color1;
		Color3			color2;
		Color3			colorDead;
		float			deadAlpha;
		float			emitRate;
		float			updateSpeed;
		int			targetStopFrame;
		int			minEmitPower;
		float			maxemitPower;
		float			minLifeTime;
		float			maxLifeTime;
		float			minSize;
		float			maxSize;
		float			minAngularSPeed;
		float			maxAngularSpeed;
		std::string		textureName;
		int			blendMode;
		int			capacity;
		Color4			textureMask;
		bool			linkToEmitter;
		std::vector<Animation>	animations;//array of Animations (can be omitted)
		bool			autoAnimate;
		int			autoAnimateFrom;
		int			autoAnimateTo;
		bool			autoAnimteLoop;//(can be omitted)
		float			autoAnimateSpeed;//(can be omitted)
	protected:
};
//--------------------------------------------------------------------------------
//LensFlareSystem
class LensFlareSystem{
	public:
		LensFlareSystem();
		~LensFlareSystem();
		const Json::Value toJson();
	private:
		std::string		emitterId;
		int			borderLimit;
		std::vector<LensFlare>	flares;//array of LensFlares
	protected:
};
//--------------------------------------------------------------------------------
//LensFlare
class LensFlare{
	public:
		LensFlare();
		~LensFlare();
		const Json::Value toJson();
	private:
		float		position;
		float		size;
		Color3		color;
		std::string	textureName;
	protected:
};
//--------------------------------------------------------------------------------
//Sound
class Sound{
	public:
		Sound();
		~Sound();
		const Json::Value toJson();
	private:
		std::string	name;//name of the file to load
		float		volume;//can be omitted, defaults to 1)
		bool		autoplay;//can be omitted
		bool		loop;//can be omitted
		int		soundTraackId;//can be omitted
		bool		spacialSound;//to enabled 3D sound (can be omitted)
		Vector3		position;//can be omitted, defaults to 0,0,0
		float		refDistance;//caan be omitted, defaults to 1
		float		rolloffFactor;//can be omitted, defaults to 1
		float		maxDistance;//can be omitted, defaults to 100
		std::string	distanceModel;//can be omitted, defaults to linear
		std::string	panningModel;//can be omitted, defaults to HRTF
		bool		isDirectional;//to enable directional cone
		float		coneInnerAngle;//can be omitted but set it for direcitonal sound
		float		coneOuterAngle;//can be omitted but set it for directional sound
		float		coneOuterGain;//can be omitted but set it for directional sound
		std::string	connectMeshId;//ID of the mesh to attach to
		Vector3		localDirectionToMesh;//can be omitted, defaults to 1,0,0
	protected:
};
//--------------------------------------------------------------------------------
//Property
class Property{
	public:
		Property();
		~Property();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
		std::string	name;//name of the property
		std::string	value;//value of the property, for example name="target" and value="Plane001"
		std::string	targetType;//internal use for BabylonJS Actions Builder, specifies where to find the properties for "propertyPath"
	protected:
};
//--------------------------------------------------------------------------------
//Action
class Action{
	public:
		Action();
		~Action();
		const Json::Value toJson();
		friend _Global BabylonSceneBuilder::build_global();
	private:
		int			type;//actions type
		std::string		name;//name of the action, trigger or flow control
		bool			detached;//if the node is detached or not, means it will not be computed if detached===true
		std::vector<Property>	properties;//array of properties
		std::vector<Action>	children;//array of Actions
		std::vector<Action>	combine;//array of Actions, used as a combine action, i.e. name = "CombineAciton", can be null
	protected:
};
//--------------------------------------------------------------------------------
//Babylon
class Babylon{
	public:
		Babylon();
		~Babylon();
		const Json::Value toJson();
		//friend ostream & operator <<(ostream &out,const Babylon& b);
		friend ostream & operator <<(ostream &out,Babylon& b);
		friend istream & operator >>(istream &in,Babylon& b);
		friend _Global BabylonSceneBuilder::build_global();
		friend _Global build_global();
	private:
		std::string		name;
		std::string		id;
		std::string		type;
		std::string		tags;
		std::string		parentId;
		std::string		lockedTargetId;
		Vector3			position;
		Vector3			target;
		float			alpha;
		float			beta;
		float			radius;
		float			eye_space;
		float			heightOffset;
		float			rotationOffset;
		int			cameraRigMode;
		float			fov;
		float			minZ;
		float			maxZ;
		float			speed;
		float			intertia;
		bool			checkCollisions;
		bool			applyGravity;
		Vector3			ellipsoid;
		std::vector<Animation>	animations;
		bool			autoAnimate;
		int			autoAnimateFrom;
		int			autoAnimateTo;
		bool			autoAnimateLoop;
		float			autoAnimateSpeed;
		CameraInputMap		inputmgr;
	protected:
};
ostream & operator <<(ostream &out,const Babylon &b);
ostream & operator <<(ostream &out,Babylon &b);
istream & operator >>(istream &in,Babylon &b);
//--------------------------------------------------------------------------------
//_Global
class _Global{
	public:
		_Global();
		~_Global();
		const Json::Value toJson();
		//friend ostream & operator <<(ostream &out,const Babylon& b);
		friend ostream & operator <<(ostream &out,_Global& b);
		friend istream & operator >>(istream &in,_Global& b);
		friend _Global BabylonSceneBuilder::build_global();
		friend _Global build_global();
	private:
		bool				autoClear;		//: boolean,
		Color3				clearColor;		//: color3,
		Color3				ambientColor;		//: color3,
		Vector3				gravity;		//: vector3 (usually [0,-9,0]),
		std::vector<Camera>		cameras;		//: array of Cameras (see below),
		std::string			activeCamera_;		// string,
		std::vector<Light>		lights;			//: array of Lights (see below),
		std::vector<ReflectionProbe>	reflectionProbes;	// array of ReflectionProbe (see below),
		std::vector<Material>		materials;		//: array of Materials (see below),
		_Geometry			geometries;		//: {...} (see below),
		std::vector<Mesh>		meshes;			// array of Meshes (see below),
		std::vector<MultiMaterial>	multiMaterials;		// array of MultiMaterials (see below),
		std::vector<ShadowGenerator>	shadowGenerators;	// array of ShadowGenerators (see below),
		std::vector<Skeleton>		skeletons;		// array of Skeletons (see below),
		std::vector<ParticleSystem>	particleSystems;	// array of ParticleSystems (see below),
		std::vector<LensFlareSystem>	lensFlareSystems;	// array of LensFlareSystems (see below),
		std::vector<Action>		actions;		// array of actions (see below),
		std::vector<Sound>		sounds;			// array of Sounds (see below),
		bool				collisionsEnabled;	// boolean,
		bool				physicsEnabled;		// boolean,
		Vector3				physicsGravity;		// vector3 (defaults to [0,-9.81,0]),
		std::string			physicsEngine;		// string (oimo or cannon, defaults to the default engine (oimo),
		std::vector<Animation>		animations;		// array of Animations (see below, can be omitted),
		bool				autoAnimate;		// boolean,
		int				autoAnimateFrom;	// int,
		int				autoAnimateTo;		// int,
		bool				autoAnimateLoop;	// boolean (can be omitted),
		float				autoAnimateSpeed;	// number (can be omitted)
	protected:
};


#endif


