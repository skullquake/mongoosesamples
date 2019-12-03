#include"mongoose.h"
#include"bab.h"
#include<iostream>
#include<ostream>
#include<fstream>
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<png.h>
#include<iostream>
#include<pthread.h>
#include"Noise.h"
#include"NoiseUtils.h"
#include<sstream>
#include<json/json.h>
using namespace std;
class LineJob2D:public noisepp::LineJob2D{
	private:
		bool mProgress;
	public:
		LineJob2D(noisepp::Pipeline2D *pipe, noisepp::PipelineElement2D *element, double x, double y, int n, double xDelta, double *buffer, bool progress):
			noisepp::LineJob2D(pipe, element, x, y, n, xDelta, buffer),
			mProgress(progress){
		}
		void finish(){
			if(mProgress){
				std::cout<< ".";
				std::cout.flush ();
			}
		}
};
typedef struct{
	unsigned char red;
	unsigned char green;
	unsigned char blue;
}Pixel;//check
typedef struct {
	Pixel *pixels;
	size_t width;
	size_t height;
}Bitmap;
//--------------------------------------------------------------------------------
// in order to extract lumps
//--------------------------------------------------------------------------------
struct mem_encode{
	char *buffer;
	size_t size;
};
//--------------------------------------------------------------------------------
//custom write
//--------------------------------------------------------------------------------
void my_png_write_data(png_structp png_ptr, png_bytep data, png_size_t length){
	// with libpng15 next line causes pointer deference error; use libpng12 
	// png_get_io_ptr(png_ptr)
	struct mem_encode* p=(struct mem_encode*)png_get_io_ptr(png_ptr);
	// was png_ptr->io_ptr 
	size_t nsize=p->size+length;
	// allocate or grow buffer 
	if(p->buffer)
		p->buffer=(char*)realloc(p->buffer,nsize);
	else
		p->buffer=(char*)malloc(nsize);
	if(!p->buffer)
		png_error(png_ptr,"Write Error");
	memcpy(p->buffer+p->size,data,length);
	p->size += length;
	return;
}
//--------------------------------------------------------------------------------
//custom flush
//--------------------------------------------------------------------------------
void my_png_flush(png_structp png_ptr){
}
struct mem_encode* imagepp_getlumps(noisepp::utils::Image* m_pSourceImage){
	struct mem_encode* ret;
	struct mem_encode* state=NULL;
	if(m_pSourceImage==NULL){
		return NULL;
	}
	int width=m_pSourceImage->getWidth();
	int height=m_pSourceImage->getHeight();
	png_structp pngPtr=NULL;
	png_infop infoPtr=NULL;
	png_byte** rowPointers=NULL;
	size_t x,y;    
	int status=-1;
	int pixelSize=3;
	int depth=8;
	status=0;    
	pngPtr=png_create_write_struct(PNG_LIBPNG_VER_STRING,NULL,NULL,NULL);
	infoPtr=png_create_info_struct(pngPtr);
	if(pngPtr!=NULL){
		png_set_IHDR(pngPtr,
			 infoPtr,
			 (png_uint_32)width,
			 (png_uint_32)height,
			 depth,
			 PNG_COLOR_TYPE_RGB,
			 PNG_INTERLACE_NONE,
			 PNG_COMPRESSION_TYPE_DEFAULT,
			 PNG_FILTER_TYPE_DEFAULT);
		rowPointers=(png_byte**)png_malloc(pngPtr,height*sizeof(png_byte *));
		for (y = 0; y<height;++y){
			png_byte* row=(png_byte*)png_malloc(
				pngPtr,
				sizeof(unsigned char)*width*pixelSize
			);
			rowPointers[y]=row;
			for (x = 0; x < width; ++x) {
				*row++=(png_byte)(*(m_pSourceImage->getPixelData(x,y)+0));
				*row++=(png_byte)(*(m_pSourceImage->getPixelData(x,y)+1));
				*row++=(png_byte)(*(m_pSourceImage->getPixelData(x,y)+2));
			}
		}
		// static 
		state=(struct mem_encode*)malloc(sizeof(struct mem_encode));
		state->buffer=NULL;
		state->size=0;
		png_set_write_fn(pngPtr,state,my_png_write_data,my_png_flush);
		png_set_rows(pngPtr,infoPtr,rowPointers);
		png_write_png(pngPtr,infoPtr,PNG_TRANSFORM_IDENTITY,NULL);//segfaults
		if(state->buffer){
			  //free(state->buffer);
		}
		//free(state);
		for(y=0;y<height;y++){
			png_free(pngPtr,rowPointers[y]);
		}
		png_free(pngPtr,rowPointers);
	}
	return state;
}
static const char *s_http_port="8000";
static struct mg_serve_http_opts s_http_server_opts;
static void send_file(struct mg_connection *nc,struct http_message *hm){
	//http://localhost:8000/test?w=2048&h=1024&s=7&c=true&f=8&stops=[[0,0,0,0],[0.1,0,1,0],[1,0,0,0.2]]
	clock_t time_start;
	time_start=clock();
	std::cout<<"Generating.....";
	int w=512;
	int h=512;
	int f=1;
	int s=0;
	bool c=false;
	char body[100];
	if(
		mg_vcmp(
			&hm->method,
			"GET"
		)==0
	){
		sprintf(body,"");//clear as mg_get_http_var does not always return solid
		char msgbuf[100];
		if(
		  mg_get_http_var(&hm->query_string,"w",body,sizeof(body))==0
		){
		}else{
		   if(strlen(body)==0){
		   }else{
			w=atoi(body);
		   }
		}
		if(
		  mg_get_http_var(&hm->query_string,"h",body,sizeof(body))==0
		){
		}else{
		   if(strlen(body)==0){
		   }else{
			h=atoi(body);
		   }
		}
		if(
		  mg_get_http_var(&hm->query_string,"s",body,sizeof(body))==0
		){
		}else{
		   if(strlen(body)==0){
		   }else{
			if(strcmp(body,"r")==0){
				s=rand();
			}else{
				s=atoi(body);
			}
		   }
		}
		if(
		  mg_get_http_var(&hm->query_string,"f",body,sizeof(body))==0
		){
		}else{
		   if(strlen(body)==0){
		   }else{
			f=atoi(body);
		   }
		}
		if(
		  mg_get_http_var(&hm->query_string,"c",body,sizeof(body))==0
		){
		}else{
		   if(strlen(body)==0){
		   }else{
			if(strcmp(body,"true")==0){
				c=true;
			}else{
				c=false;
			}
		   }
		}
	}
	noisepp::Real *buffer = new noisepp::Real[w*h];
	noisepp::Real xPos=0;
	noisepp::Real yPos=0;
	noisepp::Real xDelta=1.0/noisepp::Real(w);
	noisepp::Real yDelta=1.0/noisepp::Real(h);
	noisepp::PerlinModule perlin;
	perlin.setFrequency(f);
	perlin.setSeed(s);
	noisepp::utils::PlaneBuilder2D builder;
	builder.setModule (perlin);
	builder.setDestination (buffer);
	builder.setSize (w, h);
	builder.setBounds (0.5, 0, 1.5, 1);
	builder.build();
	int threadCount=noisepp::utils::System::getNumberOfCPUs();
	noisepp::Pipeline2D *pipeline=new noisepp::ThreadedPipeline2D(8);
	noisepp::PipelineElement2D *element=pipeline->getElement(perlin.addToPipeline(pipeline));
	for(int y=0;y<h;++y){
		pipeline->addJob(
			new LineJob2D(pipeline,element,xPos,yPos,w,xDelta,buffer+(y*w),false)
		);
		yPos+=xDelta;
	}
	pipeline->executeJobs();
	std::cout<<(1000*((double)(clock()-time_start))/CLOCKS_PER_SEC)<<" ms"<<std::endl;
	time_start=clock();
	std::cout<<"Drawing........";
	noisepp::utils::Image img;
	img.create (w, h);
	noisepp::utils::GradientRenderer renderer;
	if(c==true){
		if(
		  mg_get_http_var(&hm->query_string,"stops",body,sizeof(body))==0
		){
			renderer.addGradient(-1.0000,noisepp::utils::ColourValue(  0/256.0,   0/256.0, 128/256.0)); // deeps
			renderer.addGradient(-0.2500,noisepp::utils::ColourValue(  0/256.0,   0/256.0, 255/256.0)); // shallow
			renderer.addGradient( 0.0000,noisepp::utils::ColourValue(  0/256.0, 128/256.0, 255/256.0)); // shore
			renderer.addGradient( 0.0625,noisepp::utils::ColourValue(240/256.0, 240/256.0,  64/256.0)); // sand
			renderer.addGradient( 0.1250,noisepp::utils::ColourValue( 32/256.0, 160/256.0,   0/256.0)); // grass
			renderer.addGradient( 0.3750,noisepp::utils::ColourValue(224/256.0, 224/256.0,   0/256.0)); // dirt
			renderer.addGradient( 0.7500,noisepp::utils::ColourValue(128/256.0, 128/256.0, 128/256.0)); // rock
			renderer.addGradient( 1.0000,noisepp::utils::ColourValue (255/256.0, 255/256.0,255/256.0)); // snow
		}else{
			if(strlen(body)==0){
				renderer.addGradient(-1.0000,noisepp::utils::ColourValue(  0/256.0,   0/256.0, 128/256.0)); // deeps
				renderer.addGradient(-0.2500,noisepp::utils::ColourValue(  0/256.0,   0/256.0, 255/256.0)); // shallow
				renderer.addGradient( 0.0000,noisepp::utils::ColourValue(  0/256.0, 128/256.0, 255/256.0)); // shore
				renderer.addGradient( 0.0625,noisepp::utils::ColourValue(240/256.0, 240/256.0,  64/256.0)); // sand
				renderer.addGradient( 0.1250,noisepp::utils::ColourValue( 32/256.0, 160/256.0,   0/256.0)); // grass
				renderer.addGradient( 0.3750,noisepp::utils::ColourValue(224/256.0, 224/256.0,   0/256.0)); // dirt
				renderer.addGradient( 0.7500,noisepp::utils::ColourValue(128/256.0, 128/256.0, 128/256.0)); // rock
				renderer.addGradient( 1.0000,noisepp::utils::ColourValue (255/256.0, 255/256.0,255/256.0)); // snow
			}else{
				Json::Value val;
				Json::Reader reader;
				Json::FastWriter fw;
				Json::StyledWriter sw;
				Json::StyledStreamWriter ssw;
				std::istringstream iss;
				iss.str(body);
				bool b=reader.parse(iss,val);
				if(!b){
					std::cerr<<"Error: "<<reader.getFormattedErrorMessages();
					std::cerr<<std::endl;
				}else{
for(int i=0;i<val.size();i++){
	renderer.addGradient(
		val[i][0].asDouble(),
		noisepp::utils::ColourValue(
			val[i][1].asDouble(),
			val[i][2].asDouble(),
			val[i][3].asDouble()
		)
	);
}
				}
			}
		}


	}else{
		renderer.addGradient(-1.0000,noisepp::utils::ColourValue(  0.0,   0.0, 0.0)); // deeps
		renderer.addGradient( 1.0000,noisepp::utils::ColourValue(  1.0,   1.0, 1.0)); // deeps
	}

	renderer.renderImage(img,buffer);
	std::cout<<(1000*((double)(clock()-time_start))/CLOCKS_PER_SEC)<<" ms"<<std::endl;
	time_start=clock();
	std::cout<<"Creating PNG["<<w<<","<<h<<"]...";
	struct mem_encode* lumps=imagepp_getlumps(&img);
	delete[] buffer;
	buffer = 0;
	std::cout<<(1000*((double)(clock()-time_start))/CLOCKS_PER_SEC)<<" ms"<<std::endl;
	time_start=clock();
	std::cout<<"Sending........";
	int BUFSIZE=32;
	char *buf=(char*)malloc(sizeof(char)*BUFSIZE);
	sprintf(buf,"");
	char *mimeType="image/png";
	mg_printf(nc,
		"HTTP/1.1 200 OK\r\n"
		"Cache: no-cache\r\n"
		"Content-Type: %s\r\n"
		"Content-Length: %d\r\n"
		"\r\n",
		mimeType,
		lumps->size
	);
	mg_send(nc,lumps->buffer,lumps->size);
	free(lumps->buffer);
	free(lumps);
	mg_send(nc,"\r\n",2);
	nc->flags |= MG_F_SEND_AND_CLOSE;
	std::cout<<(1000*((double)(clock()-time_start))/CLOCKS_PER_SEC)<<" ms"<<std::endl;
	time_start=clock();
	std::cout<<"Done"<<std::endl;
	free(buf);
}
static void send_babylon(struct mg_connection *nc,struct http_message *hm){
	//http://localhost:8000/test?w=2048&h=1024&s=7&c=true&f=8&stops=[[0,0,0,0],[0.1,0,1,0],[1,0,0,0.2]]
	clock_t time_start;
	std::cout<<"Generating...";
	time_start=clock();
	char *mimeType="application/json";
	BabylonSceneBuilder sb;
	_Global b=sb.build_global();
	std::cout<<(1000*((double)(clock()-time_start))/CLOCKS_PER_SEC)<<" ms"<<std::endl;
	std::stringstream ss;
	ss<<b;
	std::string json=ss.str();//"lorem ipsum";
	mg_printf(nc,
		"HTTP/1.1 200 OK\r\n"
		"Cache: no-cache\r\n"
		"Content-Type: %s\r\n"
		"Content-Length: %d\r\n"
		"\r\n",
		mimeType,
		strlen(json.c_str())
	);
	mg_send(
		nc,
		json.c_str(),
		strlen(json.c_str())
	);
	mg_send(nc,"\r\n",2);
	nc->flags |= MG_F_SEND_AND_CLOSE;
}

