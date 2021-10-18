const router = require('express').Router();
const rtg = require('random-token-generator');

router.put('/', (req, res) => {
  // The below options are also the defaults
rtg.generateKey({
  len: 16, // Generate 16 characters or bytes of data
  string: true, // Output keys as a hex string
  strong: false, // Use the crypographically secure randomBytes function
  retry: false, // Retry once on error
}, (_err, key) => res.status(200).json(key));
});

module.exports = router;