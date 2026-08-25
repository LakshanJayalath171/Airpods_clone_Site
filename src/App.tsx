import Hero from "./component/Hero"
import Navbar from "./component/Navbar"
import Slider from "./component/Slider"
import Video_sec from "./component/Video_sec"

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Slider/>
      <Video_sec/>
    </div>
  )
}

export default App