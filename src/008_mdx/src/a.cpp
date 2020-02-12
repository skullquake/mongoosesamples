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
#include<chrono>
using namespace std;
using namespace Mongoose;
class CtlMain:public WebController{
	public: 
		void xas(Request &request, StreamResponse &response){
			std::cout<<"qwer"<<std::endl;
			response.setHeader(
				"server",
				"mongoose"
			);
			response.setHeader(
				"expires",
				"Thu, 01 Jan 1970 00:00:00 GMT"
				);
			response.setHeader(
				"content-type",
				"application/json;charset=utf-8"
			);
			response.setHeader(
				"cache-control",
				"no-store"
			);
			response.setHeader(
				"set-cookie",
				"XASSESSIONID=21f6fa08-715a-4564-86c2-a59301b0dfe1;xasid=0.251006e8-ef99-478c-b0c1-d208c853a705;Path=/;Secure;HttpOnly"
			);
			response.setHeader(
				"x-vcap-request-id",
				"22808ba0-689d-496d-4632-00d843abae9a"
			);
			std::ifstream ifs("./res/session_data.json");
			std::string s;
			while(std::getline(ifs,s)){
				response<<s<<std::endl;
			}
		}
		void feedback(Request &request, StreamResponse &response){
			std::cout
				<<std::chrono::duration_cast<std::chrono::milliseconds>(
					std::chrono::system_clock::now().time_since_epoch()
				).count()
				<<":"
				<<"feedback"
				<<std::endl;
			Json::Value v;
			//method
			//method
			//std::string getUrl();
			//std::string getMethod();
			//std::string getData();
			std::string u=request.getUrl();
			std::string m=request.getMethod();
			std::cout<<m<<std::endl;
			if(m.compare("GET")==0){
				v["msg"]="GET";
			}else if(m.compare("POST")==0){
				std::istringstream iss;
				iss.str(request.getData());
				Json::Value val;
				Json::Reader reader;
				bool b=reader.parse(iss,val);
				if(!b)
					v["msg"]="POST:ERROR:"+reader.getFormattedErrorMessages();
				else
					v["msg"]="POST:JSON PARSED";
			}else if(m.compare("PUT")==0){
				v["msg"]="PUT";
			}else if(m.compare("PATCH")==0){
				v["msg"]="PATCH";
			}else{
				v["msg"]="INVALID METHOD";
			}
			//----------------------------------------
			//get url parameters
			//----------------------------------------
			int v0;
			try{
                                v0=std::stoi(htmlEntities(request.get("k0")));
                        }catch (std::invalid_argument const &e){
				v["err"]="std::invalid_argument";
                                v0=1;
                        }catch (std::out_of_range const &e){
				v["err"]="std::out_of_range";
                                v0=1;
                        }
			//----------------------------------------
			//process
			//----------------------------------------

			//----------------------------------------
			//create response
			//----------------------------------------
			v["m"]=m;
			v["u"]=u;
			v["k0"]=v0;
			Json::StyledWriter w;
			response<<w.write(v);
		}
		void setup(){
			addRoute("POST","/xas/",CtlMain,xas);
			addRoute("GET","/feedback",CtlMain,feedback);
			addRoute("POST","/feedback",CtlMain,feedback);
		}
};
int main(int argc,char** argv){
	CtlMain ctlMain;
	Server server(8080);
	server.registerController(&ctlMain);
	server.setOption("enable_directory_listing","yes");
	server.setOption("document_root","./pub");
	server.setOption("access_log_file","./log.txt");
	server.start(); 
	while(1){
		sleep(10000);
	}
}
