module.exports.run = function(lurch, callback) {
  // Create the initial status response.
  var status = {success: false, message: 'An unkown error occured.'};

  // Start of by getting the current status.
  lurch.execute('defaults read com.apple.finder AppleShowAllFiles', function(error, stdout, stderr) {
    var isVisible = stdout.trim();

    if (isVisible == 'TRUE') {
      // Hidden files are currently visible, hide them.
      lurch.execute('defaults write com.apple.finder AppleShowAllFiles FALSE', function() {
        // Restart Finder.
        lurch.execute('killall Finder');

        // Change the return status, and execute the callback.
        status.success = true;
        status.message = 'Hidden files are now invisible.';
        callback(status);
      });
    }
    else {
      // Hidden files are currently invisible, show them.
      lurch.execute('defaults write com.apple.finder AppleShowAllFiles TRUE', function() {
        // Restart Finder.
        lurch.execute('killall Finder');

        // Change the return status, and execute the callback.
        status.success = true;
        status.message = 'Hidden files are now visible.';
        callback(status);
      });
    }
  });
};
