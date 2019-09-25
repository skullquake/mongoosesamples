#ifndef SOEXT
#define SOEXT "so"
#endif
//#include<windows.h>
#include<unistd.h>
#include<signal.h>
#include"mongoose-cpp/Server.h"
#include"mongoose-cpp/WebController.h"
//#include"app/ctl/ctlmain.h"
#include"ctlfactory.h"
int main(int argc,char** argv){
	if(argc!=2){
		std::cerr<<"Usage: PROG LIBNAM"<<std::endl;
		return -1;
	}
	CtlFactory ctlf;
	std::string libroot="./lib/";
	std::string libpfx="lib";
	std::string libnam=std::string(argv[1]);
	std::string libext=std::string(SOEXT);
	std::string libpth=libroot+libpfx+libnam+libext;
	std::cout<<libpth<<std::endl;
	if(ctlf.load(libpth.c_str())){
		std::cout<<"loaded"<<std::endl;
		Mongoose::Server server(8080);
		Mongoose::WebController* c=ctlf.create(libpth);
		//app::ctl::CtlMain ctlMain;
		//server.registerController(&ctlMain);
		server.registerController(c);
		server.setOption("enable_directory_listing","yes");
		server.setOption("document_root","./pub");
		server.start(); 
		while(1){
			//Sleep(10000);
			//sleep(10000);
			sleep(1);
			//std::cout<<"main():wait..."<<std::endl;
			if(!server.isRunning())break;
		}
		ctlf.unload(libnam.c_str());

	}else{
		std::cerr<<"not loaded"<<std::endl;
	}
}
