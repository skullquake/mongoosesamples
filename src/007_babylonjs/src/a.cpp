#include<mongoose-cpp/Server.h>
#include<mongoose-cpp/WebController.h>
#include<algorithm>
#include<cstddef>
#include<cstdlib>
#include<fstream>
#include<iostream>
#include<iterator>
#include<json/json.h>
#include<numeric>
#include<signal.h>
#include<sstream>
#include<string.h>
#include<string>
#include<unistd.h>
#include<utility>
#include<vector>
#include<Poco/Base64Encoder.h>


using namespace std;
using namespace Mongoose;
//binary outputstream
template<class T,class CharT=char,class Traits=std::char_traits<CharT>>
class ostreambin_iterator:public std::iterator<std::output_iterator_tag,void,void,void,void>{
	public:
		typedef std::basic_ostream<CharT,Traits> ostream_type;
		typedef Traits traits_type;
		typedef CharT char_type;
		ostreambin_iterator(ostream_type& stream):stream_(stream){}
		ostreambin_iterator& operator=(T const& value){
			stream_.write(reinterpret_cast<const char*>(&value),sizeof(T));
			return *this;
		}
		ostreambin_iterator& operator*(){return *this;}
		ostreambin_iterator& operator++(){return *this;}
		ostreambin_iterator& operator++(int){return *this;}
	protected:
		ostream_type& stream_;
};
class MyController:public WebController{
	public: 
		void gltf(Request &request, StreamResponse &response){
			std::cout<<"gltf()"<<std::endl;
			Json::Value j;

			j["scenes"]=Json::Value(Json::arrayValue);
			Json::Value scene=Json::Value();
			scene["nodes"].append(0);
			j["scenes"].append(scene);

			j["nodes"]=Json::Value(Json::arrayValue);
			Json::Value node=Json::Value();
			node["mesh"].append(0);
			j["nodes"].append(node);

			j["meshes"]=Json::Value(Json::arrayValue);
			Json::Value mesh=Json::Value();
			mesh["primitives"]=Json::Value(Json::arrayValue);
			Json::Value primitive=Json::Value();
			primitive["attributes"]=Json::Value();
			primitive["attributes"]["POSITION"]=1;
			primitive["indices"]=0;
			mesh["primitives"].append(primitive);
			j["meshes"].append(mesh);

			j["buffers"]=Json::Value(Json::arrayValue);
			Json::Value buffer=Json::Value();

			std::ostringstream oss;
			Poco::Base64Encoder b64out(
				oss,
				Poco::BASE64_NO_PADDING
			);
			ostreambin_iterator<float> outvpos(b64out);
			//idx:flat
			std::vector<uint16_t> vidx;
			vidx.push_back(0);
			vidx.push_back(1);
			vidx.push_back(2);
			vidx.push_back(0);//pad
			std::vector<uint16_t> vidx2={0,1,2,0};
			ostreambin_iterator<uint16_t> outvidx(b64out);
			copy(std::begin(vidx),std::end(vidx),outvidx);
			/*
			//idx:flat
			std::vector<float> vpos;
			vpos.push_back(0);vpos.push_back(0);vpos.push_back(0);
			vpos.push_back(1);vpos.push_back(0);vpos.push_back(0);
			vpos.push_back(0);vpos.push_back(1);vpos.push_back(0);
			copy(std::begin(vpos),std::end(vpos),outvpos);
			*/
			std::vector<std::vector<float>> vposc={
				{1,0,0},
				{0,1,0},
				{0,0,0}
			};
			for(auto vpos:vposc){
				copy(std::begin(vpos),std::end(vpos),outvpos);
			}
			b64out.close();

			buffer["uri"]="data:application/octet-stream;base64,"+oss.str();
			//kronos triangle
			//AAABAAIAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAA=",
			buffer["byteLength"]=44;
			j["buffers"].append(buffer);

			j["bufferViews"]=Json::Value(Json::arrayValue);
			{
				Json::Value bufferView=Json::Value();
				bufferView["buffer"]=0;
				bufferView["byteOffset"]=0;
				bufferView["byteLength"]=6;
				bufferView["target"]=34963;
				j["bufferViews"].append(bufferView);
			}
			{
				Json::Value bufferView=Json::Value();
				bufferView["buffer"]=0;
				bufferView["byteOffset"]=8;
				bufferView["byteLength"]=36;
				bufferView["target"]=34962;
				j["bufferViews"].append(bufferView);
			}


			j["accessors"]=Json::Value(Json::arrayValue);
			{
				Json::Value accessor=Json::Value();
				accessor["bufferView"]=0;
				accessor["byteOffset"]=0;
				accessor["componentType"]=5123;
				accessor["count"]=3;
				accessor["type"]="SCALAR";
				accessor["max"]=Json::Value(Json::arrayValue);
				accessor["max"].append(2);
				accessor["min"]=Json::Value(Json::arrayValue);
				accessor["min"].append(0);
				j["accessors"].append(accessor);
			}
			{
				Json::Value accessor=Json::Value();
				accessor["bufferView"]=1;
				accessor["byteOffset"]=0;
				accessor["componentType"]=5126;
				accessor["count"]=3;
				accessor["type"]="VEC3";
				accessor["max"]=Json::Value(Json::arrayValue);
				accessor["max"].append(1);
				accessor["max"].append(1);
				accessor["max"].append(0);
				accessor["min"]=Json::Value(Json::arrayValue);
				accessor["min"].append(0);
				accessor["min"].append(0);
				accessor["min"].append(0);
				j["accessors"].append(accessor);
			}
			{
				j["asset"]=Json::Value();
				j["asset"]["version"]="2.0";
			}
			Json::StyledWriter styledWriter;
			response.setHeader("Content-type","application/json");
			response<<styledWriter.write(j)<<std::endl;
		}
		void setup(){
			addRoute("GET","/res/a.gltf",MyController,gltf);
		}
};
int main(int argc,char** argv){
	MyController myController;
	Server server(8080);
	server.registerController(&myController);
	server.setOption("enable_directory_listing","yes");
	server.setOption("document_root","./pub");
	server.setOption("access_log_file","./log.txt");
	server.start(); 
	while(1){
		sleep(10000);
	}
}

