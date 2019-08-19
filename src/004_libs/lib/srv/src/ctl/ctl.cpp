#include"ctl/ctl.h"
#include"view/page.h"
#include"view/layout.h"
#include"view/menu.h"
#include"view/table.h"
#include"view/person.h"

#include"cpputils/uuid/uuid.h"
#include<iostream>
#include<fstream>
#include<string>
#include<cstdlib>
#include<sstream>
#include<random>
#include<string>






#include <iostream>
#include "HTML.h"
#define HTML_INDENTATION 1
#define HTML_ENDLINE "\n"


//cairo test
#include<cairo.h>
#include<time.h>


using namespace std;
using namespace Mongoose;
using namespace ctl;
void r(Json::Value&,std::vector<std::string>,int);
void rhtml(HTML::Element&,int);
void Ctl::tree(Request &request,StreamResponse &response){
	int d;
	try{
		d=std::stoi(htmlEntities(request.get("depth")));
	}catch (std::invalid_argument const &e){
		std::cout<<"Bad input: std::invalid_argument thrown"<<'\n';
		d=1;
	}catch (std::out_of_range const &e){
		std::cout<<"Integer overflow: std::out_of_range thrown"<<'\n';
		d=1;
	}
	std::vector<std::string> v{"foo","bar","baz","qux","klutz"}; 
	Json::Value j;
	j["identifier"]="idx";
	j["label"]="name";
	j["items"]=Json::Value(Json::arrayValue);
	Json::Value root;
	root["idx"]=cpputils::UUID::generateUUID();
	root["name"]="foo";
	r(root,v,d);
	j["items"].append(root);
	Json::StreamWriterBuilder styledWriter;
	response.setHeader("Content-type","application/json");
	std::unique_ptr<Json::StreamWriter> writer(styledWriter.newStreamWriter());
	writer->write(j,&response);
	response<<std::endl;
}
void Ctl::chart(Request &request,StreamResponse &response){
	Json::Value j;
	j["identifier"]="symbol";
	j["idAttribute"]="symbol";
	j["symbol"]="labe";
	j["label"]="name";
	j["items"]=Json::Value(Json::arrayValue);
	std::vector<std::string> vsym={
		"ANDT",
		"ATEU",
		"BGCN",
		"BAYC",
		"CRCR",
		"DTOA"
	};
	for(int i=0;i<8;i++){
		Json::Value itm;
		itm["symbol"]=vsym[rand()%vsym.size()];
		itm["historicPrice"]=Json::Value(Json::arrayValue);
		for(int j=0;j<8;j++){
			itm["historicPrice"].append((rand()%100)/100.0);
		}
		j["items"].append(itm);
	}
	Json::StreamWriterBuilder styledWriter;
	response.setHeader("Content-type","application/json");
	std::unique_ptr<Json::StreamWriter> writer(styledWriter.newStreamWriter());
	writer->write(j,&response);
	response<<std::endl;
}
void Ctl::piechart(Request &request,StreamResponse &response){
	Json::Value j=Json::Value(Json::arrayValue);
	for(int i=0;i<8;i++){
		Json::Value itm;
		itm["x"]=1;
		itm["y"]=(rand()%100)/100.0;
		j.append(itm);
	}
	Json::StreamWriterBuilder styledWriter;
	response.setHeader("Content-type","application/json");
	std::unique_ptr<Json::StreamWriter> writer(styledWriter.newStreamWriter());
	writer->write(j,&response);
	response<<std::endl;
}
void Ctl::scatterchart(Request &request,StreamResponse &response){
	int nval;
	try{
		nval=std::stoi(htmlEntities(request.get("nval")));
	}catch (std::invalid_argument const &e){
		std::cout<<"Bad input: std::invalid_argument thrown"<<'\n';
		nval=8;
	}catch (std::out_of_range const &e){
		std::cout<<"Integer overflow: std::out_of_range thrown"<<'\n';
		nval=8;
	}

	Json::Value j;
	std::vector<std::string> snam{"foo","bar","baz","qux","klutz"}; 
	for(
		std::vector<std::string>::const_iterator it=snam.begin();
		it!=snam.end();
		it++
	){
		Json::Value itm;
		for(int i=0;i<nval;i++){
			itm.append(rand());
		}
		j[*it]=itm;
	}
	Json::StreamWriterBuilder styledWriter;
	response.setHeader("Content-type","application/json");
	std::unique_ptr<Json::StreamWriter> writer(styledWriter.newStreamWriter());
	writer->write(j,&response);
	response<<std::endl;
}
void Ctl::rnd(Request &request,StreamResponse &response){
	std::random_device rd;
	std::mt19937 gen(rd());
	std::uniform_int_distribution<> dis(0,255);
	std::stringstream ss;
	const auto rc=dis(gen);
	response<<std::hex<<rc;
	//response<<"test"<<std::endl;
}
void Ctl::html(Request &request,StreamResponse &response){
	view::Page page;
	view::Layout layout;
	view::Menu menu;
	std::vector<std::string> vmnuitm={
		"File",
		"Edit",
		"About",
	};
	for(
		std::vector<std::string>::const_iterator itmnuitm=vmnuitm.begin();
		itmnuitm!=vmnuitm.end();
		itmnuitm++
	){
		menu.addItem(*itmnuitm);
	}
	layout.getMenu()<<std::move(menu.toHtml());
	view::Table _table;
	std::vector<std::string> vhdr={"hdr0","hdr1","hdr2"};
	std::vector<std::string> vdat={"foo","bar","baz"};
	_table.setHeader(vhdr);
	_table.addRow(vdat);
	_table.addRow(vdat);
	_table.addRow(vdat);
	layout.getBody()<<std::move(_table.toHtml());
	std::vector<view::Person> vp;
	//jq '.' ./res/surnames.json |shuf -n 48
	std::vector<std::string> vnam={
		"Norah",
		"Belita",
		"Ranique",
		"Korella"
		"Sybille",
		"Thea",
		"Karmen",
		"Corine",
		"Lauree",
		"Viv",
		"Elyse",
		"Shelli",
		"Georgeta",
		"Iormina",
		"Jacinta",
		"Fara",
		"Tobe",
		"Sada",
		"Idette",
		"Sioux",
		"Janelle",
		"Annette",
		"Jorie",
		"Celestyn",
		"Ailis",
		"Renae",
		"Janaya",
		"Elicia",
		"Sayre",
		"Mariya",
		"Jorey",
		"Sabra",
		"Tawsha",
		"Melanie",
		"Christye",
		"Dawn"
	};
	std::vector<std::string> vsnam={
		"Olivetti",
		"Beneke",
		"Delfino"
	};
	int ssoc=0;;
	for(
		std::vector<std::string>::const_iterator itnam=vnam.begin();
		itnam!=vnam.end();
		itnam++
	){
		for(
			std::vector<std::string>::const_iterator itsnam=vsnam.begin();
			itsnam!=vsnam.end();
			itsnam++
		){
			view::Person p;
			p.setName(*itnam);
			p.setSurname(*itsnam);
			std::string sssoc=std::to_string(ssoc++);
			sssoc=std::string(8-sssoc.length(),'0')+sssoc;
			p.setSSOC(sssoc);
			vp.push_back(p);
		}
	}
	Json::FastWriter fw;
	HTML::Element table("table");
	table.addAttribute("class","table table-striped");
	for(
		std::vector<view::Person>::iterator itp=vp.begin();
		itp!=vp.end();
		itp++
	){
		table<<
			(
				HTML::Element("tr").addAttribute("class","table table-striped")
					<<(
						HTML::Element("td").addAttribute("id","name")
							<<(*itp).getName()
					)
					<<(
						HTML::Element("td").addAttribute("id","surname")
							<<(*itp).getSurname()
					)
					<<(
						HTML::Element("td").addAttribute("id","SSOC")
							<<(*itp).getSSOC()
					)
					<<(
						HTML::Element("td").addAttribute("id","json")
							<<(
								HTML::Element("code")
									<<fw.write((*itp).toJson())
							)
					)
			)
		;
	}
	layout.getBody()<<std::move(table);
	layout.getBody()<<(HTML::Script()<<"\
		//alert(dojo.query('.personview'));\
"
	);
	page.getDocument()<<std::move(layout.getMenu());;
	page.getDocument()<<std::move(layout.getBody());;
	response<<page;
	//std::string b=response.getBody();
	//b="asdf";
	//response.getBody()="a";
	//std::ifstream input("Makefile");
	//char bytes[] = {'a',0,1,2,3,'b','c'};
	//response<<bytes;//std::istringstream( std::string( std::begin( bytes ), std::end( bytes ) ) );//bytes;//input;
}
void html2(Request &request,StreamResponse &response){
	HTML::Document document("HTML");
	document.addAttribute("lang","en");
	document.head()<<HTML::Meta()<<HTML::Meta("viewport","width=device-width,initial-scale=1,shrink-to-fit=no");
	document.head()<<HTML::Rel("stylesheet","https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css").integrity("sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T").crossorigin("anonymous");
	/*
	document.head()<<HTML::Style("*{background:#000000;}");
	document.head()<<HTML::Style("*{color:#00FF00;}");
	document.head()<<HTML::Style("*{font-family:monospace;}");
	document.head()<<HTML::Style("*{font-size:8px;}");
	*/
	document.body().cls("bg-light");
	HTML::Div main;
	HTML::Div divr;
	rhtml(divr,12);
	main<<(
		HTML::Div().addAttribute("class","row")<<(
			HTML::Div().addAttribute("class","col-sm-12")<<(
				HTML::Div().addAttribute("class","card")<<(
					HTML::Div().addAttribute("class","card-body")<<(
						(HTML::Div().addAttribute("class","card-title")<<"Recursive")
					)
					<<std::move(divr)
				)
			)
		)
	);

	//main<<std::move(divr);
	HTML::Table t;
	t<<HTML::Caption("Table caption");
	HTML::Row r=HTML::Row();
	int nrow=8;
	int ncol=8;
	for(int j=0;j<ncol;j++){
		r<<HTML::ColHeader(std::to_string(j));
	}
	t<<HTML::Row(r);
	for(int i=0;i<nrow;i++){
		HTML::Row r=HTML::Row();
		for(int j=0;j<ncol;j++){
			r<<HTML::Col(std::to_string(i));
		}
		t<<HTML::Row(r);
	}
	main<<(
		HTML::Div().addAttribute("class","row")<<(
			HTML::Div().addAttribute("class","col-sm-12")<<t.cls("table table-hover table-sm")
		)
	);
	//----------------------------------------
	//alert gen
	//----------------------------------------
	std::stringstream ss;
	std::random_device rd;
	std::mt19937 gen(rd());
	std::uniform_int_distribution<> dis(0,255);
	auto rc=dis(gen);
	HTML::Div row;
	int bsncol=12;
	int bscolw=4;
	std::vector<std::string> alertLevel={"info","warning","success","danger"};
	for(int i=0;i<32;i++){
		ss.str("");
		for(int j=0;j<32;j++){
			rc=dis(gen);
			ss<<std::hex<<rc;
		}
		if(i%(bsncol/bscolw)==0){
			row=HTML::Div();
			row.addAttribute("class","row");
		}
		HTML::Div col_sm_6_0;
		col_sm_6_0.addAttribute("class",std::string("col-sm-")+std::to_string(bscolw));
		col_sm_6_0<<(
					HTML::Div()
					.addAttribute("style","overflow-wrap:break-word;")
					.addAttribute("class",std::string("alert ")+std::string("alert-")+alertLevel[rand()%alertLevel.size()])
					<<ss.str()
			);
		row<<std::move(col_sm_6_0);
		if(i%(bsncol/bscolw)==(bsncol/bscolw)-1){
			main<<std::move(row);
		}
	}
	document<<std::move(main);
	response<<document;
}

