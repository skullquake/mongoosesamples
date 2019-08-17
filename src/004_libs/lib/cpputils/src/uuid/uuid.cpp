#include"uuid/uuid.h"
#include<iostream>
#include<string>
#include<cstdlib>
#include<sstream>
#include<random>
#include<string>
namespace cpputils{
	UUID::UUID(){
		std::cout<<"UUID()"<<std::endl;
	}
	UUID::~UUID(){
		std::cout<<"~UUID()"<<std::endl;
	}
	std::string UUID::generateUUID(){
		std::vector<int> vsect={4,2,2,6};
		std::random_device rd;
		std::mt19937 gen(rd());
		std::uniform_int_distribution<> dis(0,255);
		std::stringstream ss;
		for(std::vector<int>::iterator it=vsect.begin();it!=vsect.end();++it){
			for(auto i=0;i<*it;i++){
				const auto rc=dis(gen);
				std::stringstream hexstream;
				hexstream<<std::hex<<rc;
				auto hex=hexstream.str();
				ss<<(hex.length()<2?'0'+hex:hex);
			}
			if(std::next(it)!=vsect.end())ss<<"-";
		}
		return ss.str();
	}
}
