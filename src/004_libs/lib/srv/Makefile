BASENAME=$(shell basename `pwd`)
MACHINE=$(shell $(CXX) -dumpmachine)
ifneq (,$(findstring mingw,$(MACHINE)))
	SOEXT=dll
else
	SOEXT=so
endif
CXX=g++
AR=ar
SOURCEDIR=./src
SOURCES:=$(shell find $(SOURCEDIR) -name '*.cpp')
DYBUILDDIR=bin/shared
SBUILDDIR=bin/static
DYLIBOBJS:=$(addprefix $(DYBUILDDIR)/,$(SOURCES:%.cpp=%.o))
SLIBOBJS:=$(addprefix $(SBUILDDIR)/,$(SOURCES:%.cpp=%.o))
#-------------------------------------------------------------------------------
#sibling deps in progress
#-------------------------------------------------------------------------------
#todo path specification for each and name/dir extraction
DEPLIBS=\
	mongoosecpp\
	cpputils
DEPLIBFOLDERS=$(foreach D,$(DEPLIBS),../$D/lib/)
DEPLIBSL=$(foreach D,$(DEPLIBFOLDERS),-L$D)
DEPLIBSLNS=$(foreach D,$(DEPLIBS),-l$D_static)
DEPLIBSRP=$(foreach D,$(DEPLIBFOLDERS),-Wl,-rpath=$D)
DEPLIBSLND=$(foreach D,$(DEPLIBS),-l$D)
DEPLIBSCF=$(foreach D,$(DEPLIBS),-I../$D/include)
DEPLIBSS=$(foreach D,$(DEPLIBS),../$D/lib/lib$D_static.a)
DEPLIBSD=$(foreach D,$(DEPLIBS),../$D/lib/lib$D.$(SOEXT))
#-------------------------------------------------------------------------------
#//sibling deps in progress
#-------------------------------------------------------------------------------
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif
CXXFLAGS=\
	-std=c++0x\
	-I./include\
	-I./include/HTML\
	$(DEPLIBSCF)\
	`pkg-config --cflags jsoncpp`\
	`pkg-config --cflags cairo`
LDFLAGSD=\
	$(DEPLIBSL)\
	`pkg-config --libs jsoncpp`\
	`pkg-config --libs cairo`\
	$(DEPLIBSLND)
ifneq (,$(findstring mingw,$(MACHINE)))
	LDFLAGSS+=\
		-ldl\
		-lws2_32\
		-lstdc++
endif
LDFLAGSS=\
	$(DEPLIBSL)\
	`pkg-config --libs jsoncpp`\
	`pkg-config --libs cairo`\
	$(DEPLIBSLNS)
ifneq (,$(findstring mingw,$(MACHINE)))
	LDFLAGSD+=\
		-ldl\
		-lws2_32\
		-lstdc++
endif
DYBIN=./bin/a_shared
RPATH=
SBIN=./bin/a_static

DYLIB=./lib/lib$(BASENAME).$(SOEXT)
SLIB=./lib/lib$(BASENAME)_static.a
all:\
	$(DYLIB)\
	$(SLIB)
slib:\
	$(SLIB)
dylib:\
	$(DYLIB)
deplibs:\
	$(DEPLIBSS)
MACHINE=$(shell $(CXX) -dumpmachine)
ifneq (,$(findstring mingw,$(MACHINE)))
$(DYLIB): $(DYLIBOBJS)
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	@$(CXX)\
		$(CXXFLAGS)\
		-shared\
		$(DYLIBOBJS)\
		$(RPATH)\
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
		$(RPATH)\
		-o $(DYLIB)
endif
$(SLIB): $(SLIBOBJS)
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	@$(AR)\
		rcs\
		$(SLIB)\
		$(SLIBOBJS)
$(DYBUILDDIR)/%.o: %.cpp $(DEPLIBSD)
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	@$(CXX)\
		$(CXXFLAGS)\
		-fpic\
		-I$(HEADERDIR)\
		-I$(dir $<)\
		-c $<\
		-o $@
$(SBUILDDIR)/%.o: %.cpp $(DEPLIBSS)
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
	printdeps\
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
printdeps:
	@echo DEPLIBS
	@echo $(DEPLIBS)
	@echo DEPLIBFOLDERS
	@echo $(DEPLIBFOLDERS)
	@echo DEPLIBSL
	@echo $(DEPLIBSL)
	@echo DEPLIBSLNS
	@echo $(DEPLIBSLNS)
	@echo DEPLIBSRP
	@echo $(DEPLIBSRP)
	@echo DEPLIBSLND
	@echo $(DEPLIBSLND)
	@echo DEPLIBSCF
	@echo $(DEPLIBSCF)
	@echo DEPLIBSS
	@echo $(DEPLIBSS)
	@echo DEPLIBSD
	@echo $(DEPLIBSD)
	@echo LDFLAGSS
	@echo $(LDFLAGSS)
	@echo LDFLAGSD
	@echo $(LDFLAGSD)
#-------------------------------------------------------------------------------
#
# >>command script context<< : possible solution to optimal dep lib building
#
# Wildcards are automatically expanded bymakewhenever a wildcard appears in a
# target, prerequisite, or >>command script context<<. In other contexts,
# wildcards can beexpanded explicitly by calling a function. Wildcards can be
# very useful for creatingmore adaptablemakefiles. For instance, instead of
# listing all the files in a programexplicitly, you can use wildcards
#
#-------------------------------------------------------------------------------
#$(DEPLIBFOLDERS)%.dll:
$(DEPLIBSS):
	make -C $(shell dirname $(@D)) slib
#$(DEPLIBFOLDERS)%_static.a:
$(DEPLIBSD):
	make -C $(shell dirname $(@D)) dylib

