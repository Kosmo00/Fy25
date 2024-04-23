import GymCarousel from "@/components/Carousel";

const placeholders = [{
  src: "/placeholders/1.webp",
  txt: "Test"
}]

export default function Home() {
  return (
    <div className="pt-20">
      <div>
        <GymCarousel images={placeholders} />
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
      </div>
    </div>
  );
}
