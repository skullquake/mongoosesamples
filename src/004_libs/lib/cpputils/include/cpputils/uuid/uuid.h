#ifndef UUID_H
#define UUID_H
#include<string>
namespace cpputils{
	class UUID{
		public:
			UUID();
			~UUID();
			static std::string generateUUID();
		private:
		protected:
	};
}
#endif
