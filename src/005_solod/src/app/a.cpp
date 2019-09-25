/*
#include<iostream>
#include<dlfcn.h>
#include"shape/shapefactory.h"
#include"app/a.h"
#ifndef SOEXT
#define SOEXT "so"
#endif
int main(int argc,char** argv){
	std::string libnam;
	ShapeFactory sf;
	sf.load((std::string("./lib/libtriangle")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/libsquare")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/libparallelogram")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/librhombus")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/libcircle")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/liboval")+std::string(SOEXT)).c_str());
	sf.unload((std::string("./lib/libtriangle")+std::string(SOEXT)).c_str());
	sf.unload((std::string("./lib/libsquare")+std::string(SOEXT)).c_str());
	sf.unload((std::string("./lib/libparallelogram")+std::string(SOEXT)).c_str());
	sf.unload((std::string("./lib/librhombus")+std::string(SOEXT)).c_str());
	sf.unload((std::string("./lib/libcircle")+std::string(SOEXT)).c_str());
	sf.unload((std::string("./lib/liboval")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/libtriangle")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/libsquare")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/libparallelogram")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/librhombus")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/libcircle")+std::string(SOEXT)).c_str());
	sf.load((std::string("./lib/liboval")+std::string(SOEXT)).c_str());
	{
		std::cout<<"----------------------------------------"<<std::endl;
		libnam=((std::string("./lib/libtriangle")+std::string(SOEXT)).c_str());
		Shape* s0=sf.create(libnam);
		Shape* s1=sf.create(libnam);
		sf.remove(libnam);
		Shape* s2=sf.create(libnam);
		Shape* s3=sf.create(libnam);
	}
	{
		std::cout<<"----------------------------------------"<<std::endl;
		libnam=((std::string("./lib/libsquare")+std::string(SOEXT)).c_str());
		Shape* s0=sf.create(libnam);
		Shape* s1=sf.create(libnam);
		sf.remove(libnam);
		Shape* s2=sf.create(libnam);
		Shape* s3=sf.create(libnam);
	}
	return 0;
}
*/


#ifndef SOEXT
#define SOEXT "so"
#endif
//#include<windows.h>
#include<unistd.h>
#include<signal.h>
#include"mongoose-cpp/Server.h"
#include"mongoose-cpp/WebController.h"
//#include"app/ctl/ctlmain.h"
#include"ctl/ctlfactory.h"
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
