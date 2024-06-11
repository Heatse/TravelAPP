const COLORS = {
    primary: "#00CEC9",
    secondary: "#FFF",
    black: "#000",
    black2: 'rgba(0,0,0,0.8)',
    gray: '#DFE6E9',
    white: "#fff",
    error: '#EA4335',
    default: 'rgb(242,242,242)',
    gray2: '#CACACA',
    gray3: '#34495E',
    lightGray: '#DFE6E9',
    gold: 'gold',
  };
  
  const FONT = {
    thin: "Montserrat_Thin", //100
    extralight: "Montserrat_ExtraLight", //200
    light: "Montserrat_Light", // 300
    regular: "Montserrat_Regular", // 400
    medium: "Montserrat_Mediu", // 500
    semibold: "Montserrat_SemiBold", // 600
    bold: "Montserrat_Bold", // 700
    extrabold: "Montserrat_ExtraBold", // 800
    black: "Montserrat_Black", // 900

    thinI: "Montserrat_ThinItalic", //100
    extralightI: "Montserrat_ExtraLightItalic", //200
    lightI: "Montserrat_LightItalic", // 300
    regularI: "Montserrat_RegularItalic", // 400
    mediumI: "Montserrat_MediuItalic", // 500
    semiboldI: "Montserrat_SemiBoldItalic", // 600
    boldI: "Montserrat_BoldItalic", // 700
    extraboldI: "Montserrat_ExtraBoldItalic", // 800
    blackI: "Montserrat_BlackItalic", // 900
  };
  
  const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
  };
  
  const SHADOWS = {
    android: {
      elevation: 4,
    },
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    all: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    }
  };
  
  export { COLORS, FONT, SIZES, SHADOWS };
  