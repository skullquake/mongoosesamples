#include"shape/shapefactory.h"
#include<iostream>
#include<dlfcn.h>
ShapeFactory::ShapeFactory(){
}
ShapeFactory::~ShapeFactory(){
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
bool ShapeFactory::load(std::string a){
	bool ret=false;
	if(a.compare("")){
		if(mf.count(a)){
			std::cout<<"Already Loaded "<<a<<std::endl;
			ret=true;
		}else{
			std::string sopath=a;
			void *handle;
			if((handle=dlopen(sopath.c_str(),RTLD_LAZY))==NULL){
				std::cerr<<"Failed to load "<<sopath<<std::endl;
			}else{
				std::cout<<"Loading "<<a<<"...";
				Shape* (*mkr)();
				mkr=(Shape* (*)())dlsym(handle,"maker");
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
bool ShapeFactory::unload(std::string a){
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
bool ShapeFactory::remove(std::string a){
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
Shape* ShapeFactory::create(std::string a){
	Shape* shape=NULL;
	if(a.compare("")){
		if(mf.count(a)){
			shape=(mf[a])();
		}else{
			std::string sopath=a;
			void *handle;
			if((handle=dlopen(sopath.c_str(),RTLD_LAZY))==NULL){
				std::cerr<<"Failed to load "<<sopath<<std::endl;
			}else{
				std::cout<<"Loaded "<<sopath<<std::endl;
				Shape* (*mkr)();
				mkr=(Shape* (*)())dlsym(handle,"maker");
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
