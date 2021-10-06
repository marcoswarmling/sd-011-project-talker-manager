const passawordValidate = (passaword) => {
  const passCheck = 6;

  if (passaword < passCheck) return false;

  return true;
};

module.exports = passawordValidate;
