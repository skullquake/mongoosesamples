#include"view/menu.h"
view::Menu::Menu(){
}
view::Menu::~Menu(){
}
std::vector<std::string> view::Menu::getItems() const{
	return mVItems;
}
void view::Menu::addItem(std::string aItem){
	mVItems.push_back(aItem);
}
HTML::Div view::Menu::toHtml() const{
	HTML::Element ul("ul");
	ul.cls("navbar-nav");
	for(
		std::vector<std::string>::const_iterator it=mVItems.begin();
		it!=mVItems.end();
		it++
	){
		ul<<HTML::Element("li")
			<<(
				HTML::Element("a")
					.cls("nav-link")
					.addAttribute("href","#")
						<<(*it)
			)
		;
	}
	HTML::Div r;
	r.cls("navbar navbar-expand-sm bg-light");
	r.id("Menu");
	r<<std::move(ul);
	return r;
}
Json::Value view::Menu::toJson() const{
	Json::Value r;
	for(
		std::vector<std::string>::const_iterator it=mVItems.begin();
		it!=mVItems.end();
		it++
	){

		r[*it]="#";
	}
	return r;
}