void Ctl::setup(){
	addRoute("GET","/tree",Ctl,tree);
	addRoute("GET","/chart",Ctl,chart);
	addRoute("GET","/piechart",Ctl,piechart);
	addRoute("GET","/scatterchart",Ctl,scatterchart);
	addRoute("GET","/rnd",Ctl,rnd);
	addRoute("GET","/html",Ctl,html);
	addRoute("GET","/cairo",Ctl,cairotest);
}
void r(Json::Value& j,std::vector<std::string> v,int i){
	if(i<=0){
		return;
	}else{
		for(std::string x:v){
			Json::Value itm;
			itm["name"]=x;
			itm["idx"]=cpputils::UUID::generateUUID();
			itm["children"]=Json::Value(Json::arrayValue);
			for(std::string _x:v){
				Json::Value citm;
				citm["name"]=_x;
				citm["idx"]=cpputils::UUID::generateUUID();
				if(i>=2){
					citm["children"]=Json::Value(Json::arrayValue);
					r(citm,v,i-1);
				}
				itm["children"].append(citm);
			}
			j["children"].append(itm);
		}
	}
}
void rhtml(HTML::Element& e,int i){
	if(i<=0){
	}else{
		for(int j=0;j<2;j++){
			HTML::Div c=HTML::Div();
			c.addAttribute("style","padding-top:8px;margin-left:8px;margin-right:8px;background:rgba(0,0,0,0.1);");
			c.addAttribute("id",std::to_string(i)+"_"+std::to_string(j));
			rhtml(c,i-1);
			e<<std::move(c);
		}
	}
}



