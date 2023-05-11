import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"
// @ts-ignore
import ffprobeInstaller from "@ffprobe-installer/ffprobe"
// @ts-ignore
import ffmpeg from "fluent-ffmpeg"

ffmpeg.setFfmpegPath(ffmpegInstaller.path)
ffmpeg.setFfprobePath(ffprobeInstaller.path)

export async function getVideoDimensions(url: string): Promise<{ width: number; height: number; duration: number }> {
  return new Promise(async (resolve) => {
    let dimensions = { height: 0, width: 0, duration: 0 }

    try {
      ffmpeg.ffprobe(url, (error: any, metadata: any) => {
        if (error) {
          console.error("Error getting video dimensions 1:", error)
        } else if (metadata && metadata.streams) {
          // metadata comes in array with video & audio, find the video
          const index = metadata.streams.findIndex((v: any) => v.codec_type === "video")
          const videoMetadata = metadata.streams[index]

          // set dimensions
          dimensions.height = videoMetadata.height
          dimensions.width = videoMetadata.width
          dimensions.duration = videoMetadata.duration
        }

        // return success
        resolve(dimensions)
      })
    } catch (error: any) {
      console.log("Error getting video dimensions 2:", error)
      resolve(dimensions)
    }
  })
}
