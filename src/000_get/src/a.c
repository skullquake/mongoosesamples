#include<mongoose.h>
static int s_exit_flag=0;
static void ev_handler(struct mg_connection *nc,int ev,void *ev_data){
	struct http_message *hm=(struct http_message *)ev_data;
	switch(ev) {
		case MG_EV_CONNECT:
			if (*(int*)ev_data!=0) {
				fprintf(
					stderr,
					"connect() failed: %s\n",
					strerror(
						*(int*)ev_data
					)
				);
				s_exit_flag=1;
			}
			break;
		case MG_EV_HTTP_REPLY:
			nc->flags|=MG_F_CLOSE_IMMEDIATELY;
			fwrite(hm->message.p,1,hm->message.len,stdout);
			printf("%d",hm->body.len);
			fwrite(hm->body.p,1,hm->body.len,stdout);
			putchar('\n');
			s_exit_flag=1;
			break;
		case MG_EV_CLOSE:
			if (s_exit_flag==0) {
				printf("Server closed connection\n");
				s_exit_flag=1;
			}
			break;
		default:
			break;
	}
}
int main(int argc,char *argv[]){
	struct mg_mgr mgr;
	mg_mgr_init(&mgr,NULL);
	mg_connect_http(
		&mgr,
		ev_handler,
		"http://httpbin.org/get",
		NULL,
		NULL
	);
	while(s_exit_flag==0){
		mg_mgr_poll(&mgr,1000);
	}
	mg_mgr_free(&mgr);
	return 0;
}
