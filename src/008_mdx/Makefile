#todo: filter list and cflags...
JSONCPP=OFF
YAML=OFF
CPR=ON
CURSES=OFF
CACA=OFF
FILTER_OUT = $(foreach v,$(2),$(if $(findstring $(1),$(v)),,$(v)))
CXX=g++
CC=gcc
BUILDDIR=bin
SOURCEDIR=./src
MACHINE=$(shell $(CXX) -dumpmachine)
ifneq (,$(findstring mingw,$(MACHINE)))
	BINEXT=exe
else
	BINEXT=out
endif
#todo: filter list and cflags...
ifeq ($(JSONCPP),ON)
	SOURCES=$(shell find $(SOURCEDIR) -name "*.cpp" -o -name "*.c" )
else
	SOURCES=$(call FILTER_OUT,jsoncpp,$(shell find $(SOURCEDIR) -name "*.cpp" -o -name "*.c" ))
endif
OBJECTS=$(addprefix $(BUILDDIR)/,$(patsubst %.c,%.o ,$(patsubst %.cpp,%.o,$(SOURCES))))
CXXFLAGS=\
	-I./include\
	-I./include/mongoose-cpp\
	-I./include/mongoose\
	-DNO_WEBSOCKET\
	-fpermissive\
	`pkg-config --cflags jsoncpp`
#todo: filter list and cflags...
ifeq ($(JSONCPP),ON)
	CXXFLAGS+=\
		-I./include/jsoncpp
else
	CXXFLAGS+=\
		-DNO_JSONCPP
endif
CFLAGS=$(CXXFLAGS)
LDFLAGS=\
	-lcurl
ifneq (,$(findstring mingw,$(MACHINE)))
LDFLAGS+=\
	-ldl\
	-lws2_32\
	-lstdc++
else
LDFLAGS+=\
	-lpthread\
	-lc\
	-ldl
endif
LDFLAGS+=\
	`pkg-config --libs jsoncpp`\
	-lPocoFoundation
BIN=./bin/a.$(BINEXT)
default:all
all: $(BIN) $(BUILD_NUMBER_FILE)
$(BIN): $(OBJECTS) 
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	$(CXX)\
		$(CXXFLAGS)\
		$(OBJECTS)\
		$(LDFLAGS)\
		-o $(BIN)
$(BUILDDIR)/%.o: %.cpp
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	$(CXX)\
		$(CXXFLAGS)\
		-I$(HEADERDIR)\
		-I$(dir $<)\
		-c $<\
		-o $@
$(BUILDDIR)/%.o: %.c
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	$(CC)\
		$(CFLAGS)\
		-I$(HEADERDIR)\
		-I$(dir $<)\
		-c $<\
		-o $@
.phony:\
	run\
	clean\
	test
run: $(BIN)
	$(BIN)
clean:
	rm -r $(BIN) ./bin/src
test:
	curl --data '{"foo":"bar"}' http://localhost:8080/feedback?k0=666
