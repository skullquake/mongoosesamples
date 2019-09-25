#include"maker.h"
#include<iostream>
extern "C" {
	Shape* maker(){
		return new Shape;
	}
}
