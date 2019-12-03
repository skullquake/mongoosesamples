CC=g++
SRC=./src/a.cpp
BIN=./bin/a.out
CFLAGS=
LIBS=-lnoise -lnoiseutils
$(BIN): $(SRC)
	$(CC) $(SRC) $(LIBS) -o $(BIN)
.phony:clean
clean:
	rm $(BIN)
