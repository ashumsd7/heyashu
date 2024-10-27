---
title: "e32: How commands gets executed"
name: "How commands gets executed ? "
episode: 32
publishedOn: 10-28-2024
updatedOn: 10-28-2024
thumbnail: /public/images/blogs/ddddd.jpg
author: Ashutosh Anand Tiwari
tags: commands
profilePic: /public/images/blogs/pfp2.png
---
If you write anything and press enter in the terminal, it will say **"command not found."**

```jsx
🕑 23:55  heyashu ~/Desktop/ME/node-js-by-procodrr (master)
🚀 hello
bash: hello: command not found
🕑 00:27  heyashu ~/Desktop/ME/node-js-by-procodrr (master)
```

There are some types of commands:

1. **Alias**: Bash first checks if the command matches any defined aliases.
2. **Functions**: Next, it checks if the command matches any defined shell functions.
3. **Built-in commands**: Like `cd`, `echo`, `pwd`, etc.
4. **Hash Table**:
5. **Executable**: Finally, it searches through the directories listed in the `PATH` environment variable, in the order they appear, to find an executable file matching the command name.

So, the question is: How do you know which type of command is being used when you type it?

For example, if you type `pwd`, how do you know what type of command it is?

You can use the `which` command before the actual command to determine its type.

```jsx
🕑 00:27  heyashu ~/Desktop/ME/node-js-by-procodrr (master)
🚀 which pwd
/usr/bin/pwd

🚀 cd /
🕑 00:29  heyashu /
🚀 explorer 
```

If you run `cd /` in Windows, it will take you to the path where Git is installed. When you run `explorer .`, it will open that directory, and you can see the `pwd.exe` file, which is an executable binary file.

### `type` Command

If `which` gives you any unusual result, try using the `type` command.

```jsx
🚀 type cd
cd is a shell builtin
🚀 type pwd
pwd is a shell builtin
```

### How to Create Function Commands

Let's open the `.bashrc` file and see how we can write functions.

To open `.bashrc`, just run:

```jsx
🚀 code ~/.bashrc
🕑 00:36  heyashu /
```

Nowi bahsdrc wirte tghuis

```jsx
cd(){
  echo "my function is running"
}
```

Now, `cd` is already a built-in command. So, how do you know which one will run? Yes, this will override the main `cd` command.

If you define a function named `cd` and type `cd`, it will execute your function and print an echo. Using this overridden `cd`, you will not be able to change directories.

```jsx
🚀 cd
my function is running
```

```jsx
🚀 type cd
cd is a function
```

### How poriority gets decides ?

It checks in the following order: **Aliases**, then **Functions**, and then continues to other types.

Now, guess what the type of `node` would be? `node` is also a command, right?

