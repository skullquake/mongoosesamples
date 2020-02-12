CC=gcc
SRC=\
	./src/a.c\
	../lib/mongoose/mongoose.c
BIN=./bin/a
CFLAGS=\
	-I../lib/mongoose
LIBS=\
	-lm
$(BIN):$(SRC)
	mkdir -p $(@D)
	$(CC)\
		$(CFLAGS)\
		$(SRC)\
		$(LIBS)\
		-o $(BIN)
.phony:\
	run\
	test\
	clean
run:
	$(BIN)
test:
	cat /dev/urandom|nc localhost 1234 > /dev/null
clean:
	rm $(BIN)
