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
router.get("/available/options/:Company/:offset", (req, res) => {
    model.readAvailable(req.params.Company)
        .then((response) => {
            let meetingOptions = []
            let usedTimesCache = {}
            response.forEach((meeting) => {
                if(meeting.StartTime in usedTimesCache) {
                } else {
                    usedTimesCache[meeting.StartTime] = 1
                    let startTimeAdj = timeAdjuster(meeting.StartTime, req.params.offset, true)
                    let endTimeAdj = timeAdjuster(meeting.EndTime, req.params.offset, false)
                    let timesCombo = startTimeAdj + "-" + endTimeAdj
                    meetingOptions.push({
                        label: timesCombo,
                        value: timesCombo,
                        id: meeting.id
                    })
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
    model.readByID(req.body.id)
    .then((response0)=> {
      if(response0[0].LeadEmail == "") {
        model.update(req.body)
        .then((response1) => {
            res.json(response1);
        })
        .catch((err) => res.send(err));
      } else {
          res.json("Meeting booked - please choose another.")
      }
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

function timeAdjuster(time, offset, isStartTime) {
    let startTimeAdj = new Date(parseInt(time))
    if (Number.isInteger(offset/60)) {
        startTimeAdj.setHours(startTimeAdj.getHours() + (offset/60))
    } else {
        let osString = (offset/60).toString()
        let osArray = osString.split(".")
        let osHours = parseInt(osArray[0])
        let osMinutes = parseFloat(`.${osArray[1]}`) * 60
        startTimeAdj.setHours(startTimeAdj.getHours() + osHours)
        startTimeAdj.setMinutes(startTimeAdj.getMinutes() + osMinutes)
    }
    if (isStartTime) {
        return moment(startTimeAdj).format("MMM Do, h:mm")
    } else {
        return moment(startTimeAdj).format("h:mm a")
    }
}