```jsx
🚀 type node
node is aliased to `winpty 
node.exe'
```

`winpty node.exe` is aliased somewhere. Remember, we saw this `winpty` in the Performer app?

[Check this article](https://heyashu.in/digital-garden/notes/backend-with-nodejs-by-procoderr-notes/e21-what-is-process-in-operation-system).

You can learn that `winpty` simulates a Unix-like environment in Windows.

After checking functions, it looks for built-in commands, then the hash table, and finally executable files.

Also, remember that the `which` command only gives you the path.

So, you have a global `PATH` variable in your system. Try to get this by using:

```jsx
heyashu ~/Desktop/ME/node-js-by-procodrr 
(master)
🚀 echo $PATH
/c/Users/Ashutosh Tiwari/bin:/mingw64/bin:/usr/local/bin:/usr/bin:/bin:/mingw64/bin:/usr/bin:/c/Users/Ashutosh Tiwari/bin:/c/Python312/Scripts:/c/Python312:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0:/c/Windows/System32/OpenSSH:/c/Program Files (x86)/MAVProxy:/c/Program Files (x86)/MAVProxy:/c/ProgramData/chocolatey/bin:/cmd:/c/Program Files/dotnet:/c/Program Files/nodejs:/c/Python312/Scripts:/c/Python312:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0:/c/Windows/System32/OpenSSH:/c/Program Files/Docker/Docker/resources/bin:/c/Program Files (x86)/MAVProxy:/c/Program Files (x86)/MAVProxy:/c/ProgramData/chocolatey/bin:/c/Program Files/nodejs:/cmd:/c/Program Files/dotnet:/c/Python312/Scripts:/c/Python312:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0:/c/Windows/System32/OpenSSH:/c/Program Files/Docker/Docker/resources/bin:/c/Program Files (x86)/MAVProxy:/c/Program Files (x86)/MAVProxy:/c/ProgramData/chocolatey/bin:/c/Program Files/nodejs:/cmd:/c/Program Files/dotnet:/c/Users/Ashutosh Tiwari/AppData/Local/Microsoft/WindowsApps:/c/Users/Ashutosh Tiwari/AppData/Local/Programs/Microsoft VS Code/bin:/c/Program Files/nodejs/npm:/c/Program Files/nodejs/npm:/c/Users/Ashutosh Tiwari/AppData/Local/Microsoft/WinGet/Packages/Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe:/c/Users/Ashutosh Tiwari/AppData/Roaming/npm:/c/Users/Ashutosh Tiwari/AppData/Local/Programs/mongosh:/usr/bin/vendor_perl:/usr/bin/core_perl    
```

You're getting a long string, and to better understand it, let's transform it.

Hehe, you're about to learn a new command now! It basically transforms the output.

```jsx
🚀 echo $PATH | tr ":" " " /"
> 
> ^C
🕑 00:53  heyashu ~/Desktop/ME/node-js-by-procodrr 
(master)
🚀 echo $PATH | tr ":" "\n"                        
/c/Users/Ashutosh Tiwari/bin
/mingw64/bin
/usr/local/bin
/usr/bin
/bin
/mingw64/bin
/usr/bin
/c/Users/Ashutosh Tiwari/bin
/c/Python312/Scripts
/c/Python312
/c/Windows/system32
/c/Windows
/c/Windows/System32/Wbem
/c/Windows/System32/WindowsPowerShell/v1.0
/c/Windows/System32/OpenSSH
/c/Program Files (x86)/MAVProxy
/c/Program Files (x86)/MAVProxy
/c/ProgramData/chocolatey/bin
/cmd
/c/Program Files/dotnet
/c/Program Files/nodejs
/c/Python312/Scripts
/c/Python312
/c/Windows/system32
/c/Windows
/c/Windows/System32/Wbem
/c/Windows/System32/WindowsPowerShell/v1.0
/c/Windows/System32/OpenSSH
/c/Program Files/Docker/Docker/resources/bin       
/c/Program Files (x86)/MAVProxy
/c/Program Files (x86)/MAVProxy
/c/ProgramData/chocolatey/bin
/c/Program Files/nodejs
/cmd
/c/Program Files/dotnet
/c/Python312/Scripts
/c/Python312
/c/Windows/system32
/c/Windows
/c/Windows/System32/Wbem
/c/Windows/System32/WindowsPowerShell/v1.0
/c/Windows/System32/OpenSSH
/c/Program Files/Docker/Docker/resources/bin       
/c/Program Files (x86)/MAVProxy
/c/Program Files (x86)/MAVProxy
/c/ProgramData/chocolatey/bin
/c/Program Files/nodejs
/cmd
/c/Program Files/dotnet
/c/Users/Ashutosh Tiwari/AppData/Local/Microsoft/WindowsApps
/c/Users/Ashutosh Tiwari/AppData/Local/Programs/Microsoft VS Code/bin
/c/Program Files/nodejs/npm
/c/Program Files/nodejs/npm
/c/Users/Ashutosh Tiwari/AppData/Local/Microsoft/WinGet/Packages/Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe
/c/Users/Ashutosh Tiwari/AppData/Roaming/npm       
/c/Users/Ashutosh Tiwari/AppData/Local/Programs/mongosh
/usr/bin/vendor_perl
/usr/bin/core_perl
```

So basically, these are the steps added to the `PATH` variables.

Now, the **hash** also plays a big role in how things are managed. Search online to learn more about these commands. The hash prepares a table to quickly search, find, and run commands—similar to a cache. It’s a very interesting topic, so try to explore it online.

Before checking for an executable file, **Bash** looks in its **hash table** for previously looked-up executables to quickly locate them.

I know it’s tough, and sometimes I’m not able to understand it fully. These are deep dives, and they will take time to comprehend.

I have just read and created these notes for the first time, but for better understanding, it needs proper revision and study.

### Process Objects

Now lets understand what are process objects

## Process.argv

```jsx
// write this in app.js
console.log(process.argv);
// do node app.js
//o/p
[
  'C:\\Program Files\\nodejs\\node.exe',      
  'C:\\Users\\Ashutosh Tiwari\\Desktop\\ME\\node-js-by-procodrr\\process\\app'
]
🕑 01:14  heyashu ~/Desktop/ME/node-js-by-procodrr/process (master)
```

```jsx
🚀 node app.js 123243 345345 353 5 35 3 5
[
  'C:\\Program Files\\nodejs\\node.exe',      
  'C:\\Users\\Ashutosh Tiwari\\Desktop\\ME\\node-js-by-procodrr\\process\\app.js',
  '123243',
  '345345',
  '353',
  '5',
  '35',
  '3',
  '5'
]
```

See magic its like arguments see above code

Now I will suggest you to try logging this and check what are these process objects

```jsx
// Accessing Process Properties

// Command-line arguments
process.argv;

// Environment variables
process.env;

// Current process ID
process.pid;

// Parent process ID
process.ppid;

// Operating system platform
process.platform;

// Node.js version
process.version;

// Node.js and dependencies versions
process.versions;

// Processor architecture
process.arch;

// Using Process Methods
// Current working directory
process.cwd();

// Change working directory
process.chdir("/tmp");

// Memory usage
process.memoryUsage();

// Process uptime
process.uptime();

// Exiting the process
// process.exit(0);

// Kill the process
process.kill(process.pid);

// Emit warning
process.emitWarning("This is a custom warning message!", {
  code: "MY_WARNING_CODE",
  detail: "This is some additional warning detail.",
});

// Interacting with stdin, stdout, and stderr streams
process.stdout.write("Hello, stdout!\n");
process.stderr.write("Hello, stderr!\n");

// Next Tick demonstration
process.nextTick(() => {
  // This will run on the next tick of the event loop.
});

// Registering event listeners
process.on("exit", (code) => {
  // Process is about to exit with code
});

process.on("warning", (warning) => {
  // Handle warning
});

process.stdin.on("data", (data) => {
  // Process input data
});
```

Dont thank me, Thanks to Anurag sir
