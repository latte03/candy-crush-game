import { Application, Text } from 'pixi.js'

import { isDev } from './utils/is'

// 表示文字抗锯齿
Text.defaultResolution = 2
Text.defaultAutoResolution = false

export const app = new Application<HTMLCanvasElement>({
  backgroundColor: 0xffffff,
  backgroundAlpha: 0,
  resolution: 2
})

// 开发环境启用Pixi DevTool
isDev() && (window.__PIXI_APP__ = app)
