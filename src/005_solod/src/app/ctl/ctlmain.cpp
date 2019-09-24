#include"app/ctl/ctlmain.h"
#include"mongoose-cpp/Session.h"
#include"mongoose-cpp/Sessions.h"
#include"mongoose-cpp/Request.h"
#include"mongoose-cpp/RequestHandler.h"
#include"mongoose-cpp/Response.h"
#include"mongoose-cpp/StreamResponse.h"
#include<iostream>
#include<chrono>
using namespace Mongoose;
namespace app::ctl{
	CtlMain::CtlMain()
	             : ::Mongoose::WebController()
	{
	}
	CtlMain::~CtlMain(){
	}
	void CtlMain::setup(){
		std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: setting up endpoints..."<<std::endl;
		addRoute("GET","/",CtlMain,home);
		std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: done"<<std::endl;
	}
	void CtlMain::home(::Mongoose::Request &request, ::Mongoose::StreamResponse &response){
		std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl:home:begin"<<std::endl;
		response<<"done"<<std::endl;
		std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl:home:end"<<std::endl;
	}
}

