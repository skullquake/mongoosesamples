#include"bab.h"
#include<iostream>
#include<vector>
#include<sstream>
#include<json/json.h>
//--------------------------------------------------------------------------------
//BabylonSceneBuilder
BabylonSceneBuilder::BabylonSceneBuilder(){
}
BabylonSceneBuilder::~BabylonSceneBuilder(){
}
_Global BabylonSceneBuilder::build_global(){
	_Global ret;
	int len=4;

	//--------------------------------------------------------------------------------
	//autoClear
	ret.autoClear=true;		//: boolean,
	//--------------------------------------------------------------------------------
	//clearColor
	ret.clearColor.m_data[0]=0;;		//: color3,
	ret.clearColor.m_data[1]=0;;		//: color3,
	ret.clearColor.m_data[2]=0;;		//: color3,
	//--------------------------------------------------------------------------------
	//ambientColor
	ret.ambientColor.m_data[0]=0;;		//: color3,
	ret.ambientColor.m_data[1]=0;;		//: color3,
	ret.ambientColor.m_data[2]=0;;		//: color3,
	//--------------------------------------------------------------------------------
	//gravity
	ret.gravity.m_data[0]=0;;		//: vector3 (usually [0,-9,0]),
	ret.gravity.m_data[1]=0;;		//: vector3 (usually [0,-9,0]),
	ret.gravity.m_data[2]=0;;		//: vector3 (usually [0,-9,0]),
	//--------------------------------------------------------------------------------
	//cameras
	for(int i=0;i<len;i++){
		Camera cam;//todo

		cam.name="Camera."+std::to_string(i);
		cam.name=std::to_string(i);
		cam.type="";//?
		cam.tags="";//?
		cam.parentId="";//?;
		cam.lockedTargetId="";//?
		cam.position.m_data[0]=0;;
		cam.position.m_data[1]=0;;
		cam.position.m_data[2]=0;;
		cam.target.m_data[0]=0;
		cam.target.m_data[1]=0;
		cam.target.m_data[2]=0;
		cam.alpha=0;//only for ArcRotateCamera and AnaglyphArcRotateCamera
		cam.beta=0;//only for ArcRotateCamera and AnaglyphArcRotateCamera
		cam.radius=1;//only for ArcRotateCamera and AnaglyphArcRotateCamera
		cam.eye_space=1;//only for ArcRotateCamera and AnaglyphArcRotateCamera
		cam.heightOffset=0;//only for FollowCamera
		cam.rotationOffset=0;//only for FollowCamera
		cam.cameraRigMode=0;//can be omitted
		cam.fov=35;//in radians
		cam.minZ=0;
		cam.maxZ=0;
		cam.speed=0;
		cam.inertia=0;//between 0 and 1
		cam.checkCollisions=false;
		cam.applyGravity=false;
		cam.ellipsoid.m_data[0]=0;//?
		cam.ellipsoid.m_data[1]=0;//?
		cam.ellipsoid.m_data[2]=0;//?
		//camera animations
		for(int j=0;j<len;j++){
			Animation an;
			for(int k=0;k<len;k++){
				AnimationKey ak;
				for(int l=0;l<len;l++){
					ak.values.push_back(l);
				}
				an.keys.push_back(ak);
			}
			cam.animations.push_back(an);
		}
		cam.autoAnimate=false;
		cam.autoAnimateFrom=0;
		cam.autoAnimateTo=0;
		cam.autoAnimateLoop=false;//can be omitted
		cam.autoAnimateSpeed=24;//can be omitted
		//CameraInputMap		inputmgr;//map of camera inputs (can be omitted)
		// ??
		ret.cameras.push_back(cam);
	}
	//--------------------------------------------------------------------------------
	//activeCamera
		//point to one of the cameras
	ret.activeCamera_=ret.cameras.front().name;//"Camera.000";		// string,
	//--------------------------------------------------------------------------------
	//lights
	for(int i=0;i<len;i++){
		Light l;
		//name
		l.name="Light."+std::to_string(i);;
		//id
		l.id=std::to_string(i);
		//tags
		l.tags="";
		//type
		l.type=0;//??
		//position
		l.position.m_data[0]=0;
		l.position.m_data[1]=0;
		l.position.m_data[2]=0;
		//direction
		l.direction.m_data[0]=0;
		l.direction.m_data[1]=0;
		l.direction.m_data[2]=0;
		//angle
		l.angle=0;//??
		//exponent
		l.exponent=1;//??
		//groundColor
		l.groundColor.m_data[0]=0;
		l.groundColor.m_data[1]=0;
		l.groundColor.m_data[2]=0;
		//intensity
		l.intensity=1;//??
		//range
		l.range=1;//??
		//diffuse
		l.diffuse.m_data[0]=0;
		l.diffuse.m_data[1]=0;
		l.diffuse.m_data[2]=0;
		//specular
		l.specular.m_data[0]=0;
		l.specular.m_data[1]=0;
		l.specular.m_data[2]=0;
		//excludedMeshesIds
		//std::vector<std::string>	excludedMeshesIds;
		for(int j=0;j<len;j++){
			//todo from existin objs
			std::string str_exc="Obj."+std::to_string(j);
			l.excludedMeshesIds.push_back(str_exc);
		}
		//includedOnlyMeshesIds
		std::vector<std::string>	includedOnlyMeshesIds;
		for(int j=len;j<(len+len);j++){
			//todo from existin objs
			std::string str_exc="Obj."+std::to_string(j);
			l.includedOnlyMeshesIds.push_back(str_exc);
		}
		//animations
		for(int j=0;j<len;j++){
			Animation an;
			for(int k=0;k<len;k++){
				AnimationKey ak;
				for(int l=0;l<len;l++){
					ak.values.push_back(l);
				}
				an.keys.push_back(ak);
			}
			l.animations.push_back(an);
		}
		//autoAnimate
		l.autoAnimate=false;
		//autoAnimateFrom
		l.autoAnimateFrom=0;
		//autoAnimateTo
		l.autoAnimateTo=0;
		//autoAnimateLoop
		l.autoAnimateLoop=false;
		//autoAnimateSpeed
		l.autoAnimateSpeed=24;
		ret.lights.push_back(l);
	}
	//--------------------------------------------------------------------------------
	//reflectionProbes
	for(int i=0;i<len;i++){
		ReflectionProbe rp;
		//refreshRate
		rp.refreshRate=1;
		//isCube
		rp.isCube=true;
		//is3D
		rp.is3D=true;
		//renderTragetSize
		rp.renderTragetSize=1;//??
		//renderList
		for(int j=0;j<len;j++){
			rp.renderList.push_back("Renderlist."+std::to_string(j));//??
		}
		ret.reflectionProbes.push_back(rp);
	}
	//--------------------------------------------------------------------------------
	//materials
	for(int i=0;i<len;i++){
		Material mat;
		Animation an;
		for(int k=0;k<len;k++){
			Animation a;
			mat.diffuseTexture.animations.push_back(a);
		}
		for(int k=0;k<len;k++){
			Animation a;
			mat.ambientTexture.animations.push_back(a);
		}
		for(int k=0;k<len;k++){
			Animation a;
			mat.opacityTexture.animations.push_back(a);
		}
		for(int k=0;k<len;k++){
			Animation a;
			mat.reflectionTexture.animations.push_back(a);
		}
		for(int k=0;k<len;k++){
			Animation a;
			mat.refractionTexture.animations.push_back(a);
		}
		for(int k=0;k<len;k++){
			Animation a;
			mat.emissiveTexture.animations.push_back(a);
		}
		for(int k=0;k<len;k++){
			Animation a;
			mat.specularTexture.animations.push_back(a);
		}
		for(int k=0;k<len;k++){
			Animation a;
			mat.bumpTexture.animations.push_back(a);
		}
		for(int k=0;k<len;k++){
			Animation a;
			mat.lightmapTexture.animations.push_back(a);
		}
		ret.materials.push_back(mat);
	}
	//--------------------------------------------------------------------------------
	//geometries
	for(int i=0;i<len;i++){
		Box b;
		ret.geometries.boxes.push_back(b);
	}
	for(int i=0;i<len;i++){
		Sphere s;
		ret.geometries.spheres.push_back(s);
	}
	for(int i=0;i<len;i++){
		Cylinder c;
		ret.geometries.cylinders.push_back(c);
	}
	for(int i=0;i<len;i++){
		Torus t;
		ret.geometries.toruses.push_back(t);
	}
	for(int i=0;i<len;i++){
		Ground g;
		ret.geometries.grounds.push_back(g);
	}
	for(int i=0;i<len;i++){
		Plane p;
		ret.geometries.planes.push_back(p);
	}
	for(int i=0;i<len;i++){
		TorusKnot tk;
		ret.geometries.torusKnots.push_back(tk);
	}
	for(int i=0;i<len;i++){
		VertexData vd;
		ret.geometries.vertexData.push_back(vd);
	}
	//--------------------------------------------------------------------------------
	//meshes
	for(int i=0;i<len;i++){
		Mesh mesh;
		ret.meshes.push_back(mesh);
	}
	//--------------------------------------------------------------------------------
	//multiMaterials
	for(int i=0;i<len;i++){
		MultiMaterial multimat;
		ret.multiMaterials.push_back(multimat);
	}
	//--------------------------------------------------------------------------------
	//shadowGenerators
	for(int i=0;i<len;i++){
		ShadowGenerator shgen;
		ret.shadowGenerators.push_back(shgen);
	}
	//--------------------------------------------------------------------------------
	//skeletons
	for(int i=0;i<len;i++){
		Skeleton ston;
		ret.skeletons.push_back(ston);
	}
	//--------------------------------------------------------------------------------
	//particleSystems
	for(int i=0;i<len;i++){
		ParticleSystem psys;
		ret.particleSystems.push_back(psys);
	}
	//--------------------------------------------------------------------------------
	//lensFlareSystems
	for(int i=0;i<len;i++){
		LensFlareSystem lfsys;
		ret.lensFlareSystems.push_back(lfsys);
	}
	//--------------------------------------------------------------------------------
	//actions
	for(int i=0;i<len;i++){
		Action a;
		for(int j=0;j<len;j++){
			Action ac;
			a.children.push_back(ac);
		}
		for(int j=0;j<len;j++){
			Property p;
			a.properties.push_back(p);
		}
		for(int j=0;j<len;j++){
			Action acomb;
			a.combine.push_back(acomb);
		}
		ret.actions.push_back(a);
	}
	//--------------------------------------------------------------------------------
	//sounds
	for(int i=0;i<len;i++){
		Sound snd;
		ret.sounds.push_back(snd);
	}
	//--------------------------------------------------------------------------------
	//collisionsEnabled
	ret.collisionsEnabled=true;	// boolean,
	//--------------------------------------------------------------------------------
	//physicsEnabled
	ret.physicsEnabled=true;		// boolean,
	//--------------------------------------------------------------------------------
	//physicsGravity
	ret.physicsGravity.m_data[0]=0;;		// vector3 (defaults to [0,-9.81,0]),
	ret.physicsGravity.m_data[1]=0;;		// vector3 (defaults to [0,-9.81,0]),
	ret.physicsGravity.m_data[2]=0;;		// vector3 (defaults to [0,-9.81,0]),
	//--------------------------------------------------------------------------------
	//physicsEngine
		//todo
	ret.physicsEngine="default";		// string (oimo or cannon, defaults to the default engine (oimo),
	//--------------------------------------------------------------------------------
	//animations
		//array of Animations (see below, can be omitted),
	//animations
	for(int i=0;i<len;i++){
		Animation an;
		for(int j=0;j<len;j++){
			AnimationKey ak;
			for(int k=0;k<len;k++){
				ak.values.push_back(k);
			}
			an.keys.push_back(ak);
		}
		ret.animations.push_back(an);
	}
	//--------------------------------------------------------------------------------
	//autoAnimate
	ret.autoAnimate=false;		// boolean,
	//--------------------------------------------------------------------------------
	//autoAnimateFrom
	ret.autoAnimateFrom=0;	// int,
	//--------------------------------------------------------------------------------
	//autoAnimateTo
	ret.autoAnimateTo=0;		// int,
	//--------------------------------------------------------------------------------
	//autoAnimateLoop
	ret.autoAnimateLoop=false;	// boolean (can be omitted),
	//--------------------------------------------------------------------------------
	//autoAnimateSpeed
	ret.autoAnimateSpeed=24.0;	// number (can be omitted)
	//--------------------------------------------------------------------------------
	return ret;
}
//--------------------------------------------------------------------------------
//Vector3
Vector3::Vector3(){
}
Vector3::~Vector3(){
}
const Json::Value Vector3::toJson(){
	Json::Value ret;
	ret.append(m_data[0]);
	ret.append(m_data[1]);
	ret.append(m_data[2]);
	return ret;
}
ostream & operator <<(ostream &out,const Vector3& v){
	return out;
}
istream & operator >>(istream &in,Vector3& v){
	return in;
}
//--------------------------------------------------------------------------------
//Vector4
Vector4::Vector4(){
}
Vector4::~Vector4(){
}
const Json::Value Vector4::toJson(){
	Json::Value ret=Json::arrayValue;
	ret.append(m_data[0]);
	ret.append(m_data[1]);
	ret.append(m_data[2]);
	ret.append(m_data[3]);
	return ret;
}
ostream & operator <<(ostream &out,const Vector4& v){
	return out;
}
istream & operator >>(istream &in,Vector4& v){
	return in;
}
//--------------------------------------------------------------------------------
//Color3
Color3::Color3(){
}
Color3::~Color3(){
}
const Json::Value Color3::toJson(){
	Json::Value ret=Json::arrayValue;
	ret.append(m_data[0]);
	ret.append(m_data[1]);
	ret.append(m_data[2]);
	return ret;
}
//--------------------------------------------------------------------------------
//Color4
Color4::Color4(){
}
Color4::~Color4(){
}
const Json::Value Color4::toJson(){
	Json::Value ret=Json::arrayValue;
	ret.append(m_data[0]);
	ret.append(m_data[1]);
	ret.append(m_data[2]);
	ret.append(m_data[3]);
	return ret;
}
ostream & operator <<(ostream &out,const Color4& c){
	return out;
}
istream & operator >>(istream &in,Color4& c){
	return in;
}
//--------------------------------------------------------------------------------
//Matrix
Matrix::Matrix(){
}
Matrix::~Matrix(){
}
const Json::Value Matrix::toJson(){
	Json::Value r0;
	r0.append(m_data[0][0]);
	r0.append(m_data[0][1]);
	r0.append(m_data[0][2]);
	r0.append(m_data[0][3]);
	Json::Value r1;
	r1.append(m_data[1][0]);
	r1.append(m_data[1][1]);
	r1.append(m_data[1][2]);
	r1.append(m_data[1][3]);
	Json::Value r2;
	r2.append(m_data[2][0]);
	r2.append(m_data[2][1]);
	r2.append(m_data[2][2]);
	r2.append(m_data[2][3]);
	Json::Value r3;
	r3.append(m_data[3][0]);
	r3.append(m_data[3][1]);
	r3.append(m_data[3][2]);
	r3.append(m_data[3][3]);
	Json::Value ret;
	ret.append(r0);
	ret.append(r1);
	ret.append(r2);
	ret.append(r3);
	return ret;
}
//--------------------------------------------------------------------------------
//CameraInputMap
//	this is an object literal using the input type as a key
//	and the input settings as a child object
//	each type has its own properties
//	?????
CameraInputMap::CameraInputMap(){
}
CameraInputMap::~CameraInputMap(){
}
const Json::Value CameraInputMap::toJson(){
	Json::Value ret;
	return ret;
}
//--------------------------------------------------------------------------------
//Camera
Camera::Camera(){
}
Camera::~Camera(){
}
const Json::Value Camera::toJson(){
	Json::Value ret;
	ret["name"]=name;
	ret["id"]=id;
	ret["type"]=type;
	ret["tags"]=tags;
	ret["parentId"]=parentId;
	ret["lockedTargetId"]=lockedTargetId;
	ret["position"]=position.toJson();
	ret["target"]=target.toJson();
	ret["alpha"]=alpha;
	ret["beta"]=beta;
	ret["radius"]=radius;
	ret["eye_space"]=eye_space;
	ret["heightOffset"]=heightOffset;
	ret["rotationOffset"]=rotationOffset;
	ret["cameraRigMode"]=cameraRigMode;
	ret["fov"]=fov;
	ret["minZ"]=minZ;
	ret["maxZ"]=maxZ;
	ret["speed"]=speed;
	ret["inertia"]=inertia;
	ret["checkCollisions"]=checkCollisions;
	ret["applyGravity"]=applyGravity;
	ret["ellipsoid"]=ellipsoid.toJson();
	ret["animations"]=Json::arrayValue;
	for(
		std::vector<Animation>::iterator it=animations.begin();
		it!=animations.end();
		++it
	){
		ret["animations"].append((*it).toJson());
	}
	ret["autoAnimate"]=autoAnimate;
	ret["autoAnimateFrom"]=autoAnimateFrom;
	ret["autoAnimateTo"]=autoAnimateTo;
	ret["autoAnimateLoop"]=autoAnimateLoop;
	ret["autoAnimateSpeed"]=autoAnimateSpeed;
	//CameraInputMap		inputmgr;//map of camera inputs (can be omitted)
	return ret;
}
//--------------------------------------------------------------------------------
//Light
Light::Light(){
}
Light::~Light(){
}
const Json::Value Light::toJson(){
	Json::Value ret;
	ret["name"]=name;
	ret["id"]=id;
	ret["tags"]=tags;
	ret["type"]=type;
	ret["position"]=position.toJson();
	ret["direction"]=direction.toJson();
	ret["angle"]=angle;
	ret["exponent"]=exponent;
	ret["groundColor"]=groundColor.toJson();
	ret["intensity"]=intensity;
	ret["range"]=range;
	ret["diffuse"]=diffuse.toJson();
	ret["specular"]=specular.toJson();
	ret["excludedMeshesIds"]=Json::arrayValue;
	for(
		std::vector<std::string>::iterator it=excludedMeshesIds.begin();
		it!=excludedMeshesIds.end();
		++it
	){
		ret["excludedMeshesIds"].append(*it);
	}
	ret["includedOnlyMeshesIds"]=Json::arrayValue;
	for(
		std::vector<std::string>::iterator it=includedOnlyMeshesIds.begin();
		it!=includedOnlyMeshesIds.end();
		++it
	){
		ret["includedOnlyMeshesIds"].append(*it);
	}
	ret["animations"]=Json::arrayValue;
	for(
		std::vector<Animation>::iterator it=animations.begin();
		it!=animations.end();
		++it
	){
		ret["animations"].append((*it).toJson());
	}
	ret["keys"]=Json::arrayValue;
	ret["autoAnimate"]=autoAnimate;
	ret["autoAnimateFrom"]=autoAnimateFrom;
	ret["autoAnimateTo"]=autoAnimateTo;
	ret["autoAnimateLoop"]=autoAnimateLoop;
	ret["autoAnimateSpeed"]=autoAnimateSpeed;
	return ret;
}
//--------------------------------------------------------------------------------
//FresnelParameter
FresnelParameter::FresnelParameter(){
}
FresnelParameter::~FresnelParameter(){
}
const Json::Value FresnelParameter::toJson(){
	Json::Value ret;
	ret["isenabled"]=isenabled;
	ret["leftColor"]=leftColor.toJson();
	ret["rightColor"]=rightColor.toJson();
	ret["bias"]=bias;
	ret["power"]=power;
	return ret;
}
//--------------------------------------------------------------------------------
//Texture
Texture::Texture(){
}
Texture::~Texture(){
}
const Json::Value Texture::toJson(){
	Json::Value ret;
	ret["name"]=name;
	ret["level"]=level;
	ret["hasAlpha"]=hasAlpha;
	ret["getAlphaFromRGB"]=getAlphaFromRGB;
	ret["coordinatesMode"]=coordinatesMode;
	ret["uOffset"]=uOffset;
	ret["vOffset"]=vOffset;
	ret["uScale"]=uScale;
	ret["vScale"]=vScale;
	ret["uAng"]=uAng;
	ret["vAng"]=vAng;
	ret["wAng"]=wAng;
	ret["wrapU"]=wrapU;
	ret["wrapV"]=wrapV;
	ret["coordinatesIndex"]=coordinatesIndex;
	ret["animations"]=Json::arrayValue;
	for(
		std::vector<Animation>::iterator it=animations.begin();
		it!=animations.end();
		++it
	){
		ret["renderList"].append((*it).toJson());
	}
	ret["base64String"]=base64String;

	return ret;
}
//--------------------------------------------------------------------------------
//Material
Material::Material(){
}
Material::~Material(){
}
const Json::Value Material::toJson(){
	Json::Value ret;
	ret["name"]=name;
	ret["id"]=id;
	ret["tags"]=tags;
	ret["disableDepthWrite"]=disableDepthWrite;
	ret["ambient"]=ambient.toJson();
	ret["diffuse"]=diffuse.toJson();
	ret["specular"]=specular.toJson();
	ret["specularPower"]=specularPower;
	ret["emissive"]=emissive.toJson();
	ret["alpha"]=alpha;
	ret["backFaceCulling"]=backFaceCulling;
	ret["wireframe"]=wireframe;
	ret["diffuseTexture"]=diffuseTexture.toJson();
	ret["ambientTexture"]=ambientTexture.toJson();
	ret["opacityTexture"]=opacityTexture.toJson();
	ret["reflectionTexture"]=reflectionTexture.toJson();
	ret["refractionTexture"]=refractionTexture.toJson();
	ret["indexOfRefraction"]=indexOfRefraction;
	ret["emissiveTexture"]=emissiveTexture.toJson();
	ret["specularTexture"]=specularTexture.toJson();
	ret["bumpTexture"]=bumpTexture.toJson();
	ret["lightmapTexture"]=lightmapTexture.toJson();
	ret["useLightmapAsShadowmap"]=useLightmapAsShadowmap;
	ret["checkReadOnlyOnce"]=checkReadOnlyOnce;
	ret["useReflectionFresnelFromSpecular"]=useReflectionFresnelFromSpecular;
	ret["useEmissiveAsIllumination"]=useEmissiveAsIllumination;
	ret["diffuseFresnelParameters"]=diffuseFresnelParameters.toJson();
	ret["opacityFresnelParameters"]=opacityFresnelParameters.toJson();
	ret["reflectionFresnelParameters"]=reflectionFresnelParameters.toJson();
	ret["refractionFresnelParameters"]=refractionFresnelParameters.toJson();
	ret["emissiveFresnelParameters"]=emissiveFresnelParameters.toJson();
	return ret;
}

