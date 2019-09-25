#include"rhombus.h"
#include<iostream>
Rhombus::Rhombus(){
	std::cout<<"Rhombus()"<<std::endl;
}
Rhombus::~Rhombus(){
	std::cout<<"~Rhombus()"<<std::endl;
}
extern "C" {
	Shape* maker(){
		return new Rhombus;
	}
}
