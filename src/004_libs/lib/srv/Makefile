CXX=g++
AR=ar
SOURCEDIR=./src
SOURCES:=$(shell find $(SOURCEDIR) -name '*.cpp')
DYBUILDDIR=bin/shared
SBUILDDIR=bin/static
DYLIBOBJS:=$(addprefix $(DYBUILDDIR)/,$(SOURCES:%.cpp=%.o))
SLIBOBJS:=$(addprefix $(SBUILDDIR)/,$(SOURCES:%.cpp=%.o))
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif
#	-Wall
#	-Werror
CXXFLAGS=\
	-I./include\
	-I./include/HTML\
	-I../cpputils/include\
	-I../foo/include\
	-I../bar/include\
	-I../baz/include\
	-I../qux/include\
	-I../klutz/include\
	`pkg-config --cflags mongoosecpp`\
	`pkg-config --cflags jsoncpp`
LDFLAGSD=\
	-L../cpputils/lib\
	-L../foo/lib\
	-L../bar/lib\
	-L../baz/lib\
	-L../qux/lib\
	-L../klutz/lib\
	`pkg-config --libs mongoosecpp`\
	`pkg-config --libs jsoncpp`\
	-lcpputils\
	-lfoo\
	-lbar\
	-lbaz\
	-lqux
LDFLAGSS=\
	-L../cpputils/lib\
	-L../foo/lib\
	-L../bar/lib\
	-L../baz/lib\
	-L../qux/lib\
	-L../qux/lib\
	`pkg-config --libs mongoosecpp`\
	`pkg-config --libs jsoncpp`

DYBIN=./bin/a_shared
RPATH=./lib
SBIN=./bin/a_static
BASENAME=$(shell basename `pwd`)
MACHINE=$(shell $(CXX) -dumpmachine)
ifneq (,$(findstring mingw,$(MACHINE)))
	SOEXT="dll"
else
	SOEXT="so"
endif

DYLIB=./lib/lib$(BASENAME).$(SOEXT)
SLIB=./lib/lib$(BASENAME)_static.a
all:\
	$(DYLIB)\
	$(SLIB)
$(DYLIB): $(DYLIBOBJS)
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	@$(CXX)\
		$(CXXFLAGS)\
		-shared\
		$(LDFLAGSD)\
		$(DYLIBOBJS)\
		-o $(DYLIB)
$(SLIB): $(SLIBOBJS)
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	@$(AR)\
		rcs\
		$(SLIB)\
		$(SLIBOBJS)
$(DYBUILDDIR)/%.o: %.cpp
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	@$(CXX)\
		$(CXXFLAGS)\
		-fpic\
		-I$(HEADERDIR)\
		-I$(dir $<)\
		-c $<\
		-o $@
#		$(LDFLAGSD)
$(SBUILDDIR)/%.o: %.cpp
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	@$(CXX)\
		$(CXXFLAGS)\
		-I$(HEADERDIR)\
		-I$(dir $<)\
		-c $<\
		$(LDFLAGSS)\
		-o $@

.phony:\
	runshared\
	runstatic\
	clean\
	install\
	distclean
install: $(DYLIB) $(SLIB)
	install -d $(DESTDIR)$(PREFIX)/lib/
	install -m 644 $(DYLIB) $(DESTDIR)$(PREFIX)/lib/
	install -m 644 $(SLIB) $(DESTDIR)$(PREFIX)/lib/
	install -d $(DESTDIR)$(PREFIX)/include/
	install -d $(DESTDIR)$(PREFIX)/lib/pkg-config
	install -m 644 ./src/pkg-config/*.pc $(DESTDIR)$(PREFIX)/lib/pkgconfig
	cp -r ./include/* $(DESTDIR)$(PREFIX)/include/
clean:
	@rm -r ./bin ./lib/*
distclean:
	rm\
		-r\
		$(DYBUILDDIR)\
		$(SBUILDDIR)