//static void ev_handler(struct mg_connection *nc, int ev, void *p) {
static void ev_handler(struct mg_connection *nc, int ev, void *ev_data){
	struct http_message *hm = (struct http_message *)ev_data;
	switch(ev){
		case MG_EV_HTTP_REQUEST:
		{
			if(mg_vcmp(&hm->uri,"/test")==0){
				send_file(nc,hm);
			}else if(mg_vcmp(&hm->uri,"/babylon")==0){
				send_babylon(nc,hm);
			} else {
				mg_serve_http(nc, (struct http_message *) ev_data, s_http_server_opts);
			}
		}
		break;
	case MG_EV_RECV:
		break;
	case MG_EV_CLOSE:
		break;
	}
}
int main(void) {
	struct mg_mgr mgr;
	struct mg_connection *nc;
	mg_mgr_init(&mgr, NULL);
	printf("Starting web server on port %s\n", s_http_port);
	nc = mg_bind(&mgr, s_http_port, ev_handler);
	if (nc == NULL) {
		printf("Failed to create listener\n");
		return 1;
	}
	// Set up HTTP server parameters
	mg_set_protocol_http_websocket(nc);
	s_http_server_opts.document_root = ".";  // Serve current directory
	s_http_server_opts.enable_directory_listing = "yes";
	for (;;) {
		mg_mgr_poll(&mgr, 1000);
	}
	mg_mgr_free(&mgr);
	return 0;
}


