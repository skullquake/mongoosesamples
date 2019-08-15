CXX=g++
CXXFLAGS=\
     `pkg-config --cflags mongoosecpp`\
     `pkg-config --cflags jsoncpp`
LIBS=\
     `pkg-config --libs mongoosecpp`\
     `pkg-config --libs jsoncpp`
SRC=./src/a.cpp
BIN=./bin/a
$(BIN):$(SRC)
	mkdir -p $(@D)
	$(CXX)\
		$(CXXFLAGS)\
		$(SRC)\
		$(LIBS)\
		-o $(BIN)
.phony:\
	run\
	clean
run:
	$(BIN)
clean:
	rm $(BIN)
#	-lmongoosecpp
#	-lws2_32
#	-lstdc++