int reqid=0;
int total_length = 0;
typedef struct
{
    unsigned char *pos;
    unsigned char *end;
} closure_t;
static cairo_status_t png_to_array (void *closure, const unsigned char *data, unsigned int length){
	closure_t *cl = (closure_t *) closure;
	if ((cl->pos + length) > (cl->end))
		return CAIRO_STATUS_WRITE_ERROR;
	memcpy (cl->pos, data, length);
	cl->pos += length;
	total_length += length;
	return CAIRO_STATUS_SUCCESS;
}

//static void send_file(struct mg_connection *nc){
//static void send_file(struct mg_connection *nc){
void Ctl::cairotest(Request &request,StreamResponse &response){
	cairo_surface_t *surface;
	cairo_t *cr;
	surface=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,640,480);
	cr=cairo_create(surface);
	cairo_set_source_rgb(cr,255,255,0);
	cairo_select_font_face(cr,"Sans",CAIRO_FONT_SLANT_NORMAL,CAIRO_FONT_WEIGHT_NORMAL);
	cairo_set_font_size(cr,20.0);
	cairo_move_to(cr,10.0,50.0);
	char str_date[100];
	time_t now		=time(NULL);
	struct tm *t		=localtime(&now);
	strftime(str_date, sizeof(str_date)-1, "%Y-%m-%d[%H:%M:%S]", t);
	cairo_show_text(cr,str_date);
	srand(time(0));
	for(int i=0;i<512;i++){
		int x=rand()%640;
		int y=rand()%480;
		int l=rand()%128+128;
		cairo_move_to(cr,x,y);
		cairo_line_to(cr,x+rand()%16-8,y+rand()%16-8);
		//cairo_set_source_rgb(cr,rand()%255,rand()%255,rand()%255);
		cairo_stroke(cr);

	}
	//cairo_surface_write_to_png(surface,"./out/a.png");
	int stride = cairo_image_surface_get_stride(surface);
	unsigned char *arr=(unsigned char *) malloc(stride);
	closure_t cl;
	// copy surface png to arr
	cl.pos = arr;
	cairo_surface_write_to_png_stream (surface,
	(cairo_write_func_t) png_to_array,
	&cl);
	cairo_destroy(cr);
	cairo_surface_destroy(surface);
	arr;
	total_length;
	std::cout<<response.getBody()<<std::endl;
	response<<"a";
}