//--------------------------------------------------------------------------------
//ReflectionProbe
ReflectionProbe::ReflectionProbe(){
}
ReflectionProbe::~ReflectionProbe(){
}
const Json::Value ReflectionProbe::toJson(){
	Json::Value ret;
	ret["refreshRate"]=refreshRate;
	ret["isCube"]=isCube;
	ret["is3D"]=is3D;
	ret["renderTragetSize"]=renderTragetSize;
	ret["renderList"]=Json::arrayValue;
	for(
		std::vector<std::string>::iterator it=renderList.begin();
		it!=renderList.end();
		++it
	){
		ret["renderList"].append(*it);
	}
	return ret;
}
//--------------------------------------------------------------------------------
//RenderTragetTexture
RenderTargetTexture::RenderTargetTexture(){
}
RenderTargetTexture::~RenderTargetTexture(){
}
const Json::Value RenderTargetTexture::toJson(){
	Json::Value ret;
	//todo
	return ret;
}
//--------------------------------------------------------------------------------
//_Geometry
_Geometry::_Geometry(){
}
_Geometry::~_Geometry(){
}
const Json::Value _Geometry::toJson(){
	Json::Value ret;
	ret["boxes"]=Json::arrayValue;
	for(
		std::vector<Box>::iterator it=boxes.begin();
		it!=boxes.end();
		++it
	){
		ret["boxes"].append((*it).toJson());
	}
	ret["spheres"]=Json::arrayValue;
	for(
		std::vector<Sphere>::iterator it=spheres.begin();
		it!=spheres.end();
		++it
	){
		ret["spheres"].append((*it).toJson());
	}
	ret["cylinders"]=Json::arrayValue;
	for(
		std::vector<Cylinder>::iterator it=cylinders.begin();
		it!=cylinders.end();
		++it
	){
		ret["cylinders"].append((*it).toJson());
	}
	ret["toruses"]=Json::arrayValue;
	for(
		std::vector<Torus>::iterator it=toruses.begin();
		it!=toruses.end();
		++it
	){
		ret["toruses"].append((*it).toJson());
	}
	ret["grounds"]=Json::arrayValue;
	for(
		std::vector<Ground>::iterator it=grounds.begin();
		it!=grounds.end();
		++it
	){
		ret["grounds"].append((*it).toJson());
	}
	ret["planes"]=Json::arrayValue;
	for(
		std::vector<Plane>::iterator it=planes.begin();
		it!=planes.end();
		++it
	){
		ret["planes"].append((*it).toJson());
	}
	ret["torusKnots"]=Json::arrayValue;
	for(
		std::vector<TorusKnot>::iterator it=torusKnots.begin();
		it!=torusKnots.end();
		++it
	){
		ret["torusKnots"].append((*it).toJson());
	}
	ret["vertexData"]=Json::arrayValue;
	for(
		std::vector<VertexData>::iterator it=vertexData.begin();
		it!=vertexData.end();
		++it
	){
		ret["vertexData"].append((*it).toJson());
	}
	return ret;
}
//--------------------------------------------------------------------------------
//Box
Box::Box(){
}
Box::~Box(){
}
const Json::Value Box::toJson(){
	Json::Value ret;
	ret["id"]=id;
	ret["size"]=size;
	ret["canBeRegenerated"]=canBeRegenerated;
	ret["tags"]=tags;
	return ret;
}
//--------------------------------------------------------------------------------
//Sphere
Sphere::Sphere(){
}
Sphere::~Sphere(){
}
const Json::Value Sphere::toJson(){
	Json::Value ret;
	ret["id"]=id;
	ret["segments"]=segments;
	ret["diameter"]=diameter;
	ret["canBeRegenerated"]=canBeRegenerated;
	ret["tags"]=tags;
	return ret;
}
//--------------------------------------------------------------------------------
//Cylinder
Cylinder::Cylinder(){
}
Cylinder::~Cylinder(){
}
const Json::Value Cylinder::toJson(){
	Json::Value ret;
	ret["id"]=id;
	ret["height"]=height;
	ret["diameterTop"]=diameterTop;
	ret["diameterBottom"]=diameterBottom;
	ret["tesselation"]=tesselation;
	ret["subdivisions"]=subdivisions;
	ret["canBeRegenerated"]=canBeRegenerated;
	ret["tags"]=tags;
	return ret;
}
//--------------------------------------------------------------------------------
//Torus
Torus::Torus(){
}
Torus::~Torus(){
}
const Json::Value Torus::toJson(){
	Json::Value ret;
	ret["id"]=id;
	ret["diameter"]=diameter;
	ret["thickness"]=thickness;
	ret["tesselation"]=tesselation;
	ret["canBeRegenerated"]=canBeRegenerated;
	ret["tags"]=tags;
	return ret;
}
//--------------------------------------------------------------------------------
//Ground
Ground::Ground(){
}
Ground::~Ground(){
}
const Json::Value Ground::toJson(){
	Json::Value ret;
	ret["id"]=id;
	ret["width"]=width;
	ret["height"]=height;
	ret["subdivisions"]=subdivisions;
	ret["canBeRegenerated"]=canBeRegenerated;
	ret["tags"]=tags;
	return ret;
}
//--------------------------------------------------------------------------------
//Plane
Plane::Plane(){
}
Plane::~Plane(){
}
const Json::Value Plane::toJson(){
	Json::Value ret;
	ret["id"]=id;
	ret["size"]=size;
	ret["canBeRegenerated"]=canBeRegenerated;
	ret["tags"]=tags;
	return ret;
}
//--------------------------------------------------------------------------------
//TorusKnot
TorusKnot::TorusKnot(){
}
TorusKnot::~TorusKnot(){
}
const Json::Value TorusKnot::toJson(){
	Json::Value ret;
	ret["id"]=id;
	ret["radius"]=radius;
	ret["tube"]=tube;
	ret["radialSegments"]=radialSegments;
	ret["tubularSegments"]=tubularSegments;
	ret["p"]=p;
	ret["q"]=q;
	ret["canBeRegenerated"]=canBeRegenerated;
	ret["tags"]=tags;
	return ret;
}
//--------------------------------------------------------------------------------
//VertexData
VertexData::VertexData(){
}
VertexData::~VertexData(){
}
const Json::Value VertexData::toJson(){
	Json::Value ret;
	ret["id"]=id;
	ret["updatable"]=updatable;
	ret["positions"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=positions.begin();
		it!=positions.end();
		++it
	){
		ret["positions"].append(*it);
	}
	ret["normals"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=normals.begin();
		it!=normals.end();
		++it
	){
		ret["normals"].append(*it);
	}
	ret["uvs"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs.begin();
		it!=uvs.end();
		++it
	){
		ret["uvs"].append(*it);
	}
	ret["uvs2"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs2.begin();
		it!=uvs2.end();
		++it
	){
		ret["uvs2"].append(*it);
	}
	ret["uvs3"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs3.begin();
		it!=uvs3.end();
		++it
	){
		ret["uvs3"].append(*it);
	}
	ret["uvs4"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs4.begin();
		it!=uvs4.end();
		++it
	){
		ret["uvs4"].append(*it);
	}
	ret["uvs5"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs5.begin();
		it!=uvs5.end();
		++it
	){
		ret["uvs5"].append(*it);
	}
	ret["uvs6"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs6.begin();
		it!=uvs6.end();
		++it
	){
		ret["uvs6"].append(*it);
	}
	ret["colors"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=colors.begin();
		it!=colors.end();
		++it
	){
		ret["colors"].append(*it);
	}
	ret["matricesIndices"]=Json::arrayValue;
	for(
		std::vector<int>::iterator it=matricesIndices.begin();
		it!=matricesIndices.end();
		++it
	){
		ret["matricesIndices"].append(*it);
	}
	ret["matricesWeights"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=matricesWeights.begin();
		it!=matricesWeights.end();
		++it
	){
		ret["matricesWeights"].append(*it);
	}
	ret["indices"]=Json::arrayValue;
	for(
		std::vector<int>::iterator it=indices.begin();
		it!=indices.end();
		++it
	){
		ret["indices"].append(*it);
	}
	ret["tags"]=tags;
	return ret;
}
//--------------------------------------------------------------------------------
//MultiMaterial
MultiMaterial::MultiMaterial(){
}
MultiMaterial::~MultiMaterial(){
}
const Json::Value MultiMaterial::toJson(){
	Json::Value ret;
	ret["boxes"]=Json::arrayValue;
	for(
		std::vector<Box>::iterator it=boxes.begin();
		it!=boxes.end();
		++it
	){
		ret["boxes"].append((*it).toJson());
	}

	//ockert
	/*
		std::vector<Box>		boxes;//array of Box
		std::vector<Sphere>		spheres;//array of Sphere
		std::vector<Cylinder>		cylinders;//array of Cylinder
		std::vector<Torus>		toruses;//array of Torus
		std::vector<Ground>		grounds;//array of Ground
		std::vector<Plane>		planes;//array of Plane
		std::vector<TorusKnot>		torusKnots;//arrray of TorusKnot
		std::vector<VertexData>		vertexData;//array of VertexData
	*/


	return ret;
}

