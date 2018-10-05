const router = require('express').Router()
const {Place, Location} = require('../db/models')
module.exports = router

// POST places
router.post('/', async (req, res, next) => {
  const {name, locationId} = req.body
  try {
    const place = await Place.create({name, locationId})
    res.json(place)
  } catch (err) {
    next(err)
  }
})

router.put('/:placeId', async (req, res, next) => {
  const {locationId, name} = req.body
  const {placeId} = req.params
  const payload = locationId ? {locationId, name} : {name}

  try {
    await Place.update(payload, {where: {id: placeId}})
    res.json(204).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:placeId', async (req, res, next) => {
  const {placeId} = req.params

  try {
    await Place.destroy({
      where: {id: placeId}
    })
    res.status(202).end()
  } catch (err) {
    next(err)
  }
})

// GET place and location for map
// router.get('/:placeId', async (req, res, next) => {
//   const {placeId} = req.params
//   try {
//     let pinCoordinates = await Place.findOne({
//       where: {id: placeId},
//       attributes: {exclude: ['createdAt', 'updatedAt']},
//       include: [
//         {
//           model: Location,
//           attributes: {exclude: ['id', 'createdAt', 'updatedAt']}
//         }
//       ]
//     })
//     res.status(200).json(pinCoordinates)
//   } catch (err) {
//     next(err)
//   }
// })
