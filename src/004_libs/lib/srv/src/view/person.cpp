#include"view/person.h"
view::Person::Person()
             :mName(std::string()),
              mSurname(std::string()),
              mSSOC(std::string())
{
}
view::Person::~Person(){
}
std::string view::Person::getName() const{
	return mName;
}
std::string view::Person::getSurname() const{
	return mSurname;
}
std::string view::Person::getSSOC() const{
	return mSSOC;
}
void view::Person::setName(std::string v){
	mName=v;
}
void view::Person::setSurname(std::string v){
	mSurname=v;
}
void view::Person::setSSOC(std::string v){
	mSSOC=v;
}
HTML::Div view::Person::toHtml() const{
	HTML::Div r;
	r.cls("card personview ");
	r.id("Person");
	r<<(
		HTML::Div().cls("card-body")
			<<HTML::Header5("")
				.id("surname")
				.cls("card-title")
			<<getSurname()
			<<HTML::Header6("")
				.id("name")
				.cls("card-subtitle mb-2 text-muted")
			<<getName()
			<<(HTML::Paragraph("").id("ssoc").cls("card-text")<<getSSOC())
	);
	return r;
}
Json::Value view::Person::toJson() const{
	Json::Value r;
	r["name"]=mName;
	r["surname"]=mSurname;
	r["ssoc"]=mSSOC;
	return r;
}
