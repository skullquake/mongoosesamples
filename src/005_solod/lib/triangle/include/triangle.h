#ifndef LIB_TRIANGLE_H
#define LIB_TRIANGLE_H
#include"shape.h"
class Triangle:public Shape{
	public:
		Triangle();
		~Triangle();
	private:
};
extern "C" {
	Shape* maker();
}
#endif
