export default function(weather) {
    switch(weather) {
        case 'Fair Skies': 
            return '晴れ'
        case 'Clear Skies': 
            return '快晴'
        case 'Fog': 
            return '霧'
        case 'Blizzards': 
            return '吹雪'
        case 'Clouds': 
            return '曇り'
        case 'Dust Storms': 
            return '砂塵'
        case 'Gales': 
            return '暴風'
        case 'Gloom': 
            return '妖霧'
        case 'Rain': 
            return '雨'
        case 'Showers': 
            return '暴雨'
        case 'Heat Waves': 
            return '灼熱波'
        case 'Snow': 
            return '雪'
        case 'Thunder': 
            return '雷'
        case 'Thunderstorms': 
            return '雷雨'
        case 'UmbralStatic': 
            return '放電'
        case 'UmbralWind': 
            return '霊風'
        case 'Wind': 
            return '風'
        default:
            return weather
    } 
}