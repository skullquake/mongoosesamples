#include<iostream>
#include<pthread.h>
#include"Noise.h"
#include"NoiseUtils.h"
using namespace std;

/// 2D pipeline job generating a line
class LineJob2D : public noisepp::LineJob2D
{
	private:
		bool mProgress;

	public:
		LineJob2D (noisepp::Pipeline2D *pipe, noisepp::PipelineElement2D *element, double x, double y, int n, double xDelta, double *buffer, bool progress) :
			noisepp::LineJob2D(pipe, element, x, y, n, xDelta, buffer), mProgress(progress)
		{}
		void finish ()
		{
			if (mProgress)
			{
				cout << ".";
				cout.flush ();
			}
		}
};




int main (){
 int threadCount=noisepp::utils::System::getNumberOfCPUs();
 std::cout<<threadCount<<std::endl;
 // our module
 noisepp::PerlinModule perlin;
 //noisepp::Pipeline2D *pipeline=noisepp::utils::System::createOptimalPipeline2D();
 noisepp::Pipeline2D *pipeline=new noisepp::ThreadedPipeline2D(8);
 //noisepp::Pipeline2D *pipeline=new noisepp::Pipeline2D;
 noisepp::PipelineElement2D *element=pipeline->getElement(perlin.addToPipeline(pipeline));
 perlin.setOctaveCount (8);
 // size
 int w = 4096;
 int h = 4096;
 // create the buffer
 noisepp::Real *buffer = new noisepp::Real[w*h];
 noisepp::Real xPos=0;
 noisepp::Real yPos=0;
 noisepp::Real xDelta=1.0/noisepp::Real(w);
 noisepp::Real yDelta=1.0/noisepp::Real(h);
 //add jobs
 for(int y=0;y<h;++y){
  pipeline->addJob(
   new LineJob2D(pipeline,element,xPos,yPos,w,xDelta,buffer+(y*w),false)
  );
  yPos+=xDelta;
 }
 pipeline->executeJobs();
 /*
 // create a builder
 noisepp::utils::PlaneBuilder2D builder;
 // set the source module
 builder.setModule (perlin);
 // set the buffer
 builder.setDestination (buffer);
 // set the buffer size
 builder.setSize (w, h);
 // set the plane bounds - from (0.5|0) to (1.5|1)
 builder.setBounds (0.5, 0, 1.5, 1);
 // build
 builder.build ();
 */
 
 // create an image
 noisepp::utils::Image img;
 img.create (w, h);
 // create the renderer and add some gradients to create a heat-vision like material
 noisepp::utils::GradientRenderer renderer;
 // renderer.addGradient (<value>, noisepp::utils::ColourValue(<red>, <green>, <blue>));
 renderer.addGradient (-1.0, noisepp::utils::ColourValue(0.0f, 0.0f, 0.2f));
 renderer.addGradient (-0.8, noisepp::utils::ColourValue(0.0f, 0.0f, 0.6f));
 renderer.addGradient ( 0.0, noisepp::utils::ColourValue(1.0f, 0.0f, 0.0f));
 renderer.addGradient ( 0.6, noisepp::utils::ColourValue(1.0f, 1.0f, 0.0f));
 renderer.addGradient ( 1.0, noisepp::utils::ColourValue(1.0f, 1.0f, 1.0f));
 // render the image
 renderer.renderImage (img, buffer);
 // save the image to an BMP
 img.saveBMP ("./out/a.bmp");
 
 // free the buffer
 delete[] buffer;
 buffer = 0;
 
 return 0;
}


