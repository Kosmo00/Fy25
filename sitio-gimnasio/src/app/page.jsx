import Header from "@/components/home/Header";
import Services from "@/components/home/Services";
import Carousel from "@/components/home/Carousel";
import Social from "@/components/home/Social";
import About from "@/components/home/About";
import ContactUs from "@/components/home/ContactUs";

const images = [
  {src: '/foto2.jpeg'}, 
  {src: '/foto3.jpg'},
  {src: '/foto4.jpeg'},
  {src: '/gym.jpeg'},
  {src: '/gym2.png'},
]

const images2 = [
  {src: '/gym3.jpeg'}, 
  {src: '/image5.jpeg'},
  {src: '/image6.webp'},
  {src: '/image7.webp'},
  {src: '/wasoski.jpg'},
]

export default function Home({carouselImages}) {
  return (
    <div>
      <Header />
      <Services />
      <Carousel images={images} autoplayDelay={8000} />
      <Social />
      <About />
      <ContactUs />
    </div>
  );
}
