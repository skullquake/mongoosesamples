#ifndef LIB_CTLMAIN_H
#define LIB_CTLMAIN_H
#include"mongoose-cpp/Server.h"
#include"mongoose-cpp/WebController.h"
namespace app::ctl{
	class CtlMain:public Mongoose::WebController{
		public: 
			CtlMain();
			~CtlMain();
			void home(Mongoose::Request &request, Mongoose::StreamResponse &);
			void setup();
		private:
	};
}
extern "C" {
	Mongoose::WebController* ctlmaker();
}
#endif





