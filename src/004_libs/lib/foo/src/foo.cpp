#include"foo.h"
#include<iostream>
foo::Foo::Foo(){
	std::cout<<"foo::Foo::Foo()"<<std::endl;
}
foo::Foo::~Foo(){
	std::cout<<"foo::Foo::~Foo()"<<std::endl;
}
