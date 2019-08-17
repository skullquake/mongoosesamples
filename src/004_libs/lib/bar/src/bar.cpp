#include"bar.h"
#include<iostream>
bar::Bar::Bar(){
	std::cout<<"bar::Bar::Bar()"<<std::endl;
}
bar::Bar::~Bar(){
	std::cout<<"bar::Bar::~Bar()"<<std::endl;
}
