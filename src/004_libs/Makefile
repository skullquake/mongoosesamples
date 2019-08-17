#-------------------------------------------------------------------------------
#dll/so/ext
#-------------------------------------------------------------------------------
MACHINE=$(shell $(CXX) -dumpmachine)
ifneq (,$(findstring mingw,$(MACHINE)))
	SOEXT="dll"
else
	SOEXT="so"
endif
BASENAME=$(shell basename `pwd`)
	#-----------------------------------------------------------------------
	#rpath/dll
	#-----------------------------------------------------------------------
ifneq (,$(findstring mingw,$(MACHINE)))
	_PATH=$(P)$$PATH
else
	_PATH=$$PATH
endif
#-------------------------------------------------------------------------------
#rec src
#-------------------------------------------------------------------------------
BUILDDIR=bin
SOURCEDIR=./src
SOURCES:=$(shell find $(SOURCEDIR) -name '*.cpp')
LIBFOLDERS=$(shell ls ./lib)
LIBSL=$(foreach D,$(LIBFOLDERS),-L./lib/$D/lib/)
LIBSLNS=$(foreach D,$(LIBFOLDERS),-l$D_static)
	#-----------------------------------------------------------------------
	#static order important
	#-----------------------------------------------------------------------
LIBSRP=$(foreach D,$(LIBFOLDERS),-Wl,-rpath=./lib/$D/lib)
	#mingw breaks...
LIBSLND=$(foreach D,$(LIBFOLDERS),-l$D)
	#..manual
#LIBSLND=\
#	-lsrv
LIBSLND=$(foreach D,$(LIBFOLDERS),-l$D)
LIBSCF=$(foreach D,$(LIBFOLDERS),-I./lib/$D/include/)
LIBSS=$(foreach D,$(LIBFOLDERS),./lib/$D/lib/lib$D_static.a)
LIBSD=$(foreach D,$(LIBFOLDERS),./lib/$D/lib/lib$D.so)
#-------------------------------------------------------------------------------
#build
#-------------------------------------------------------------------------------
OBJECTS=$(addprefix $(BUILDDIR)/,$(SOURCES:%.cpp=%.o))
CXXFLAGS=\
	-I./include\
	$(LIBSCF)\
	$(LIBSL)\
	`pkg-config --cflags mongoosecpp`\
	`pkg-config --cflags jsoncpp`
#-------------------------------------------------------------------------------
#compilation
#-------------------------------------------------------------------------------
CXX=g++
	#-----------------------------------------------------------------------
	#static (order important, esp in mingw)
	#-----------------------------------------------------------------------
LDFLAGSS=\
	-lsrv_static\
	-lcpputils_static\
	`pkg-config --libs mongoosecpp`\
	`pkg-config --libs jsoncpp`\
	-lfoo_static\
	-lbar_static\
	-lbaz_static\
	-lqux_static\
	-lklutz_static
BINS=./bin/$(BASENAME)_static
	#-----------------------------------------------------------------------
	#shared
	#-----------------------------------------------------------------------
LDFLAGSD=\
	`pkg-config --libs mongoosecpp`\
	`pkg-config --libs jsoncpp`\
	$(LIBSLND)
$(foreach D,$(LIBFOLDERS),$(eval P := $(P)./lib/$(D)/lib:))
BIND=./bin/$(BASENAME)_shared

all: $(LIBSS) $(LIBSD) $(BINS) $(BIND)
static: $(BINS)
shared: $(BIND)

$(LIBSS):
	make -C $(@D)/..
$(LIBSD):
	make -C $(@D)/..

$(BINS): $(OBJECTS) $(LIBSS) 
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	$(CXX)\
		$(CXXFLAGS)\
		$(OBJECTS)\
		$(LDFLAGSS)\
		-o $(BINS)
$(BIND): $(OBJECTS) $(LIBSD) 
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	$(CXX)\
		$(CXXFLAGS)\
		$(LIBSRP)\
		$(OBJECTS)\
		$(LDFLAGSD)\
		-o $(BIND)

$(BUILDDIR)/%.o: %.cpp
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	$(CXX)\
		$(CXXFLAGS)\
		-I$(HEADERDIR)\
		-I$(dir $<)\
		-c $<\
		$(LDFLAGS)\
		-o $@
.phony:\
	runs\
	rund\
	run\
	clean\
	cleanall
runs:
	$(BINS)
rund:
	PATH=$(_PATH) $(BIND)
run:
	$(BINS)
	$(BIND)
test:
	@echo $(LIBSD)
	@echo $(LIBSS)
	@echo $(LIBSLN)
	@echo $(LIBSL)
	@echo $(MACHINE)
	@echo $(SOEXT)
	@echo $(_PATH)
	@echo $(LIBSRP)
clean:
	rm -r ./bin/*
cleanall:
	$(foreach D,$(LIBFOLDERS),make -C ./lib/$D clean;)
	rm -r ./bin/*
