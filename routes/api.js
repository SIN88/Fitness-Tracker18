const router = require('express').Router();
const Workout = require('../models/workout.js');

//getting the workouts
router.get('/workouts', async (req, res) => {
    try {
        const allWorkouts = await db.Workout.find({});
        console.log(allWorkouts)
        res.json(allWorkouts);
        
    } catch (error) {
        res.json(error)
    }
});
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