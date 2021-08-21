const router = require('express').Router();
const Workout = require('../models/workout.js');


router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  })
  
router.post('/api/workouts', (req, res) => {
    Workout.create({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      // "runValidators" will ensure new exercises meet our schema requirements
      { new: true, runValidators: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  router.put('/workouts/:id', async ( req, res) => {
    try {
        await db.Workout.findByIdAndUpdate(req.params.id, {
            $push: {
                exercises: req.body
            }
        })
        res.json("ok")
    } catch (error) {
        res.json(error);
    }
})


module.exports = router;