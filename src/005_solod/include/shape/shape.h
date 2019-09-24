#ifndef LIB_SHAPE_H
#define LIB_SHAPE_H
class Shape{
	public:
		Shape();
		~Shape();
	private:
};
extern "C" {
	Shape* maker();
}
#endif