//--------------------------------------------------------------------------------
//Instance
Instance::Instance(){
}
Instance::~Instance(){
}
const Json::Value Instance::toJson(){
	Json::Value ret;
	ret["name"]=name;
	ret["tags"]=tags;
	ret["position"]=position.toJson();
	ret["rotation"]=rotation.toJson();
	ret["rotationQuaternion"]=rotationQuaternion.toJson();
	ret["scaling"]=scaling.toJson();
	return ret;
}
//--------------------------------------------------------------------------------
//Mesh
Mesh::Mesh(){
}
Mesh::~Mesh(){
}
const Json::Value Mesh::toJson(){
	Json::Value ret;
	ret["name"]=name;
	ret["id"]=id;
	ret["tags"]=tags;
	ret["parentId"]=parentId;
	ret["materialId"]=materialId;
	ret["geometryId"]=geometryId;
	ret["position"]=position.toJson();
	ret["rotation"]=rotation.toJson();
	ret["rotationQuaternion"]=rotationQuaternion.toJson();
	ret["scaling"]=scaling.toJson();
	ret["pivotMatrix"]=pivotMatrix.toJson();
	ret["freezWorldMatrix"]=freezWorldMatrix;
	ret["infiniteDistance"]=infiniteDistance;
	ret["showBoundingBox"]=showBoundingBox;
	ret["showSubMeshesBoundingBox"]=showSubMeshesBoundingBox;
	ret["isInvisible"]=isInvisible;
	ret["isEnabled"]=isEnabled;
	ret["pickable"]=pickable;
	ret["applyFog"]=applyFog;
	ret["alphaIndex"]=alphaIndex;
	ret["checkCollisions"]=checkCollisions;
	ret["billboardMode"]=billboardMode;
	ret["receiveShadows"]=receiveShadows;
	ret["physicsImpostor"]=physicsImpostor;
	ret["physicsMass"]=physicsMass;
	ret["physicsFriction"]=physicsFriction;
	ret["physicsRestitution"]=physicsRestitution;
	ret["positions"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=positions.begin();
		it!=positions.end();
		++it
	){
		ret["positions"].append(*it);
	}
	ret["normals"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=normals.begin();
		it!=normals.end();
		++it
	){
		ret["normals"].append(*it);
	}
	ret["uvs"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs.begin();
		it!=uvs.end();
		++it
	){
		ret["uvs"].append(*it);
	}
	ret["uvs2"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs2.begin();
		it!=uvs2.end();
		++it
	){
		ret["uvs2"].append(*it);
	}
	ret["uvs3"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs3.begin();
		it!=uvs3.end();
		++it
	){
		ret["uvs3"].append(*it);
	}
	ret["uvs4"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs4.begin();
		it!=uvs4.end();
		++it
	){
		ret["uvs4"].append(*it);
	}
	ret["uvs5"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs5.begin();
		it!=uvs5.end();
		++it
	){
		ret["uvs5"].append(*it);
	}
	ret["uvs6"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=uvs6.begin();
		it!=uvs6.end();
		++it
	){
		ret["uvs6"].append(*it);
	}
	ret["colors"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=colors.begin();
		it!=colors.end();
		++it
	){
		ret["colors"].append(*it);
	}
	ret["hasVertexAlpha"]=hasVertexAlpha;
	ret["matricesIndices"]=Json::arrayValue;
	for(
		std::vector<int>::iterator it=matricesIndices.begin();
		it!=matricesIndices.end();
		++it
	){
		ret["matricesIndices"].append(*it);
	}
	ret["matricesWeights"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=matricesWeights.begin();
		it!=matricesWeights.end();
		++it
	){
		ret["keys"].append(*it);
	}
	ret["indices"]=Json::arrayValue;
	for(
		std::vector<int>::iterator it=indices.begin();
		it!=indices.end();
		++it
	){
		ret["indices"].append(*it);
	}
	ret["subMeshes"]=Json::arrayValue;
	for(
		std::vector<SubMesh>::iterator it=subMeshes.begin();
		it!=subMeshes.end();
		++it
	){
		ret["subMeshes"].append((*it).toJson());
	}
		std::vector<Animation>		animations;//array of Animations (can be omitted)
	ret["autoAnimate"]=autoAnimate;
	ret["autoAnimateFrom"]=autoAnimateFrom;
	ret["autoAnimateTo"]=autoAnimateTo;
	ret["autoAnimateLoop"]=autoAnimateLoop;
	ret["autoAnimateSpeed"]=autoAnimateSpeed;
	ret["instances"]=Json::arrayValue;
	for(
		std::vector<Instance>::iterator it=instances.begin();
		it!=instances.end();
		++it
	){
		ret["instances"].append((*it).toJson());
	}
	ret["actions"]=Json::arrayValue;
	for(
		std::vector<Action>::iterator it=actions.begin();
		it!=actions.end();
		++it
	){
		ret["actions"].append((*it).toJson());
	}

	return ret;
}
//--------------------------------------------------------------------------------
//SubMesh
SubMesh::SubMesh(){
}
SubMesh::~SubMesh(){
}
const Json::Value SubMesh::toJson(){
	Json::Value ret;
	ret["materialIndex"]=materialIndex;
	ret["verticesStart"]=verticesStart;
	ret["verticesCount"]=verticesCount;
	ret["indexStart"]=indexStart;
	ret["indexCount"]=indexCount;
	return ret;
}
//--------------------------------------------------------------------------------
//Animation
Animation::Animation(){
}
Animation::~Animation(){
}
const Json::Value Animation::toJson(){
	Json::Value ret;
	ret["dataType"]=dataType;
	ret["framePerSecond"]=framePerSecond;
	ret["loopBehavior"]=loopBehavior;
	ret["name"]=name;
	ret["property"]=property;
	ret["keys"]=Json::arrayValue;
	for(
		std::vector<AnimationKey>::iterator it=keys.begin();
		it!=keys.end();
		++it
	){
		ret["keys"].append((*it).toJson());
	}
	ret["autoAnimate"]=autoAnimate;
	ret["autoAnimateFrom"]=autoAnimateFrom;
	ret["autoAnimateTo"]=autoAnimateTo;
	ret["autoAnimateLoop"]=autoAnimateLoop;
	return ret;
}
//--------------------------------------------------------------------------------
//AnimationKey
AnimationKey::AnimationKey(){
}
AnimationKey::~AnimationKey(){
}
const Json::Value AnimationKey::toJson(){
	Json::Value ret;
	ret["frame"]=frame;
	ret["values"]=Json::arrayValue;
	for(
		std::vector<float>::iterator it=values.begin();
		it!=values.end();
		++it
	){
		ret["values"].append(*it);
	}
	return ret;
}
//--------------------------------------------------------------------------------
//ShadowGenerator
ShadowGenerator::ShadowGenerator(){
}
ShadowGenerator::~ShadowGenerator(){
}
const Json::Value ShadowGenerator::toJson(){
	Json::Value ret;
	ret["useBlurVarianceShadowMap"]=useBlurVarianceShadowMap;
	ret["useVarianceShadowMap"]=useVarianceShadowMap;
	ret["usePoissonSampling"]=usePoissonSampling;
	ret["mapSize"]=mapSize;
	ret["bias"]=bias;
	ret["forceBackFacesOnly"]=forceBackFacesOnly;
	ret["lightId"]=lightId;
	ret["renderList"]=Json::arrayValue;
	for(
		std::vector<std::string>::iterator it=renderList.begin();
		it!=renderList.end();
		++it
	){
		ret["renderList"].append(*it);
	}
	return ret;
}
//--------------------------------------------------------------------------------
//Skeleton
Skeleton::Skeleton(){
}
Skeleton::~Skeleton(){
}
const Json::Value Skeleton::toJson(){
	Json::Value ret;
	ret["name"]=name;
	ret["id"]=id;
	ret["bones"]=Json::arrayValue;
	for(
		std::vector<Bone>::iterator it=bones.begin();
		it!=bones.end();
		++it
	){
		ret["bones"].append((*it).toJson());
	}
	ret["needInitialSkinMatrix"]=needInitialSkinMatrix;
	return ret;
}
//--------------------------------------------------------------------------------
//Bone
Bone::Bone(){
}
Bone::~Bone(){
}
const Json::Value Bone::toJson(){
	Json::Value ret;
	ret["parentBoneIndex"]=parentBoneIndex;
	ret["name"]=name;
	ret["matrix"]=matrix.toJson();
	ret["animations"]=Json::arrayValue;
	for(
		std::vector<Animation>::iterator it=animations.begin();
		it!=animations.end();
		++it
	){
		ret["animations"].append((*it).toJson());
	}
	return ret;
}
//--------------------------------------------------------------------------------
//ParticleSystem
ParticleSystem::ParticleSystem(){
}
ParticleSystem::~ParticleSystem(){
}
const Json::Value ParticleSystem::toJson(){
	Json::Value ret;
	ret["emitterId"]=emitterId;
	ret["gravity"]=gravity.toJson();
	ret["direction1"]=direction1.toJson();
	ret["direction2"]=direction2.toJson();
	ret["minEmitBox"]=minEmitBox.toJson();;
	ret["maxEmitBox"]=maxEmitBox.toJson();;
	ret["color1"]=color1.toJson();
	ret["color2"]=color2.toJson();
	ret["colorDead"]=colorDead.toJson();
	ret["deadAlpha"]=deadAlpha;
	ret["emitRate"]=emitRate;
	ret["updateSpeed"]=updateSpeed;
	ret["targetStopFrame"]=targetStopFrame;
	ret["minEmitPower"]=minEmitPower;
	ret["maxemitPower"]=maxemitPower;
	ret["minLifeTime"]=minLifeTime;
	ret["maxLifeTime"]=maxLifeTime;
	ret["minSize"]=minSize;
	ret["maxSize"]=maxSize;
	ret["minAngularSPeed"]=minAngularSPeed;
	ret["maxAngularSpeed"]=maxAngularSpeed;
	ret["textureName"]=textureName;
	ret["blendMode"]=blendMode;
	ret["capacity"]=capacity;
	ret["textureMask"]=textureMask.toJson();
	ret["linkToEmitter"]=linkToEmitter;
	ret["animations"]=Json::arrayValue;
	for(
		std::vector<Animation>::iterator it=animations.begin();
		it!=animations.end();
		++it
	){
		ret["animations"].append((*it).toJson());
	}
	ret["autoAnimate"]=autoAnimate;
	ret["autoAnimateFrom"]=autoAnimateFrom;
	ret["autoAnimateTo"]=autoAnimateTo;
	ret["autoAnimteLoop"]=autoAnimteLoop;
	ret["autoAnimateSpeed"]=autoAnimateSpeed;
	return ret;
}
//--------------------------------------------------------------------------------
//LensFlareSystem
LensFlareSystem::LensFlareSystem(){
}
LensFlareSystem::~LensFlareSystem(){
}
const Json::Value LensFlareSystem::toJson(){
	Json::Value ret;
	ret["emitterId"]=emitterId;
	ret["borderLimit"]=borderLimit;
	ret["flares"]=Json::arrayValue;
	for(
		std::vector<LensFlare>::iterator it=flares.begin();
		it!=flares.end();
		++it
	){
		ret["flares"].append((*it).toJson());
	}
	return ret;
}
//--------------------------------------------------------------------------------
//LensFlare
LensFlare::LensFlare(){
}
LensFlare::~LensFlare(){
}
const Json::Value LensFlare::toJson(){
	Json::Value ret;
	ret["position"]=position;
	ret["size"]=size;
	ret["color"]=color.toJson();
	ret["textureName"]=textureName;
	return ret;
}
//--------------------------------------------------------------------------------
//Sound
Sound::Sound(){
}
Sound::~Sound(){
}
const Json::Value Sound::toJson(){
	Json::Value ret;
	ret["name"]=name;
	ret["volume"]=volume;
	ret["autoplay"]=autoplay;
	ret["loop"]=loop;
	ret["soundTraackId"]=soundTraackId;
	ret["spacialSound"]=spacialSound;
	ret["position"]=position.toJson();
	ret["refDistance"]=refDistance;
	ret["rolloffFactor"]=rolloffFactor;
	ret["maxDistance"]=maxDistance;
	ret["distanceModel"]=distanceModel;
	ret["panningModel"]=panningModel;
	ret["isDirectional"]=isDirectional;
	ret["coneInnerAngle"]=coneInnerAngle;
	ret["coneOuterAngle"]=coneOuterAngle;
	ret["coneOuterGain"]=coneOuterGain;
	ret["connectMeshId"]=connectMeshId;
	ret["localDirectionToMesh"]=localDirectionToMesh.toJson();;
	return ret;
}
//--------------------------------------------------------------------------------
//Property
Property::Property(){
}
Property::~Property(){
}
const Json::Value Property::toJson(){
	Json::Value ret;
	ret["name"]=name;
	ret["value"]=value;
	ret["targetType"]=targetType;
	return ret;
}
//--------------------------------------------------------------------------------
//Action
Action::Action(){
}
Action::~Action(){
}
const Json::Value Action::toJson(){
	Json::Value ret;
	ret["type"]=type;
	ret["name"]=name;
	ret["detached"]=detached;
	ret["properties"]=Json::arrayValue;
	for(
		std::vector<Property>::iterator it=properties.begin();
		it!=properties.end();
		++it
	){
		ret["properties"].append((*it).toJson());
	}
	ret["children"]=Json::arrayValue;
	for(
		std::vector<Action>::iterator it=children.begin();
		it!=children.end();
		++it
	){
		ret["children"].append((*it).toJson());
	}
	ret["combine"]=Json::arrayValue;
	for(
		std::vector<Action>::iterator it=combine.begin();
		it!=combine.end();
		++it
	){
		ret["combine"].append((*it).toJson());
	}
	return ret;
}

