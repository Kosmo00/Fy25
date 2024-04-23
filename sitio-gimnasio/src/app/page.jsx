import GymCarousel from "@/components/Carousel";
const placeholders = [
  {
    src: "/placeholders/1.webp",
    txt: "Test 1"
  }, 
  {
    src: "/placeholders/2.webp",
    txt: "Test 2"
  }, 
  {
    src: "/placeholders/3.webp",
    txt: "Test 3"
  }, 
  {
    src: "/placeholders/4.webp",
    txt: "Test 4"
  }
]

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
