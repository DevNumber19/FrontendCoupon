export const colorPalette: any = {
  white: '#ffffff',
  purple: '#3f3cbb',
  metal: '#565584',
  tahiti: '#3ab7bf',
  silver: '#ecebff',
  'bubble-gum': '#ff77e9',
  bermuda: '#78dcca',
}

export const randomProperty = function (obj: { [x: string]: any }) {
  return Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)]
}
