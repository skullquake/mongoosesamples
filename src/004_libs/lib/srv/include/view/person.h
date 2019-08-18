#ifndef PERSON_H
#define PERSON_H
#include"HTML.h"
#include<iostream>
#include<json/json.h>
namespace view{
	class Person{
		public:
			Person();
			~Person();
		void setName(std::string);
			void setSurname(std::string);
			void setSSOC(std::string);
			std::string getName() const;
			std::string getSurname() const;
			std::string getSSOC() const;
			HTML::Div toHtml() const;
			Json::Value toJson() const;
		protected:
		private:
			std::string mName;
			std::string mSurname;
			std::string mSSOC;
	};
}
#endif
