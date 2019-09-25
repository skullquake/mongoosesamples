CC=gcc
CXX=g++
AR=ar
LN=ln
RM=ln
#-------------------------------------------------------------------------------
OS=$(shell $(CXX) -dumpmachine)
ifneq (,$(findstring mingw,$(OS)))
SOEXT?=.dll
BINEXT?=.exe
else
SOEXT?=.so
BINEXT?=
endif
ifeq ($(PREFIX),)
PREFIX := /usr/local
endif
#-------------------------------------------------------------------------------
#LIBRARY[s]
#-------------------------------------------------------------------------------
LIBBUILDDIR=./bin/lib
LIBDIR=lib
LIBNAM=$(shell basename "$(shell pwd)")
LIBPFX=lib
LIBVER=1
LIBBIN=$(LIBDIR)/$(LIBPFX)$(LIBNAM)$(SOEXT).$(LIBVER)
LIBLN=../../$(LIBDIR)/$(LIBPFX)$(LIBNAM)$(SOEXT)
LIBSRCDIR=src
LIBSRC:=$(shell find $(LIBSRCDIR) -name "*.cpp" -o -name "*.c")
LIBSRC+=\

LIBOBJS=$(addprefix $(LIBBUILDDIR)/,$(patsubst %.c,%.o ,$(patsubst %.cpp,%.o,$(LIBSRC))))
LIBCFLAGS=\
	-I./include\
	-I./include/extras/console\
	-I./include/extras/print-alert\
	-I./include/extras/module-duktape\
	-L../
LIBLDFLAGS=\

ifneq (,$(findstring mingw,$(OS)))
LIBLDFLAGS+=\
	-Wl,-unresolved-symbols=ignore-in-shared-libs
else
LIBLDFLAGS+=\
	-rdynamic 
endif
#-------------------------------------------------------------------------------
#RULES
#-------------------------------------------------------------------------------
all:\
	$(LIBLN)
#-------------------------------------------------------------------------------
#APPLICATION RULES
#-------------------------------------------------------------------------------
$(APPBIN):$(APPOBJS)
	$(CXX)\
		$(APPCFLAGS)\
		$(APPOBJS)\
		-o $(APPBIN)\
		$(APPLDFLAGS)
$(APPBUILDDIR)/%.o: %.cpp
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	$(CXX)\
		$(APPCFLAGS)\
		-c $<\
		$(APPLDFLAGS)\
		-o $@
$(APPBUILDDIR)/%.o: %.c
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	$(CC)\
		$(APPCFLAGS)\
		-c $<\
		$(APPLDFLAGS)\
		-o $@

#-------------------------------------------------------------------------------
#LIBRARY RULES
#-------------------------------------------------------------------------------
$(LIBLN):$(LIBBIN)
	$(LN)\
		-sfn \
		"$(shell pwd)/$(LIBBIN)" \
		"$(shell pwd)/$(LIBLN)"
$(LIBBIN):$(LIBOBJS)
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	@$(CXX)\
		$(LIBCFLAGS)\
		$(LIBOBJS)\
		$(LIBLDFLAGS)\
		-shared \
		-Wl,-soname,lib$(LIBNAM)$(SOEXT) \
		-o $(LIBBIN)
$(LIBBUILDDIR)/%.o: %.cpp
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	$(CXX)\
		$(LIBCFLAGS)\
		-c $<\
		-fPIC \
		$(LIBLDFLAGS)\
		-o $@
$(LIBBUILDDIR)/%.o: %.c
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	$(CC)\
		$(LIBCFLAGS)\
		-c $<\
		-fPIC \
		$(LIBLDFLAGS)\
		-o $@

#-------------------------------------------------------------------------------
#MISC
#-------------------------------------------------------------------------------
.phony:\
	run\
	clean\
	lsvar\
	nm\
	objdump	
nm:
	@printf "symbols:\n"
	nm -CD ./lib/liba.so
objdump:
	@printf "objdump:\n"
	objdump -t ./lib/liba.so
clean:
	@rm -r $(LIBBUILDDIR) $(LIBLN) $(LIBBIN)
run:
	$(APPBIN)
lsvar:
	@echo $(LIBSVERPTH)




