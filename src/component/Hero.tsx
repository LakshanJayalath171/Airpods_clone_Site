const Hero = () => {
  return (
    <div className='relative h-screen w-full flex items-center justify-center'>
        <video src="/Videos/hero.mp4" autoPlay muted className=' w-full h-full object-cover z-[-1]' />

        <div className="absolute w-screen  bottom-24 left-2 px-10 p-2 flex items-center justify-between">
          <div>
            <h3 className="text-4xl font-bold">AirPods Max 2</h3>
            <h1 className="text-8xl font-bold">Listening.<br/> Remastered.</h1>
          </div>

          <div className="flex apple rounded-full items-center justify-center px-6 py-4 gap-3">
            <h3 className="text-white font-semibold text-2xl ">549 $</h3>
            <button className="bg-blue-500  rounded-full px-4 py-1 cursor-pointer ">Buy</button>
          </div>
        </div>
    </div>
  )
}

export default Hero