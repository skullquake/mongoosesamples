//#include<windows.h>
#include<boost/uuid/uuid.hpp>
#include<boost/uuid/uuid_generators.hpp>
#include<boost/uuid/uuid_io.hpp>
#include<unistd.h>
#include<signal.h>
#include<mongoosecpp/Server.h>
#include<mongoosecpp/WebController.h>
#include<string>
#include<iostream>
#include<Poco/Base64Encoder.h>
#include<iostream>
#include<sstream>

#include<json/json.h>
using namespace std;
using namespace Mongoose;
void r(Json::Value&,std::vector<std::string>,int);
class MyController:public WebController{
	public: 
		void tree(Request &request, StreamResponse &response){
			int d;
			try{
				d=std::stoi(htmlEntities(request.get("depth")));
			}catch (std::invalid_argument const &e){
				std::cout << "Bad input: std::invalid_argument thrown" << '\n';
				d=1;
			}catch (std::out_of_range const &e){
				std::cout << "Integer overflow: std::out_of_range thrown" << '\n';
				d=1;
			}
			std::vector<std::string> v{"foo","bar","baz","qux","klutz"}; 
			Json::Value j;
			j["identifier"]="idx";
			j["label"]="name";
			j["items"]=Json::Value(Json::arrayValue);
			Json::Value root;
			root["idx"]=boost::uuids::to_string(boost::uuids::random_generator()());
			root["name"]="foo";
			r(root,v,d);
			j["items"].append(root);
			Json::StyledWriter styledWriter;
			response.setHeader("Content-type","application/json");
			response<<styledWriter.write(j)<<std::endl;
		}
		void chart(Request &request, StreamResponse &response){
			Json::Value j;
			j["identifier"]="symbol";
			j["idAttribute"]="symbol";
			j["symbol"]="labe";
			j["label"]="name";
			j["items"]=Json::Value(Json::arrayValue);
			std::vector<std::string> vsym={
				"ANDT",
				"ATEU",
				"BGCN",
				"BAYC",
				"CRCR",
				"DTOA"
			};
			for(int i=0;i<8;i++){
				Json::Value itm;
				itm["symbol"]=vsym[rand()%vsym.size()];
				itm["historicPrice"]=Json::Value(Json::arrayValue);
				for(int j=0;j<8;j++){
					itm["historicPrice"].append((rand()%100)/100.0);
				}
				j["items"].append(itm);
			}
			Json::StyledWriter styledWriter;
			response.setHeader("Content-type","application/json");
			response<<styledWriter.write(j)<<std::endl;
		}
		void piechart(Request &request, StreamResponse &response){
			Json::Value j=Json::Value(Json::arrayValue);
			for(int i=0;i<8;i++){
				Json::Value itm;
				itm["x"]=1;
				itm["y"]=(rand()%100)/100.0;
				j.append(itm);
			}
			Json::StyledWriter styledWriter;
			response.setHeader("Content-type","application/json");
			response<<styledWriter.write(j)<<std::endl;
		}
		void scatterchart(Request &request, StreamResponse &response){
			int nval;
			try{
				nval=std::stoi(htmlEntities(request.get("nval")));
			}catch (std::invalid_argument const &e){
				std::cout << "Bad input: std::invalid_argument thrown" << '\n';
				nval=8;
			}catch (std::out_of_range const &e){
				std::cout << "Integer overflow: std::out_of_range thrown" << '\n';
				nval=8;
			}

			Json::Value j;
			std::vector<std::string> snam{"foo","bar","baz","qux","klutz"}; 
			for(
				std::vector<std::string>::const_iterator it=snam.begin();
				it!=snam.end();
				it++
			){
				Json::Value itm;
				for(int i=0;i<nval;i++){
					itm.append(rand());
				}
				j[*it]=itm;
			}
			Json::StyledWriter styledWriter;
			response.setHeader("Content-type","application/json");
			response<<styledWriter.write(j)<<std::endl;
		}
		void gltf(Request &request, StreamResponse &response){
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
			Poco::Base64Encoder encoder(oss);
			std::vector<float> a;
			a.push_back(1);
			a.push_back(2);
			a.push_back(3);
			encoder<<"asdf";//reinterpret_cast<const unsigned char *>(&(a[0]));
			buffer["uri"]=oss.str();
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
				accessor["type"]="SCALAR";
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
			addRoute("GET","/tree",MyController,tree);
			addRoute("GET","/chart",MyController,chart);
			addRoute("GET","/piechart",MyController,piechart);
			addRoute("GET","/scatterchart",MyController,scatterchart);
			addRoute("GET","/gltf",MyController,gltf);
		}
};
int main(int argc,char** argv){
	MyController myController;
	Server server(8080);
	server.registerController(&myController);
	server.setOption("enable_directory_listing","yes");
	server.setOption("document_root","./pub");
	server.start(); 
	while(1){
		sleep(10000);
	}
}
void r(Json::Value& j,std::vector<std::string> v,int i){
	if(i<=0){
		return;
	}else{


		for(std::string x:v){
			Json::Value itm;
			itm["name"]=x;
			itm["idx"]=boost::uuids::to_string(boost::uuids::random_generator()());
			itm["children"]=Json::Value(Json::arrayValue);
			for(std::string _x:v){
				Json::Value citm;
				citm["name"]=_x;
				citm["idx"]=boost::uuids::to_string(boost::uuids::random_generator()());
				if(i>=2){
					citm["children"]=Json::Value(Json::arrayValue);
					r(citm,v,i-1);
				}
				itm["children"].append(citm);
			}
			j["children"].append(itm);
		}
	}
}

