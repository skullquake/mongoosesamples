#include<windows.h>
#include<unistd.h>
#include<signal.h>
#include<mongoosecpp/Server.h>
#include<mongoosecpp/WebController.h>
#include<iostream>
#include<json/json.h>
using namespace std;
using namespace Mongoose;
void r(Json::Value&,std::vector<std::string>,int,long long&);
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
			long long idx=0;
			root["idx"]=idx++;
			root["name"]="foo";
			r(root,v,d,idx);
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

		void setup(){
			addRoute("GET","/tree",MyController,tree);
			addRoute("GET","/chart",MyController,chart);
			addRoute("GET","/piechart",MyController,piechart);
			addRoute("GET","/scatterchart",MyController,scatterchart);
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
		Sleep(10000);
	}
}
void r(Json::Value& j,std::vector<std::string> v,int i,long long& idx){
	if(i<=0){
		return;
	}else{
		for(std::string x:v){
			Json::Value itm;
			itm["name"]=x;
			itm["idx"]=idx++;
			itm["children"]=Json::Value(Json::arrayValue);
			for(std::string _x:v){
				Json::Value citm;
				citm["name"]=_x;
				citm["idx"]=idx++;
				if(i>=2){
					citm["children"]=Json::Value(Json::arrayValue);
					r(citm,v,i-1,idx);
				}
				itm["children"].append(citm);
			}
			j["children"].append(itm);
		}
	}
}
