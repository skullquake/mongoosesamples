#include"square.h"
#include<iostream>
Square::Square(){
	std::cout<<"Square()"<<std::endl;
}
Square::~Square(){
	std::cout<<"~Square()"<<std::endl;
}
extern "C" {
	Shape* maker(){
		return new Square;
	}
}
