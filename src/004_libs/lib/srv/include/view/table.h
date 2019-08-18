#ifndef TABLE_H
#define TABLE_H
#include"HTML.h"
#include<iostream>
#include<json/json.h>
namespace view{
	class Table{
		public:
			Table();
			~Table();
			void addRow(std::vector<std::string>);
			std::vector<std::vector<std::string>> getRows() const;
			HTML::Element toHtml() const;
			Json::Value toJson() const;
		protected:
		private:
			std::vector<std::vector<std::string>> mVRows;
	};
}
#endif
