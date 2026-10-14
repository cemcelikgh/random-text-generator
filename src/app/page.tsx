import Display from "@/components/Display";
import Selectors from "@/components/selectors/Selectors";

function Home() {
  return (
    <main id="container">
      <h1>Random Text Generator</h1>
      <Selectors />
      <Display />
    </main>
  );
}

export default Home;
