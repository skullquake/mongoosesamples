BASENAME=$(shell basename `pwd`)
MACHINE=$(shell $(CXX) -dumpmachine)
CC=gcc
CXX=g++
AR=ar
SOURCEDIR=./src
SOURCES:=$(shell find $(SOURCEDIR) -name "*.cpp" -o -name "*.c" )
DYBUILDDIR=bin/shared
SBUILDDIR=bin/static
DYLIBOBJS:=\
	$(addprefix $(DYBUILDDIR)/,$(patsubst %.c,%.o ,$(patsubst %.cpp,%.o,$(SOURCES))))
SLIBOBJS=\
	$(addprefix $(SBUILDDIR)/,$(patsubst %.c,%.o ,$(patsubst %.cpp,%.o,$(SOURCES))))
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif
CXXFLAGS=\
	-I./include\
	`pkg-config --cflags jsoncpp`
LDFLAGSD=\
	`pkg-config --libs jsoncpp`
ifneq (,$(findstring mingw,$(MACHINE)))
	LDFLAGSD+=\
		-ldl\
		-lws2_32\
		-lstdc++
endif
LDFLAGSS=\
	`pkg-config --libs jsoncpp`
ifneq (,$(findstring mingw,$(MACHINE)))
	LDFLAGSS+=\
		-ldl\
		-lws2_32\
		-lstdc++
endif
DYBIN=./bin/a_shared
RPATH=./lib
SBIN=./bin/a_static
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
ifneq (,$(findstring mingw,$(MACHINE)))
$(DYLIB): $(DYLIBOBJS)
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	@$(CXX)\
		$(CXXFLAGS)\
		-shared\
		$(DYLIBOBJS)\
		$(LDFLAGSD)\
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
$(DYBUILDDIR)/%.o: %.c
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	@$(CC)\
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
$(SBUILDDIR)/%.o: %.c
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	@$(CC)\
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
	distclean\
	test
test:
	@echo SOURCES:
	@echo $(SOURCES)|sed "s/\ /\n/g"
	@echo SLIBOBJS:
	@echo $(SLIBOBJS)|sed "s/\ /\n/g"
	@echo DYLIBOBJS:
	@echo $(DYLIBOBJS)|sed "s/\ /\n/g"
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
