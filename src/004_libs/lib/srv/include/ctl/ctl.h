#ifndef CTL_H
#define CTL_H
#include<string>
#include<unistd.h>
#include<signal.h>
#include<mongoosecpp/Server.h>
#include<mongoosecpp/WebController.h>
#include<string>
#include<iostream>
#include<json/json.h>
namespace ctl{
	using namespace std;
	using namespace Mongoose;
	class Ctl:public WebController{
		public: 
			void tree(Request &request, StreamResponse &response);
			void chart(Request &request, StreamResponse &response);
			void piechart(Request &request, StreamResponse &response);
			void scatterchart(Request &request, StreamResponse &response);
			void rnd(Request &request, StreamResponse &response);
			void html(Request &request, StreamResponse &response);
			void cairotest(Request &request, StreamResponse &response);
			void setup();
	};
}
#endif


