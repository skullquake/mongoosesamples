#ifndef LIB_SQAURE_H
#define LIB_SQAURE_H
#include"shape.h"
class Square:public Shape{
	public:
		Square();
		~Square();
	private:
};
extern "C" {
	Shape* maker();
}
#endif
