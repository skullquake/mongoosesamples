#ifndef LIB_OVAL_H
#define LIB_OVAL_H
#include"shape.h"
class Oval:public Shape{
	public:
		Oval();
		~Oval();
	private:
};
extern "C" {
	Shape* maker();
}
#endif
