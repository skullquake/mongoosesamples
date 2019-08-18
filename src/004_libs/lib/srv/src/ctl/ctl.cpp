#include"ctl/ctl.h"
#include"view/page.h"
#include"view/layout.h"
#include"view/menu.h"
#include"view/table.h"
#include"view/person.h"

#include"uuid/uuid.h"
#include<iostream>
#include<string>
#include<cstdlib>
#include<sstream>
#include<random>
#include<string>






#include <iostream>
#include "HTML.h"
#define HTML_INDENTATION 1
#define HTML_ENDLINE "\n"


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
	std::vector<std::string> vdat={"foo","bar","baz"};
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
}

void html2(Request &request,StreamResponse &response){
	//view::Page p;
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
	//----------------------------------------
	document<<std::move(main);
	response<<document;
	//response<<"------------------"<<std::endl;
	//HTML::Div _=p.getBody();
	//p.getBody()<<"asdf";
	//response<<p.getBody();
	/*
    HTML::Document document("Welcome to HTML");
    document.addAttribute("lang","en");
    document.head()
	<<HTML::Meta()//Meta("utf-8")//issue
	<<HTML::Meta("viewport","width=device-width,initial-scale=1,shrink-to-fit=no");
    document.head()
	<<HTML::Rel("stylesheet","https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css")
	  .integrity("sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T").crossorigin("anonymous");
    document.head()
	<<HTML::Style(".navbar{margin-bottom:20px;}");
    document.body().cls("bg-light");
    HTML::List navList(false,"navbar-nav mr-auto");
    navList
	<<std::move(HTML::ListItem().cls("nav-item active")<<HTML::Link("Home","#").cls("nav-link"));
    navList
	<<std::move(HTML::ListItem().cls("nav-item")<<HTML::Link("Link","#").cls("nav-link"));
    navList
	<<std::move(HTML::ListItem().cls("nav-item")<<HTML::Link("Disabled","#").cls("nav-link disabled"));
    navList<<std::move(HTML::ListItem().cls("nav-item dropdown")
	<<HTML::Link("Dropdown","#").cls("nav-link dropdown-toggle").id("dropdown01").addAttribute("data-toggle","dropdown").addAttribute("aria-haspopup","true").addAttribute("aria-expanded","false")
       <<(
		HTML::Div("dropdown-menu").addAttribute("aria-labelledby","dropdown01")
			<<HTML::Link("Action","#").cls("dropdown-item")
			<<HTML::Link("Another","#").cls("dropdown-item")
	   )
    );
    document
	<<(HTML::Nav("navbar navbar-expand navbar-dark bg-dark")<<(HTML::Div("collapse navbar-collapse")<<std::move(navList)));
    HTML::Div main("container");
    main
	<<HTML::Header1("Welcome to HTML").id("anchor_link_1");
    main
	<<"Text directly in the body.";
    main
	<<HTML::Text("Text directly in the body. ")<<HTML::Text("Text directly in the body.")<<HTML::Break()
	<<HTML::Text("Text directly in the body.");
    main
	<<HTML::Paragraph("This is the way to go for a big text in a multi-line paragraph.");
    main
	<<HTML::Link("Google","http://google.com").cls("my_style");
    main
	<<(HTML::Paragraph("A paragraph. ").style("font-family:arial")
	<<HTML::Text("Text child.")<<HTML::Break()<<HTML::Text("And more text."));
    main
	<<(HTML::List()
	<<(HTML::ListItem("Text item"))
	<<(HTML::ListItem()<<HTML::Link("Github Link","http://srombauts.github.io").title("SRombaut's Github home page"))
	<<(
		HTML::ListItem()<<(HTML::List()
			<<HTML::ListItem("val1")
			<<HTML::ListItem("val2"))
	   )
	);
    main
	<<(
		HTML::Table().cls("table table-hover table-sm")
			<<HTML::Caption("Table caption")
			<<(HTML::Row()<<HTML::ColHeader("A")<<HTML::ColHeader("B"))
			<<(HTML::Row()<<HTML::Col("Cell_11")<<HTML::Col("Cell_12"))
			<<(HTML::Row()<<HTML::Col("Cell_21")<<HTML::Col("Cell_22"))
			<<(HTML::Row()<<HTML::Col("")<<HTML::Col("Cell_32"))
	   );
    main
	<<HTML::Small("Copyright Sebastien Rombauts @ 2017-2019");
    main
	<<HTML::Link().id("anchor_link_2");
    document
	<<std::move(main);
    document
	<<HTML::Script("https://code.jquery.com/jquery-3.3.1.slim.min.js")
           .integrity("sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo").crossorigin("anonymous");
    document
	<<HTML::Script("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js")
           .integrity("sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1").crossorigin("anonymous");
    document
	<<HTML::Script("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js")
           .integrity("sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM").crossorigin("anonymous");
    response<<document;
	*/
}
void Ctl::setup(){
	addRoute("GET","/tree",Ctl,tree);
	addRoute("GET","/chart",Ctl,chart);
	addRoute("GET","/piechart",Ctl,piechart);
	addRoute("GET","/scatterchart",Ctl,scatterchart);
	addRoute("GET","/rnd",Ctl,rnd);
	addRoute("GET","/html",Ctl,html);
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
