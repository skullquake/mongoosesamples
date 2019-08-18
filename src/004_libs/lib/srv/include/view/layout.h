#ifndef LAYOUT_H
#define LAYOUT_H
#include"HTML.h"
#include<iostream>
namespace view{
	class Layout{
		public:
			Layout();
			~Layout();
			HTML::Div& getMenu();
			HTML::Div& getBody();
    			friend std::ostream& operator<<(std::ostream& s,Layout& p);
		protected:
		private:
			std::string mName;
			HTML::Div mMenu;
			HTML::Div mBody;
	};
}
#endif
