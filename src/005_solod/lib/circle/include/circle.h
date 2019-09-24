#ifndef LIB_CIRCLE_H
#define LIB_CIRCLE_H
#include"shape.h"
class Circle:public Shape{
	public:
		Circle();
		~Circle();
	private:
};
extern "C" {
	Shape* maker();
}
#endif
