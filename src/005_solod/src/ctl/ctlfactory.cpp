#include"ctl/ctlfactory.h"
#include<iostream>
#include<dlfcn.h>
CtlFactory::CtlFactory(){
}
CtlFactory::~CtlFactory(){
	for(auto a:mf){
		try{
			std::cout<<"Unloading "<<a.first<<"...";
			dlclose(a.second());
			std::cout<<"done"<<std::endl;
		}catch(std::exception e){
			std::cerr<<e.what()<<std::endl;
		}
	}
}
bool CtlFactory::load(std::string a){
	bool ret=false;
	if(a.compare("")){
		if(mf.count(a)){
			std::cout<<"Already Loaded "<<a<<std::endl;
			ret=true;
		}else{
			std::string sopath=a;
			void *handle;
			//if((handle=dlopen(sopath.c_str(),RTLD_LAZY))==NULL){
			if((handle=dlopen(sopath.c_str(),RTLD_NOW))==NULL){
				std::cerr<<"Failed to load "<<sopath<<std::endl;
			}else{
				std::cout<<"Loading "<<a<<"...";
				Mongoose::WebController* (*mkr)();
				mkr=(Mongoose::WebController* (*)())dlsym(handle,"ctlmaker");
				if(mkr==NULL){
					std::cerr<<"Failed to get function"<<std::endl;
					dlclose(handle);
				}else{
					mf[a]=mkr;
					ret=true;
					std::cout<<"done"<<std::endl;
				}
			}
		}
	}else{
	}
	return ret;


}
bool CtlFactory::unload(std::string a){
	bool ret=false;
	if(a.compare("")){
		if(mf.count(a)){
			std::cout<<"Unloading "<<a<<"...";
			try{
				mf.erase(a);
				ret=true;
				std::cout<<"done"<<std::endl;
			}catch(std::exception e){
				std::cerr<<e.what()<<std::endl;
			}
		}else{
			std::cerr<<"Key "<<a<<" not found"<<std::endl;
		}
	}else{
		std::cerr<<"Key empty"<<std::endl;
	}
	return ret;

}
bool CtlFactory::remove(std::string a){
	bool ret=false;
	if(a.compare("")){
		if(mf.count(a)){
			std::cout<<"Unloading "<<a<<"...";
			try{
				mf.erase(a);
				ret=true;
				std::cout<<"done"<<std::endl;
			}catch(std::exception e){
				std::cerr<<e.what()<<std::endl;
			}
		}else{
			std::cerr<<"Key "<<a<<" not found"<<std::endl;
		}
	}else{
		std::cerr<<"Key empty"<<std::endl;
	}
	return ret;
}
Mongoose::WebController* CtlFactory::create(std::string a){
	Mongoose::WebController* shape=NULL;
	if(a.compare("")){
		if(mf.count(a)){
			shape=(mf[a])();
		}else{
			std::string sopath=a;
			void *handle;
			//if((handle=dlopen(sopath.c_str(),RTLD_LAZY))==NULL){
			if((handle=dlopen(sopath.c_str(),RTLD_NOW))==NULL){
				std::cerr<<"Failed to load "<<sopath<<std::endl;
			}else{
				std::cout<<"Loaded "<<sopath<<std::endl;
				Mongoose::WebController* (*mkr)();
				mkr=(Mongoose::WebController* (*)())dlsym(handle,"ctlmaker");
				if(mkr==NULL){
					std::cerr<<"Failed to get function"<<std::endl;
					dlclose(handle);
				}else{
					mf[a]=mkr;
					shape=mf[a]();
				}
			}
		}
	}else{
	}
	return shape;
}
