#include"view/table.h"
view::Table::Table(){
}
view::Table::~Table(){
}
std::vector<std::vector<std::string>> view::Table::getRows() const{
	return mVRows;
}
void view::Table::addRow(std::vector<std::string> aVRow){
	mVRows.push_back(aVRow);
}
HTML::Element view::Table::toHtml() const{
	HTML::Element table("table");
	table.cls("table table-striped");
	table.id("id");
	HTML::Element tbody("tbody");
	for(
		std::vector<std::vector<std::string>>::const_iterator itrow=mVRows.begin();
		itrow!=mVRows.end();
		itrow++
	){
		HTML::Element tr("tr");
		for(
			std::vector<std::string>::const_iterator itcol=(*itrow).begin();
			itcol!=(*itrow).end();
			itcol++
		){
			HTML::Element td("td");
			td<<(*itcol);
			tr<<std::move(td);
		}
		tbody<<std::move(tr);
	}
	table<<std::move(tbody);
	return table;
}
Json::Value view::Table::toJson() const{
	Json::Value r;
	/*
	for(
		std::vector<std::vector<std::string>>::const_iterator itrow=mVRows.begin();
		itrow!=mVRows.end();
		itrow++
	){
		for(
			std::vector<std::string>::const_iterator itcol=(*itrow).begin();
			itcol!=(*itrow).end();
			itcol++
		){
			(*itcol);
		}
		tbody<<std::move(tr);
	}
	*/
	return r;
}
