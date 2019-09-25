#ifndef CTL_CTLFACTORY_H
#define CTL_CTLFACTORY_H
#include"mongoose-cpp/WebController.h"
#include<map>
class CtlFactory{
	public:
		CtlFactory();
		~CtlFactory();
		bool load(std::string);
		bool unload(std::string);
		Mongoose::WebController* create(std::string);
		bool remove(std::string);
	private:
		std::map<std::string,Mongoose::WebController* (*)()> mf;
};
#endif
