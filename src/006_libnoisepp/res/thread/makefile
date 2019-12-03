CC=g++
SRC=./src/a.cpp
BIN=./bin/a.out
CFLAGS=\
	-MMD \
	-D "NDEBUG" \
	-DNOISEPP_ENABLE_THREADS \
	-DNOISEPP_ENABLE_UTILS \
	-I/usr/include/noisepp/core \
	-I/usr/include/noisepp/threadpp \
	-I/usr/include/noisepp/utils  \
	-O3 \
	-fomit-frame-pointer \
	-ffast-math \
	-funroll-loops
LIBS=\
	-lpthread \
	-lrt \
	-lnoisepp 
$(BIN): $(SRC) 
	$(CC) $(CFLAGS) $(SRC) $(LIBS) -o $(BIN)
.phony:clean
clean:
	rm $(BIN)
