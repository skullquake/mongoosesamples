#include"parallelogram.h"
#include<iostream>
Paralellogram::Paralellogram(){
	std::cout<<"Paralellogram()"<<std::endl;
}
Paralellogram::~Paralellogram(){
	std::cout<<"~Paralellogram()"<<std::endl;
}
extern "C" {
	Shape* maker(){
		return new Paralellogram;
	}
}
