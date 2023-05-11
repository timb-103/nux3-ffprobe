export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)

  try {
    const dimensions = await getVideoDimensions(url)

    console.log(dimensions)
  } catch (error: any) {
    console.log("Error getting video dimensions:", error)
  }

  // return an error
  throw createError({
    statusCode: 400,
    statusMessage: "Error getting video dimensions.",
  })
})
