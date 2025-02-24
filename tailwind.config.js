/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*", "./src/**/*.{html, js, ts, vue}"],
  theme: {
    extend: {
      dropShadow: {
        custom: "0 10px 10px rgba(51, 51, 51, 0.05)",
      },
      fontSize: {
        h1: [
          "var(--h1-size)",
          {
            lineHeight: "var(--h1-lineHeight)",
            fontWeight: "var(--h1-weight)",
          },
        ],
        h2: [
          "var(--h2-size)",
          {
            lineHeight: "var(--h2-lineHeight)",
            fontWeight: "var(--h2-weight)",
          },
        ],
        h3: [
          "var(--h3-size)",
          {
            lineHeight: "var(--h3-lineHeight)",
            fontWeight: "var(--h3-weight)",
          },
        ],
        h4: [
          "var(--h4-size)",
          {
            lineHeight: "var(--h4-lineHeight)",
            fontWeight: "var(--h4-weight)",
          },
        ],
        h5: [
          "var(--h5-size)",
          {
            lineHeight: "var(--h5-lineHeight)",
            fontWeight: "var(--h5-weight)",
          },
        ],
        body1: [
          "var(--body1-size)",
          {
            lineHeight: "var(--body1-lineHeight)",
            fontWeight: "var(--body1-weight)",
          },
        ],
        body2: [
          "var(--body2-size)",
          {
            lineHeight: "var(--body2-lineHeight)",
            fontWeight: "var(--body2-weight)",
          },
        ],
        body3: [
          "var(--body3-size)",
          {
            lineHeight: "var(--body3-lineHeight)",
            fontWeight: "var(--body3-weight)",
          },
        ],
      },
      fontFamily: {
        NotoSans: ["Noto Sans TC"],
      },
      colors: {
        Primary: "#205ED5",
        Hover: "#3371E6",
        Clicked: "#1752C4",
        PrimaryBG: "#F1F6FF",
        Secondary: "#FFDA54",
        TextLevelOne: "#333333",
        TextLevelTwo: "#636363",
        Input: "#ACACAC",
        DisableText: "#CECECE",
        Red: "#DD0E1C",
        RedBG: "#FFF2F3",
        Green: "#1C825E",
        GreenBG: "#EEFFEB",
        Orange: "#FFA110",
        OrangeBG: "#FFF5E9",
        Surface: "#FFFFFF",
        BG: "#F2F2F2",
        Field: "#F8F8F8",
        border: "#E7E7E7",
        DisableBG: "#EAEAEA",
        Backdrop: "rgba(51, 51, 51, 0.8)",
        Bgshadow: "rgba(51, 51, 51, 0.05)",
        BGlayout: "var(--BGlayout)",
        BGSurface: "var(--BGSurface)",
        WordLevel1: "var(--WordLevel1)",
        WordLevel2: "var(--WordLevel2)",
        ThemePrimary: "var(--ThemePrimary)",
        BGDisable: "var(--BGDisable)",
        WordDisable: "var(--WordDisable)",
        ThemePrimaryBG: "var(--ThemePrimaryBG)",
        ThemePrimaryLight: "var(--ThemePrimaryLight)",
        StatusRed: "#F23C47",
        StatusGreen: '#3ABC5D',
        BGBorder: "var(--BGBorder)",
        SwitchPrimary: "var(--SwitchPrimary)",
        WordWhite: "var(--WordWhite)",
        BGFile: "var(--BGFile)",
        StatusBGRed: "var(--StatusBGRed)",
        StatusRedLight: "var(--StatusRedLight)",
        ButtonBG: "var(--ButtonBG)",
        BGDrawer: "var(--BGDrawer)",
        BGBtnBar: "var(--BGBtnBar)",
        BGtitle: "var(--BGtitle)",
        BGCancel: "var(--BGCancel)",
        BGBg: "var(--BGBg)"
      },
      screens: {
        miniMobile: { max: "320px" },
        mobile: { max: "600px" },
        miniPad: { max: "768px" },
        laptop: { min: "601px", max: "999px" },
        desktop: { min: "1000px" },
      },
      padding: {
        iconBtn: "8px 12px 8px 8px",
      },
      backgroundImage: {
        pageBgImg: "url('@/assets/img/openDataAnnouncement/BG.png')",
        pageFullBgImg: "url('@/assets/img/openDataAnnouncement/FullBG.svg')",
        pageLongBgImg: "url('@/assets/img/openDataAnnouncement/LongBG.png')",
      },
      boxShadow: {
        custom: "0px 10px 10px 0px rgba(51, 51, 51, 0.05)",
        webview: " 0px 4px 10px 0px rgba(51, 51, 51, 0.1)",
      },
    },
  },
  plugins: []
}

