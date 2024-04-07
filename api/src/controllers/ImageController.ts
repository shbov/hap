export const getImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const image = await imageDal.getById(Number(id))
    if (!image) {
      return res.status(404).send({ message: 'Image not found' })
    }

    return res.status(200).send(image)
  } catch (e) {
    console.error(`[ImageController::getImage] ${e}`)
    return errorHelper(e, 'ImageController::getImage', 500, res)
  }
}
