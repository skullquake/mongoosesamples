#include"view/layout.h"
view::Layout::Layout()
             :mName(std::string())
{
	mMenu.id("layout-menu");
	mBody.id("layout-body");
}
view::Layout::~Layout(){
}
HTML::Div & view::Layout::getMenu(){
	return mMenu;
}
HTML::Div & view::Layout::getBody(){
	return mBody;
}
std::ostream& view::operator<<(std::ostream& aStream,view::Layout& aLayout){
	aStream<<aLayout.getMenu()<<aLayout.getBody();
	return aStream;
}
