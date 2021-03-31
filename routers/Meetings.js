const router = require("express").Router();
const moment = require("moment");

const model = require("../models/Meetings");

router.post("/", (req, res) => {
    model.create(req.body)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => res.send(err))
})

// make sure timezones save in base time
// likely need time formatting lib here
router.get("/available/options/:Company/:offset", (req, res) => {
    model.readAvailable(req.params.Company)
        .then((response) => {
            let meetingOptions = []
            let usedTimesCache = {}
            response.forEach((meeting) => {
                // only do process if not in usedTimesCache
                if(meeting.StartTime in usedTimesCache) {
                } else {
                    usedTimesCache[meeting.StartTime] = 1
                    // alter times using offset
                    console.log(Date(meeting.StartTime))
                    console.log(meeting.StartTime.getHours())
                    console.log(meeting.StartTime.setHours(meeting.StartTime.getHours() + 4))
                    let startTime0 = parseInt(meeting.StartTime) 
                        + parseInt(req.params.offset)
                    let endTime0 = parseInt(meeting.EndTime) 
                        + parseInt(req.params.offset)
                    // take altered times and format using momentjs
                    let timesCombo = moment(startTime0.toString()).format('MMMM Do, h:mm')
                        + " - " + moment(endTime0.toString()).format('h:mm')
                    console.log(timesCombo)
                    // push
                    meetingOptions.push(timesCombo)
                }
            })
            res.json(meetingOptions)
        })
        .catch((err) => res.send(err));
});

router.get("/booked/:Company", (req, res) => {
    model.readBooked(req.params.Company)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => res.send(err));
});

router.patch("/", (req, res) => {
    model.update(req.body)
      .then((response) => {
          res.json(response);
      })
      .catch((err) => res.send(err));
  });

router.delete("/", (req, res) => {
    model.del(req.body)
        .then((response) => {
            res.json(response)
        })
        .catch((err) => res.send(err))
})

module.exports = router;
