import Header from "@/components/home/Header";
import Services from "@/components/home/Services";
import Carousel from "@/components/home/Carousel";

export default function Home({carouselImages}) {
  return (
    <div>
      <Header />
      <Services />
      {/* <Carousel /> */}
      {/* <div>
        header
        <div>
          carousel
        </div>
        end header
      </div>
      <div>
        about us
        end about us
      </div>
      <div>
        ...
      </div>
      <div>
        contact us
        end contact us
      </div> */}
    </div>
  );
}
