import { compressJpg, compressPng } from '@assetpack/plugin-compress'
import { audio, ffmpeg } from '@assetpack/plugin-ffmpeg'
import { json } from '@assetpack/plugin-json'
import { pixiManifest } from '@assetpack/plugin-manifest'
import { pixiTexturePacker } from '@assetpack/plugin-texture-packer'
import { webfont } from '@assetpack/plugin-webfont'

export default {
  entry: './raw-assets', // 原始资源存放位置
  output: './public/assets/', // 打包后存放位置
  cache: false, // 不使用缓存
  plugins: {
    webfont: webfont(), // 字体转woff格式
    compressJpg: compressJpg({
      // 压缩jpeg
      compression: {
        quality: 90
      }
    }),
    compressPng: compressPng(), // 压缩png
    // audio: audio(), // 快捷配置将wav转mp3，但会同时生成ogg格式
    // 因此这里使用ffmpeg进行更详细的配置
    ffmpeg: ffmpeg({
      inputs: ['.wav'],
      outputs: [
        {
          formats: ['.mp3'],
          recompress: true, // 是否重新压缩。比如mp3转mp3也压缩
          // options必须提供，可以为空对象
          options: {
            audioBitrate: 96,
            audioChannels: 1,
            audioFrequency: 48000
          }
        }
      ]
    }),
    json: json(), // 压缩json
    texture: pixiTexturePacker({
      texturePacker: {
        removeFileExtension: true // 移除扩展名
      }
    }),
    // 名称末尾带{m}标识的文件夹或文件都会添加到manifest清单
    manifest: pixiManifest({
      output: './public/assets/assets-manifest.json'
    })
  }
}
