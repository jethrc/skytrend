const wallpaperSrc = (data) =>{
    const wallpaperImages = {
      '01d': 'src/images/Cloud.png',
      '01n': 'src/images/Cloud.png',
      '02d': 'src/images/Cloud.png',
      '02n': 'src/images/Cloud.png',
      '03d': 'src/images/Cloud.png',
      '03n': 'src/images/Cloud.png',
      '04d': 'src/images/Cloud.png',
      '04n': 'src/images/Cloud.png',
      '09d': 'src/images/Cloud.png',
      '09n': 'src/images/Cloud.png',
      '10d': 'src/images/Rain.jpg',
      '10n': 'src/images/Rain.jpg',
      '11d': 'src/images/thunder.png',
      '11n': 'src/images/thunder.png',
      '13d': 'src/images/snow.jpg',
      '13n': 'src/images/snow.jpg',
      '50d': 'src/images/fog.jpeg',
      '50n': 'src/images/fog.jpeg',
    };
    return wallpaperImages[data]
  }

export default wallpaperSrc