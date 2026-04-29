function createLoginTracker(userInfo) {
  // Track number of attempts (closure variable)
  let attemptCount = 0;

  // Return inner arrow function
  return (passwordAttempt) => {
    // If already locked (3 failed attempts have been made)
    if (attemptCount >= 3) {
      console.log("Account is locked - no more attempts allowed");
      return "Account locked due to too many failed login attempts";
    }

    // Increment attempts
    attemptCount++;

    // Check password
    if (passwordAttempt === userInfo.password) {
      console.log("Login successful!");
      return "Login successful";
    } else {
      console.log("Login failed - wrong password");
      // If this exceeds 3 failed attempts, lock account
      if (attemptCount > 3) {
        console.log("Account locked after 3 failed attempts");
        return "Account locked due to too many failed login attempts";
      }
      return `Attempt ${attemptCount}: Login failed`;
    }
  };
}

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};