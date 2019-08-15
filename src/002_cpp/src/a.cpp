#include<windows.h>
#include<unistd.h>
#include<signal.h>
#include<mongoosecpp/Server.h>
#include<mongoosecpp/WebController.h>
using namespace std;
using namespace Mongoose;
class MyController:public WebController{
	public: 
		void hello(Request &request, StreamResponse &response){
			response<<"Hello "<<htmlEntities(request.get("name", "... what's your name ?"))<<endl;
		}
		void setup(){
			addRoute("GET","/hello",MyController,hello);
		}
};
int main(int argc,char** argv){
	MyController myController;
	Server server(8080);
	server.registerController(&myController);
	server.start(); 
	while(1){
		Sleep(10000);
	}
}
