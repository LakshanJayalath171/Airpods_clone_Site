const Footer = () => {
  return (
    <div className="apple w-full h-full flex items-start justify-between px-10 p-2">
        <div className="">
            <img src="/icons/logo.svg" alt="logo" className="w-16 h-16" />
            <h1 className="text-3xl">Airpods Max</h1>
            <p className="text-gray-500 font-light">Copyright © 2026 Apple Inc. All rights reserved.</p>
        </div>
        <div>
            <h1 className="text-2xl font-semibold my-3">Explore airpods</h1>
            <div className="px-2">
              <p className="text-gray-500 font-light">Explore All AirPods</p>
              <p>AirPods 4</p>
              <p>AirPods Pro 3</p>
              <p>AirPods Max 2</p>
            </div>
        </div>
        <div>
            <h1 className="text-2xl font-semibold my-3">More from AirPods</h1>
            <div className="px-2">
                <p className="text-gray-500 font-light">AirPods Support</p>
                <p className="text-gray-500 font-light">AppleCare</p>
                <p className="text-gray-500 font-light">Hearing Health</p>
                <p className="text-gray-500 font-light">Apple Music</p>
                <p className="text-gray-500 font-light">Apple Fitness+</p>
            </div>
        </div>
    </div>
  )
}

export default Footer