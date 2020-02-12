#include"mongoose.h"
#include<stdio.h>
long int i=0;
char msgRecv[80];
char msgTot[80];
void pretty_bytes(char* buf,uint bytes){
	const char* suffixes[7];
	suffixes[0]="B";
	suffixes[1]="KB";
	suffixes[2]="MB";
	suffixes[3]="GB";
	suffixes[4]="TB";
	suffixes[5]="PB";
	suffixes[6]="EB";
	uint s=0;
	double count=bytes;
	while(count>=1024&&s<7){
		s++;
		count/=1024;
	}
	if(count-floor(count)==0.0)
		sprintf(buf,"%d %s",(int)count,suffixes[s]);
	else
		sprintf(buf,"%.1f %s",count,suffixes[s]);
}
static void ev_handler(struct mg_connection *nc,int ev,void *evdata){
	struct mbuf *io=&nc->recv_mbuf;
	switch(ev){
		case MG_EV_RECV:
			i+=(io->len);
			pretty_bytes(msgRecv,io->len);
			pretty_bytes(msgTot,i);
			printf("Receiving [%s][%s]\n",msgTot,msgRecv);
			mg_send(nc,io->buf,io->len);
			mbuf_remove(io,io->len);
			break;
		default:
			break;
	}
}
int main(void){
	struct mg_mgr mgr;
	mg_mgr_init(&mgr,NULL);
	mg_bind(&mgr,"1234",ev_handler);
	for(;;){
		mg_mgr_poll(&mgr,1000);
	}
	mg_mgr_free(&mgr);
	return 0;
}

