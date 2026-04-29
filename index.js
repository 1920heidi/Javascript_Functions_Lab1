function createLoginTracker(userInfo) {
  // Track number of attempts (closure variable)
  let attemptCount = 0;

  // Return inner arrow function
  return (passwordAttempt) => {
    // If already locked (3 failed attempts have been made)
    if (attemptCount >= 3) {
      console.log("Account is locked");
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
      // If this was the 3rd failed attempt, the account will be locked for future attempts
      if (attemptCount >= 3) {
        console.log("Account locked after 3 failed attempts");
      }
      return `Attempt ${attemptCount}: Login failed`;
    }
  };
}

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};

// Example usage - this will run when you execute "node index.js"
if (require.main === module) {
  
  // Create a mock user
  const user = {
    username: "heidi",
    password: "heidi123"
  };
  
  // Create login tracker for this user
  const loginAttempt = createLoginTracker(user);
  
  console.log("\n ##### Testing with wrong passwords ");
  console.log("Ian TM", loginAttempt("5431"));
  console.log("Heidi:", loginAttempt("heidi123")); 
  console.log("Nancy TM:", loginAttempt("heidi123"));
  console.log("HEIDI:", loginAttempt("HEIDI123")); // locks the account
  
  console.log("\n ##### Creating new tracker and correct password ");
  const newLoginAttempt = createLoginTracker(user);
  console.log("Result:", newLoginAttempt("heidi123"));
}