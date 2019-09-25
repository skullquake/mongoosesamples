#ifndef LIB_RHOMBUS_H
#define LIB_RHOMBUS_H
#include"shape.h"
class Rhombus:public Shape{
	public:
		Rhombus();
		~Rhombus();
	private:
};
extern "C" {
	Shape* maker();
}
#endif
