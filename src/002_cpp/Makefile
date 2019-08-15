CXX=g++
CXXFLAGS=\
     `pkg-config --cflags mongoosecpp`
LIBS=\
     `pkg-config --libs mongoosecpp`
SRC=./src/a.cpp
BIN=./bin/a
$(BIN):$(SRC)
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