//--------------------------------------------------------------------------------
//Babylon
Babylon::Babylon(){
}
Babylon::~Babylon(){
}
//ostream & operator <<(ostream &out,const Babylon &b){
ostream & operator <<(ostream &out,Babylon &b){
	Json::Value root;
	root["name"]=b.name;
	root["id"]=b.id;
	root["type"]=b.type;
	root["tags"]=b.tags;
	root["parentId"]=b.parentId;
	root["lockedTargetId"]=b.lockedTargetId;
	root["position"]=b.position.toJson();
	root["target"]=b.target.toJson();
	root["alpha"]=b.alpha;
	root["beta"]=b.beta;
	root["radius"]=b.radius;
	root["eye_space"]=b.eye_space;
	root["heightOffset"]=b.heightOffset;
	root["rotationOffset"]=b.rotationOffset;
	root["cameraRigMode"]=b.cameraRigMode;
	root["fov"]=b.fov;
	root["minZ"]=b.minZ;
	root["maxZ"]=b.maxZ;
	root["speed"]=b.speed;
	root["intertia"]=b.intertia;
	root["checkCollisions"]=b.checkCollisions;
	root["applyGravity"]=b.applyGravity;
	root["ellipsoid"]=b.ellipsoid.toJson();
	root["animations"]=Json::arrayValue;
	for(
		std::vector<Animation>::iterator it=b.animations.begin();
		it!=b.animations.end();
		++it
	){
		root["animations"].append((*it).toJson());
	}
	root["autoAnimate"]=b.autoAnimate;
	root["autoAnimateFrom"]=b.autoAnimateFrom;
	root["autoAnimateTo"]=b.autoAnimateTo;
	root["autoAnimateLoop"]=b.autoAnimateLoop;
	root["autoAnimateSpeed"]=b.autoAnimateSpeed;
	root["inputmgr"]=b.inputmgr.toJson();
	out<<root;
	return out;
}
istream & operator >>(istream &in,Babylon &b){
	return in;
}
//--------------------------------------------------------------------------------
//_Global
_Global::_Global(){
}
_Global::~_Global(){
}
const Json::Value _Global::toJson(){
	Json::Value ret;
	//todo
	ret["autoClear"]=autoClear;
	ret["clearColor"]=clearColor.toJson();
	ret["ambientColor"]=ambientColor.toJson();
	ret["gravity"]=gravity.toJson();
	ret["cameras"]=Json::arrayValue;
	for(
		std::vector<Camera>::iterator it=cameras.begin();
		it!=cameras.end();
		++it
	){
		ret["cameras"].append((*it).toJson());
	}
	ret["activeCamera_"]=activeCamera_;
	ret["lights"]=Json::arrayValue;
	for(
		std::vector<Light>::iterator it=lights.begin();
		it!=lights.end();
		++it
	){
		ret["lights"].append((*it).toJson());
	}
	ret["reflectionProbes"]=Json::arrayValue;
	for(
		std::vector<ReflectionProbe>::iterator it=reflectionProbes.begin();
		it!=reflectionProbes.end();
		++it
	){
		ret["reflectionProbes"].append((*it).toJson());
	}
	ret["materials"]=Json::arrayValue;
	for(
		std::vector<Material>::iterator it=materials.begin();
		it!=materials.end();
		++it
	){
		ret["materials"].append((*it).toJson());
	}
	ret["geometries"]=geometries.toJson();
	ret["meshes"]=Json::arrayValue;
	for(
		std::vector<Mesh>::iterator it=meshes.begin();
		it!=meshes.end();
		++it
	){
		ret["meshes"].append((*it).toJson());
	}
	ret["multiMaterials"]=Json::arrayValue;
	for(
		std::vector<MultiMaterial>::iterator it=multiMaterials.begin();
		it!=multiMaterials.end();
		++it
	){
		ret["multiMaterials"].append((*it).toJson());
	}
	ret["shadowGenerators"]=Json::arrayValue;
	for(
		std::vector<ShadowGenerator>::iterator it=shadowGenerators.begin();
		it!=shadowGenerators.end();
		++it
	){
		ret["shadowGenerators"].append((*it).toJson());
	}
	ret["skeletons"]=Json::arrayValue;
	for(
		std::vector<Skeleton>::iterator it=skeletons.begin();
		it!=skeletons.end();
		++it
	){
		ret["skeletons"].append((*it).toJson());
	}
	ret["particleSystems"]=Json::arrayValue;
	for(
		std::vector<ParticleSystem>::iterator it=particleSystems.begin();
		it!=particleSystems.end();
		++it
	){
		ret["particleSystems"].append((*it).toJson());
	}
	ret["lensFlareSystems"]=Json::arrayValue;
	for(
		std::vector<LensFlareSystem>::iterator it=lensFlareSystems.begin();
		it!=lensFlareSystems.end();
		++it
	){
		ret["lensFlareSystems"].append((*it).toJson());
	}
	ret["actions"]=Json::arrayValue;
	for(
		std::vector<Action>::iterator it=actions.begin();
		it!=actions.end();
		++it
	){
		ret["actions"].append((*it).toJson());
	}
	ret["sounds"]=Json::arrayValue;
	for(
		std::vector<Sound>::iterator it=sounds.begin();
		it!=sounds.end();
		++it
	){
		ret["sounds"].append((*it).toJson());
	}
	ret["collisionsEnabled"]=collisionsEnabled;
	ret["physicsEnabled"]=physicsEnabled;
	ret["physicsGravity"]=physicsGravity.toJson();
	ret["physicsEngine"]=physicsEngine;
	ret["animations"]=Json::arrayValue;
	for(
		std::vector<Animation>::iterator it=animations.begin();
		it!=animations.end();
		++it
	){
		ret["animations"].append((*it).toJson());
	}
	ret["autoAnimate"]=autoAnimate;
	ret["autoAnimateFrom"]=autoAnimateFrom;
	ret["autoAnimateTo"]=autoAnimateTo;
	ret["autoAnimateLoop"]=autoAnimateLoop;
	ret["autoAnimateSpeed"]=autoAnimateSpeed;
	return ret;
}
//ostream & operator <<(ostream &out,const Babylon &b){
ostream & operator <<(ostream &out,_Global &b){
	out<<b.toJson();
	return out;
}
istream & operator >>(istream &in,_Global &b){
	return in;
}
