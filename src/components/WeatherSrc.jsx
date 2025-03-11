const weatherSrc = (data) =>{
    const weatherImages = {
      '01d': 'src/images/14.png',
      '01n': 'src/images/6.png',
      '02d': 'src/images/21.png',
      '02n': 'src/images/21.png',
      '03d': 'src/images/21.png',
      '03n': 'src/images/28.png',
      '04d': 'src/images/8.png',
      '04n': 'src/images/21.png',
      '09d': 'src/images/29.png',
      '09n': 'src/images/29.png',
      '10d': 'src/images/30.png',
      '10n': 'src/images/30.png',
      '11d': 'src/images/13.png',
      '11n': 'src/images/13.png',
      '13d': 'src/images/27.png',
      '13n': 'src/images/27.png',
      '50d': 'src/images/11.png',
      '50n': 'src/images/11.png',
    };
    return weatherImages[data]
  }

export default weatherSrc