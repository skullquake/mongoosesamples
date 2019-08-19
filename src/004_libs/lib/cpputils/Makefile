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
	-I../cpputils/include
LDFLAGSD=\
	-L../cpputils/lib
LDFLAGSS=\
	-L../cpputils/lib
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
slib:\
	$(SLIB)
dylib:\
	$(DYLIB)
ifneq (,$(findstring mingw,$(MACHINE)))
$(DYLIB): $(DYLIBOBJS)
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	@$(CXX)\
		$(CXXFLAGS)\
		-shared\
		$(LDFLAGSD)\
		$(DYLIBOBJS)\
		-o $(DYLIB)
else
$(DYLIB): $(DYLIBOBJS)
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	@$(CXX)\
		$(CXXFLAGS)\
		-shared\
		$(DYLIBOBJS)\
		$(LDFLAGSD)\
		-o $(DYLIB)
endif
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
		$(LDFLAGSD)\
		-o $@
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
