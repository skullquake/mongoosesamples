#include"ctl/ctl.h"
using namespace std;
using namespace Mongoose;
using namespace ctl;
void r(Json::Value&,std::vector<std::string>,int);
void MyController::tree(Request &request, StreamResponse &response){
	foo::Foo f;
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
	root["idx"]=cpputils::UUID::generateUUID();
	root["name"]="foo";
	r(root,v,d);
	j["items"].append(root);
	Json::StreamWriterBuilder styledWriter;
	response.setHeader("Content-type","application/json");
	std::unique_ptr<Json::StreamWriter> writer(styledWriter.newStreamWriter());
	writer->write(j,&response);
	response<<std::endl;
}
void MyController::chart(Request &request, StreamResponse &response){
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
	Json::StreamWriterBuilder styledWriter;
	response.setHeader("Content-type","application/json");
	std::unique_ptr<Json::StreamWriter> writer(styledWriter.newStreamWriter());
	writer->write(j,&response);
	response<<std::endl;
}
void MyController::piechart(Request &request, StreamResponse &response){
	Json::Value j=Json::Value(Json::arrayValue);
	for(int i=0;i<8;i++){
		Json::Value itm;
		itm["x"]=1;
		itm["y"]=(rand()%100)/100.0;
		j.append(itm);
	}
	Json::StreamWriterBuilder styledWriter;
	response.setHeader("Content-type","application/json");
	std::unique_ptr<Json::StreamWriter> writer(styledWriter.newStreamWriter());
	writer->write(j,&response);
	response<<std::endl;
}
void MyController::scatterchart(Request &request, StreamResponse &response){
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
	Json::StreamWriterBuilder styledWriter;
	response.setHeader("Content-type","application/json");
	std::unique_ptr<Json::StreamWriter> writer(styledWriter.newStreamWriter());
	writer->write(j,&response);
	response<<std::endl;
}
void MyController::setup(){
	addRoute("GET","/tree",MyController,tree);
	addRoute("GET","/chart",MyController,chart);
	addRoute("GET","/piechart",MyController,piechart);
	addRoute("GET","/scatterchart",MyController,scatterchart);
}
void r(Json::Value& j,std::vector<std::string> v,int i){
	if(i<=0){
		return;
	}else{
		for(std::string x:v){
			Json::Value itm;
			itm["name"]=x;
			itm["idx"]=cpputils::UUID::generateUUID();
			itm["children"]=Json::Value(Json::arrayValue);
			for(std::string _x:v){
				Json::Value citm;
				citm["name"]=_x;
				citm["idx"]=cpputils::UUID::generateUUID();
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
