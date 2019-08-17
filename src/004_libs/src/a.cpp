//#include<windows.h>
#include<unistd.h>
#include<signal.h>
#include<mongoosecpp/Server.h>
#include<mongoosecpp/WebController.h>
#include<string>
#include<iostream>
#include<json/json.h>
//#include"Ctl/Ctl.h"
#include"ctl/ctl.h"
using namespace std;
using namespace Mongoose;
int main(int argc,char** argv){
	ctl::Ctl myController;
	Server server(8080);
	server.registerController(&myController);
	server.setOption("enable_directory_listing","yes");
	server.setOption("document_root","./pub");
	server.start(); 
	while(1){
		sleep(10000);
	}
}

