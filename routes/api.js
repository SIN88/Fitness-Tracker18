const router = require('express').Router();
const Workout = require('../models/workout.js');

// getting all the workouts
router.get("/api/workouts", (req, res) => {
    Workout.find({})
      .then(Workout => {
        res.json(Workout);
      })
      .catch(err => {
        res.json(err);
      });
  })
  
router.post('/api/workouts', (req, res) => {
    Workout.create({})
      .then((Workout) => {
        res.json(Workout);
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
      .then((Workout) => {
        res.json(Workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  router.put('/workouts/:id', async ( req, res) => {
    try {
        await Workout.findByIdAndUpdate(req.params.id, {
            $push: {
                exercises: req.body
            }
        })
        res.json("ok")
    } catch (error) {
        res.json(error);
    }
})

// get all workouts in range
router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
      .sort({ _id: -1 })
      .limit(7)
      .then(Workout => {
        res.json(Workout);
      })
      .catch(err => {
        res.json(err);
      });
  })


module.exports = router;