#include"circle.h"
#include<iostream>
Circle::Circle(){
	std::cout<<"Circle()"<<std::endl;
}
Circle::~Circle(){
	std::cout<<"~Circle()"<<std::endl;
}
extern "C" {
	Shape* maker(){
		return new Circle;
	}
}
