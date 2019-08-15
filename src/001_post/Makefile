CC=gcc
SRC=./src/a.c
BIN=./bin/a
CFLAGS=\
       `pkg-config --cflags mongoose`
LIBS=\
       `pkg-config --libs mongoose`
$(BIN):$(SRC)
	mkdir -p $(@D)
	$(CC)\
		$(CFLAGS)\
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
