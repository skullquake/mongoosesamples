#ifndef MENU_H
#define MENU_H
#include"HTML.h"
#include<iostream>
#include<json/json.h>
namespace view{
	class Menu{
		public:
			Menu();
			~Menu();
			void addItem(std::string);
			std::vector<std::string> getItems() const;
			HTML::Div toHtml() const;
			Json::Value toJson() const;
		protected:
		private:
			std::vector<std::string> mVItems;
			std::string mSSOC;
	};
}
#endif
