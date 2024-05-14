import { Dimensions, NativeModules, PixelRatio, Platform } from "react-native"
import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper"

/**
 * The design's screen height (by point)
 * This app using the iPhoneX resolution according to the design
 *
 * @see https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
 */
const DESIGN_SCREEN_HEIGHT = 812
const DESIGN_SCREEN_WIDTH = 375
/**
 * Get current window dimensions
 *
 * @returns The dimensions
 */
export const getDimensions = () => Dimensions.get("screen")
export const { width, height } = Dimensions.get("screen")
export const windowWidth = Dimensions.get("window").width
export const windowHeight = Dimensions.get("window").height
/**
 * Converts provided width percentage to independent pixel (dp).
 *
 * @param percent The percentage of screen's width (from 0.0 to 1.0)
 *
 * @returns The calculated dp depending on current device's screen width.
 */
export const getScreenWidth = (fraction = 1) =>
  Math.ceil(Math.min(getDimensions().width, getDimensions().height) * fraction)

/**
 * Converts provided height percentage to independent pixel (dp).
 *
 * @param percent The percentage of screen's width (from 0.0 to 1.0)
 *
 * @returns The calculated dp depending on current device's screen height.
 */
export const getScreenHeight = (fraction = 1) =>
  Math.ceil(Math.max(getDimensions().width, getDimensions().height) * fraction)

// Calculate the screen ratio with the [DESIGN_SCREEN_HEIGHT]
const SCREEN_RATIO_H = getScreenHeight() / DESIGN_SCREEN_HEIGHT

// Calculate the screen ratio with the [DESIGN_SCREEN_HEIGHT]
const SCREEN_RATIO_W = getScreenWidth() / DESIGN_SCREEN_WIDTH

/**
 * Calculate the responsive size base on the design
 *
 * @param size The size to convert
 *
 * @returns The responsive size base on the design
 */
export const responsiveH = (size: number) => Math.ceil(Platform.isPad ? size * 1.5 : size * SCREEN_RATIO_H)

/**
 * Calculate the responsive size base on the design
 *
 * @param size The size to convert
 *
 * @returns The responsive size base on the design
 */
export const responsiveW = (size: number) => Math.ceil(Platform.isPad ? size * 1.5 : size * SCREEN_RATIO_W)

/**
 * Calculate the fontSizer on the design
 *
 * @param size The size to convert
 *
 * @returns The fontSizer size base on the design
 */
export const fontSizer = (size: number) => {
  const newSize = Platform.isPad ? size * 1.5 : size * SCREEN_RATIO_W
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export const isAndroid = Platform.OS === "android"

export const isIPhoneX = isIphoneX()

export const statusBarHeight = isIphoneX() ? getStatusBarHeight() : NativeModules.StatusBarManager.HEIGHT

export const navigatorHeight = height - windowHeight
