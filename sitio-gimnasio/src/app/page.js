import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
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
      </div>
    </main>
  );
}
