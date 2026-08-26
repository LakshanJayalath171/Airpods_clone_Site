import Features from "./component/Features"
import Hero from "./component/Hero"
import Navbar from "./component/Navbar"
import Product from "./component/Product"
import Slider from "./component/Slider"
import Video_sec from "./component/Video_sec"

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Slider/>
      <Video_sec/>
      <Product/>
      <Features/>
    </div>
  )
}

export default App