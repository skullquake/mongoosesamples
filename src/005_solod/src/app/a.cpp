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


//#include<windows.h>
#include<unistd.h>
#include<signal.h>
#include"mongoose-cpp/Server.h"
#include"mongoose-cpp/WebController.h"
#include"app/ctl/ctlmain.h"
int main(int argc,char** argv){
	app::ctl::CtlMain ctlMain;
	Mongoose::Server server(8080);
	server.registerController(&ctlMain);
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
}
