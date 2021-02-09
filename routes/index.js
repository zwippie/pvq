var express = require('express');
var router = express.Router();

var values = {
  "Achievement": ["Recognition", "Success", "Ambition", "Competition"],
  "Benevolence": ["Caring", "Loyalty", "Compassion", "Forgiveness"],
  "Conformity": ["Ethics", "Propriety", "Respect", "Politeness"],
  "Hedonism": ["Fun", "Pleasure", "Joy"],
  "Power": ["Wealth", "Influence", "Leadership"],
  "Security": ["Safety", "Patriotism", "Organization", "Health", "Order"],
  "Self-Direction": ["Creativity", "Freedom", "Curiosity", "Independence"],
  "Stimulation": ["Novelty", "Adventure", "Excitement"],
  "Tradition": ["Modesty", "Religion", "Custom", "Humility"],
  "Universalism": ["Equality", "Tolerance", "Environment", "Harmony", "Justice", "Nature"]
}

/* GET questionnaire page. */
router.get("/", function(req, res, next) {
  var questions = Object.values(values).flat();
  res.render("index", { title: "PVQ", questions: questions });
});

/* POST outcome page. */
router.post("/outcome", function(req, res, next) {
  var outcome = {};

  for (var value in values) {
    outcome[value] = 0;
    for (var question in values[value]) {
      var answered = parseInt(req.body[`answer[${values[value][question]}]`]);
      if (Number.isInteger(answered)) {
        outcome[value] += (answered - 1); // Correct 0-9 to -1-8
      }
    }
  }
  res.render("outcome", { title: "PVQ", outcome: outcome });
});

module.exports = router;
