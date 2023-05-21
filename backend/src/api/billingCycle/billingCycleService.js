const BillingCycle = require('./billingCycle');
const errorHandler = require('../common/errorHandler');

BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({ new: true, runValidators: true });
BillingCycle.after('post', errorHandler).after('put', errorHandler).after('delete', errorHandler);

BillingCycle.route('post', (req, res, next) => {
  const newBillingCycle = new BillingCycle(req.body);
  newBillingCycle
    .save()
    .then((savedBillingCycle) => {
      res.status(201).json(savedBillingCycle);
    })
    .catch((error) => {
      const errors = parseErrors(error);
      res.status(500).json({ errors: errors });
    });
});

BillingCycle.route('put', (req, res, next) => {
  const billingCycleId = req.params.id;
  const updatedBillingCycle = req.body;
  BillingCycle.findByIdAndUpdate(billingCycleId, updatedBillingCycle)
    .then((updatedDocument) => {
      res.json(updatedDocument);
    })
    .catch((error) => {
      const errors = parseErrors(error);
      res.status(500).json({ errors: errors });
    });
});

BillingCycle.route('delete', (req, res, next) => {
  const billingCycleId = req.params.id;
  BillingCycle.findByIdAndRemove(billingCycleId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      const errors = parseErrors(error);
      res.status(500).json({ errors: errors });
    });
});

BillingCycle.route('get', (req, res, next) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const year = req.query.year;

  const query = year ? { year: year } : {};

  BillingCycle.find(query)
    .sort({ year: -1, month: -1 })
    .skip(skip)
    .limit(limit)
    .exec()
    .then((billingCycles) => {
      res.json(billingCycles);
    })
    .catch((error) => {
      const errors = parseErrors(error);
      res.status(500).json({ errors: errors });
    });
});

BillingCycle.route('count', (req, res, next) => {
  BillingCycle.countDocuments()
    .exec()
    .then((count) => {
      res.json({ value: count });
    })
    .catch((error) => {
      const errors = parseErrors(error);
      res.status(500).json({ errors: errors });
    });
});

BillingCycle.route('summary', (req, res, next) => {
  BillingCycle.aggregate([
    {
      $project: { credit: { $sum: '$credits.value' }, debt: { $sum: '$debts.value' } },
    },
    {
      $group: { _id: null, credit: { $sum: '$credit' }, debt: { $sum: '$debt' } },
    },
    {
      $project: { _id: 0, credit: 1, debt: 1 },
    },
  ])
    .exec()
    .then((result) => {
      res.json(result[0] || { credit: 0, debt: 0 });
    })
    .catch((error) => {
      const errors = parseErrors(error);
      res.status(500).json({ errors: errors });
    });
});

const parseErrors = (error) => {
  const errors = [];
  if (error.errors) {
    for (let field in error.errors) {
      if (error.errors.hasOwnProperty(field)) {
        errors.push(error.errors[field].message);
      }
    }
  } else {
    errors.push(error.message);
  }
  return errors;
};

module.exports = BillingCycle;
