import ReactWeather, { useOpenWeather } from 'react-open-weather'
import style from "./style.module.css"

const  customStyles  =  { 
	FontFamily :   'Helvetica' , 
	gradientStart :   '#0181C2' , 
	gradientMid :   '#04A7F9' , 
	gradientEnd :   '#4BC4F7' , 
	locationFontColor :   '#FFF' , 
	todayTempFontColor :   '#FFF' , 
  borderRadius: '0px',
	// todayDateFontColor :   '# B5DEF4' , 
	// todayRangeFontColor :   '# B5DEF4' , 
	// todayDescFontColor :   '# B5DEF4' , 
	// todayInfoFontColor :  '# B5DEF4' , 
	// todayIconColor :   '#FFF' , 
	// forecastBackgroundColor :   '#FFF' , 
	forecastSeparatorColor :   '#DDD' , 
	// forecastDateColor :   '# 777' , 
	// forecastDescColor :   '# 777' , 
	// forecastRangeColor :   '# 777' , 
	// forecastIconColor :   ' # 4BC4F7 ' , 
} ;

export default function Weather({lat, lng, title}) {

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '6fa81219c50bf4b0696f1255f2872a84',
    lat: lat,
    lon: lng,
    lang: 'ru',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  return (
    <> 
    <ReactWeather
    // theme ={ customStyles }
      // theme={{borderRadius: '0px'}}
      theme={customStyles}
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel={title}
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
    </>
    
  )
}
