import EorzeaWeather from 'eorzea-weather';

export default
function (location, time){      
    switch(location){
      case "リムサ・ロミンサ":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_LIMSA_LOMINSA, time);
      case  "中央ラノシア":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_MIDDLE_LA_NOSCEA, time);
      case  "低地ラノシア":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_LOWER_LA_NOSCEA, time);
      case  "東ラノシア":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_EASTERN_LA_NOSCEA, time);
      case  "西ラノシア":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_WESTERN_LA_NOSCEA, time);
      case  "高地ラノシア":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_UPPER_LA_NOSCEA, time);
      case  "外地ラノシア":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_OUTER_LA_NOSCEA, time);
      case  "ミスト・ヴィレッジ":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_MIST, time);
      case  "グリダニア：新市街":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_GRIDANIA, time);
      case  "グリダニア：旧市街":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_GRIDANIA, time);
      case  "黒衣森：中央森林":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_CENTRAL_SHROUD, time);
      case  "黒衣森：東部森林":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_EAST_SHROUD, time);
      case  "黒衣森：南部森林":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_SOUTH_SHROUD, time);
      case  "黒衣森：北部森林":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_NORTH_SHROUD, time);
      case  "ラベンダーベッド":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_THE_LAVENDER_BEDS, time);
      case  "西ザナラーン":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_WESTERN_THANALAN, time);
      case  "中央ザナラーン":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_CENTRAL_THANALAN, time);
      case  "東ザナラーン":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_EASTERN_THANALAN, time);
      case  "南ザナラーン":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_SOUTHERN_THANALAN, time);
      case  "北ザナラーン":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_NORTHERN_THANALAN, time);
      case  "ゴブレットビュート":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_THE_GOBLET, time);
      case  "クルザス中央高地":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_COERTHAS_CENTRAL_HIGHLANDS, time);
      case  "モードゥナ":
        return EorzeaWeather.getWeather(EorzeaWeather.ZONE_MOR_DHONA, time);
      default :
        return 'default';

    }
  }
  