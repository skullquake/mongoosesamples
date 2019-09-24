#include"triangle.h"
#include<iostream>
Triangle::Triangle(){
	std::cout<<"Triangle()"<<std::endl;
}
Triangle::~Triangle(){
	std::cout<<"~Triangle()"<<std::endl;
}
extern "C" {
	Shape* maker(){
		return new Triangle;
	}
}
