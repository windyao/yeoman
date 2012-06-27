
module.exports = function(grunt) {

    // Create a new task for all nest functionality
    grunt.registerTask('nest', 'This triggers the `nest` commands.', function() {

        // Tell grunt this task is asynchronous.
        var done = this.async(),
            exec = require('child_process').exec,
            command = "nest ",
            that = this;

        command += that.args.join(' ');

        // wrap in cd to put these in the right folder
        command = 'cd js && ' + command + ' && cd ..';

        function puts(error, stdout, stderr) {

            // grunt.log.write('\n\nnest output:\n');
            grunt.log.write(stdout);

            if (error !== null) {
                grunt.log.error(error);
                done(false);
            } else {
                // FIXME: no part of the next three lines is okay.
                if (that.args[0] == 'install' && !~stdout.indexOf('└')){
                  grunt.log.writeln('\nInstalled into js/browser_modules: ');
                  return exec('cd js && nest ls && cd ..', puts);
                }
                done(true);
            }
        }

        exec(command, puts);
        // grunt.log.write('nest package manager, running `' + this.args.join(' ') + '` now...');
    });
};
