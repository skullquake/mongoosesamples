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
CXXFLAGS=\
	-Wall\
	-Werror\
	-I./include
LDFLAGS=
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
	echo $(BASENAME)
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	@$(CXX)\
		$(CXXFLAGS)\
		-shared\
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
		$(LDFLAGS)\
		-fpic\
		-I$(HEADERDIR)\
		-I$(dir $<)\
		-c $<\
		-o $@
$(SBUILDDIR)/%.o: %.cpp
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	@$(CXX)\
		$(CXXFLAGS)\
		$(LDFLAGS)\
		-I$(HEADERDIR)\
		-I$(dir $<)\
		-c $<\
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
