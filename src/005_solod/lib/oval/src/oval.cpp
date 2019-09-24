#include"oval.h"
#include<iostream>
Oval::Oval(){
	std::cout<<"Oval()"<<std::endl;
}
Oval::~Oval(){
	std::cout<<"~Oval()"<<std::endl;
}
extern "C" {
	Shape* maker(){
		return new Oval;
	}
}
