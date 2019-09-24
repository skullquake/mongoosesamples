#ifndef LIB_CTLFOO_H
#define LIB_CTLFOO_H
#include"mongoose-cpp/Server.h"
#include"mongoose-cpp/WebController.h"
namespace app::ctl{
	class CtlFoo:public Mongoose::WebController{
		public: 
			CtlFoo();
			~CtlFoo();
			void home(Mongoose::Request &request, Mongoose::StreamResponse &);
			void setup();
		private:
	};
}
extern "C" {
	Mongoose::WebController* ctlmaker();
}
#endif





