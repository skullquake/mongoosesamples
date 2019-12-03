CC=g++
SRC=./src/a.cpp
SRVSRC=./src/a.cpp
SRVOBJ=./bin/srv.o
BABSRC=./src/bab.cpp
BABOBJ=./bin/bab.o
BIN=./bin/srv
CFLAGS=\
	-MMD \
	-D "NDEBUG" \
	-DNOISEPP_ENABLE_THREADS \
	-DNOISEPP_ENABLE_UTILS \
	-I/usr/include/noisepp/core \
	-I/usr/include/noisepp/threadpp \
	-I/usr/include/noisepp/utils  \
	-I./inc \
	-O3 \
	-fomit-frame-pointer \
	-ffast-math \
	-funroll-loops
LIBS=\
	-lmongoose \
	-lpng \
	-lgd \
	-lpthread \
	-lrt \
	-lnoise \
	-lnoisepp \
	-ljsoncpp
$(BIN): $(BABOBJ) $(SRVOBJ)
	$(CC) $(CFLAGS) $(BABOBJ) $(SRVOBJ) $(LIBS) -o $(BIN)
	pkill srv
$(SRVOBJ): $(SRVSRC)
	$(CC) -c $(CFLAGS) $(SRVSRC) -o $(SRVOBJ)
$(BABOBJ): $(BABSRC) ./inc/bab.h
	$(CC) -c $(CFLAGS) $(BABSRC) -o $(BABOBJ)
.phony:clean
clean:
	rm $(BIN) ./bin/*.o
