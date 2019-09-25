#ifndef LIB_PARALLELOGRAM_H
#define LIB_PARALLELOGRAM_H
#include"shape.h"
class Paralellogram:public Shape{
	public:
		Paralellogram();
		~Paralellogram();
	private:
};
extern "C" {
	Shape* maker();
}
#endif
