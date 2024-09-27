---
title: "E28: Understanding the Path System: Windows vs. Linux Explained"
name: "Understanding the Path System: Windows vs. Linux Explained"
episode: 28
publishedOn: 09-27-2024
updatedOn: 09-27-2024
thumbnail: /public/images/blogs/aaapath.jpg
author: Ashutosh Anand Tiwari
profilePic: /public/images/blogs/pfp2.png
---
Okay, before discussing anything, let's first understand what comes to your mind when I say "file" or "folder."

A file is like a box or container of data such as audio, video, or text. A collection of files can be put inside one more container, which is called a folder or directory. That's easy, right? But here's one more thing called:

### Symbolic Links

These can't be seen in file explorers, but if you open your bash terminal, you will. When you go to the root directory using `cd ~/`, you will see all symbolic links.

```jsx
🕑 14:31  heyashu ~/Desktop/ME/node-js-by-procodrr (master)
🚀 cd ~/
🕑 14:31  heyashu ~
🚀 ls
'3D Objects'/            'My Documents'@                                                                                 ntuser.ini   
 AppData/                 NetHood@                                                                                       OneDrive/    
'Application Data'@       npm-cache/                                                                                     Pictures/    
 Contacts/                NTUSER.DAT                                                                                     PrintHood@   
 Cookies@                 ntuser.dat.LOG1                                                                                Recent@      
 Desktop/                 ntuser.dat.LOG2                                                                               'Saved Games'/
 Documents/               NTUSER.DAT{53b39e87-18c4-11ea-a811-000d3aa4692b}.TxR.0.regtrans-ms                             Searches/    
 Downloads/               NTUSER.DAT{53b39e87-18c4-11ea-a811-000d3aa4692b}.TxR.1.regtrans-ms                             SendTo@      
 Favorites/               NTUSER.DAT{53b39e87-18c4-11ea-a811-000d3aa4692b}.TxR.2.regtrans-ms                            'Start Menu'@ 
 IntelGraphicsProfiles/   NTUSER.DAT{53b39e87-18c4-11ea-a811-000d3aa4692b}.TxR.blf                                       Templates@   
 Links/                   NTUSER.DAT{53b39e88-18c4-11ea-a811-000d3aa4692b}.TM.blf                                        Videos/      
'Local Settings'@         NTUSER.DAT{53b39e88-18c4-11ea-a811-000d3aa4692b}.TMContainer00000000000000000001.regtrans-ms
 Music/                   NTUSER.DAT{53b39e88-18c4-11ea-a811-000d3aa4692b}.TMContainer00000000000000000002.regtrans-ms
```

And when you run `ls -l`, here are a few things to know:

* `d` stands for directory
* `l` means symbolic links
* `` indicates regular files

```jsx
🚀 ls -l
total 9125
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 May  8 20:41 '3D Objects'/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 May  8 20:40  AppData/
lrwxrwxrwx 1 Ashutosh Tiwari 197121      40 May  8 20:40 'Application Data' -> '/c/Users/Ashutosh Tiwari/AppData/Roaming'/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 May  8 20:41  Contacts/
lrwxrwxrwx 1 Ashutosh Tiwari 197121      68 May  8 20:40  Cookies -> '/c/Users/Ashutosh Tiwari/AppData/Local/Microsoft/Windows/INetCookies'/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 Sep 26 20:03  Desktop/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 Jun  7 14:02  Documents/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 Sep 26 20:03  Downloads/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 May  8 20:41  Favorites/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 Sep 27 00:16  IntelGraphicsProfiles/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 May  8 20:41  Links/
lrwxrwxrwx 1 Ashutosh Tiwari 197121      38 May  8 20:40 'Local Settings' -> '/c/Users/Ashutosh Tiwari/AppData/Local'/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 May  8 20:41  Music/
lrwxrwxrwx 1 Ashutosh Tiwari 197121      34 May  8 20:40 'My Documents' -> '/c/Users/Ashutosh Tiwari/Documents'/
lrwxrwxrwx 1 Ashutosh Tiwari 197121      76 May  8 20:40  NetHood -> '/c/Users/Ashutosh Tiwari/AppData/Roaming/Microsoft/Windows/Network Shortcuts'/   
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 May 15 14:44  npm-cache/
-rw-r--r-- 1 Ashutosh Tiwari 197121 3145728 Sep 14 05:09  NTUSER.DAT
-rw-r--r-- 1 Ashutosh Tiwari 197121  991232 May  8 20:40  ntuser.dat.LOG1
-rw-r--r-- 1 Ashutosh Tiwari 197121  786432 May  8 20:40  ntuser.dat.LOG2
-rw-r--r-- 1 Ashutosh Tiwari 197121 1048576 Sep 27 14:31  NTUSER.DAT{53b39e87-18c4-11ea-a811-000d3aa4692b}.TxR.0.regtrans-ms
-rw-r--r-- 1 Ashutosh Tiwari 197121 1048576 Sep 21 12:19  NTUSER.DAT{53b39e87-18c4-11ea-a811-000d3aa4692b}.TxR.1.regtrans-ms
-rw-r--r-- 1 Ashutosh Tiwari 197121 1048576 Sep 21 12:19  NTUSER.DAT{53b39e87-18c4-11ea-a811-000d3aa4692b}.TxR.2.regtrans-ms
-rw-r--r-- 1 Ashutosh Tiwari 197121   65536 Sep 27 14:31  NTUSER.DAT{53b39e87-18c4-11ea-a811-000d3aa4692b}.TxR.blf
-rw-r--r-- 1 Ashutosh Tiwari 197121   65536 May  8 20:40  NTUSER.DAT{53b39e88-18c4-11ea-a811-000d3aa4692b}.TM.blf
-rw-r--r-- 1 Ashutosh Tiwari 197121  524288 May  8 20:40  NTUSER.DAT{53b39e88-18c4-11ea-a811-000d3aa4692b}.TMContainer00000000000000000001.regtrans-ms 
-rw-r--r-- 1 Ashutosh Tiwari 197121  524288 May  8 20:40  NTUSER.DAT{53b39e88-18c4-11ea-a811-000d3aa4692b}.TMContainer00000000000000000002.regtrans-ms 
-rw-r--r-- 1 Ashutosh Tiwari 197121      20 May  8 20:40  ntuser.ini
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 Aug 12 20:14  OneDrive/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 Sep 19 22:52  Pictures/
lrwxrwxrwx 1 Ashutosh Tiwari 197121      76 May  8 20:40  PrintHood -> '/c/Users/Ashutosh Tiwari/AppData/Roaming/Microsoft/Windows/Printer Shortcuts'/ 
lrwxrwxrwx 1 Ashutosh Tiwari 197121      65 May  8 20:40  Recent -> '/c/Users/Ashutosh Tiwari/AppData/Roaming/Microsoft/Windows/Recent'/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 May  8 20:41 'Saved Games'/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 May  8 20:42  Searches/
lrwxrwxrwx 1 Ashutosh Tiwari 197121      65 May  8 20:40  SendTo -> '/c/Users/Ashutosh Tiwari/AppData/Roaming/Microsoft/Windows/SendTo'/
lrwxrwxrwx 1 Ashutosh Tiwari 197121      69 May  8 20:40 'Start Menu' -> '/c/Users/Ashutosh Tiwari/AppData/Roaming/Microsoft/Windows/Start Menu'/      
lrwxrwxrwx 1 Ashutosh Tiwari 197121      68 May  8 20:40  Templates -> '/c/Users/Ashutosh Tiwari/AppData/Roaming/Microsoft/Windows/Templates'/
drwxr-xr-x 1 Ashutosh Tiwari 197121       0 Sep 26 20:03  Videos/
🕑 14:32  heyashu ~
```

A symbolic link points to a file or a folder (directory).

Below, if you see `l`, it indicates that it's pointing to the `Templates` directory.

```jsx
lrwxrwxrwx 1 Ashutosh Tiwari 197121      68 May  8 20:40  Templates -> '/c/Users/Ashutosh Tiwari/AppData/Roaming/Microsoft/Windows/Templates'/
```

We don't work too much with symbolic links, but if you want to explore more, do some research. Let's move to the path system.

### Path System (Windows)

A path refers to the location or route of a directory or file. There are two types of paths. You can go to your VS Code, right-click on any file in the left-side file explorer, and you will get two options: copy relative path and copy absolute path.

1. Relative Path
2. Absolute Path

An absolute path means it will start from the root directory.

```jsx
C:\Users\Ashutosh Tiwari\Desktop\ME\node-js-by-procodrr\path.js
```

Relative path ( soemtime stats with ./ )

```jsx
path.js
```

and in windows it starts with \ and i unix it starts with /

```jsx
\ back slash
/ forward slash
```

And in widnows what is the propblem lets try to understand

```jsx
const mtPath= 'src\text.js'
console.log("mtPath",mtPath);
// so here if you will try to console in terminal
mtPath src      ext.js
```

Actually, above you will see `\t` is pointing to the tab, which is why `\` can be dangerous.

`\n` will point to new lines, and the backslash (`\`) is a special character in multiple programming languages. That's why in Windows, we use double backslashes `\\` in paths.

```jsx
const mtPath= 'src\\text.js'
console.log("mtPath",mtPath);
// so here if you will try to console in terminal
//src\text.js
```

But in Unix, it's different.

### Path in Unix System

In bash, if you observe, everywhere it uses and gives `/` (forward slash) because bash simulates the UNIX system and handles everything behind the scenes.

```jsx
🕑 14:51  heyashu ~/Desktop/ME/node-js-by-procodrr (master)
🚀 pwd
/c/Users/Ashutosh Tiwari/Desktop/ME/node-js-by-procodrr
// see u r in windows but u are getting / forward slash
```

And read about the `cygpath` command, what it does, and how in the future you can interchange paths. But don’t worry, we will handle everything.

Now, let's dive into WSL. Type `\\WSL$` in the explorer path to open Ubuntu. If you're not getting it, we've already downloaded WSL in Windows. Check the last blog [here's the link](https://heyashu.in/digital-garden/notes/backend-with-nodejs-by-procoderr-notes/e27-installing-linux-wsl-in-windows).

Now, if you create any file and copy the path, it will show the Unix path only, meaning forward slashes will appear in both relative and absolute paths.

I faced so many errors while installing Node.js in WSL and creating files, but once you search and follow the steps properly, you’ll be able to handle everything!

```jsx
root@DESKTOP-NCVPMH3:/learning# node app
dsdfs
root@DESKTOP-NCVPMH3:/learning# 
```

In WSL, after typing `\\WSL$`, I created a folder named "learning" and then an `app.js` file. And look, it's printing *"dsdfs"* – yoooo! 🎉

We got Linux, and now the folder and files are running using Node.js perfectly! The path is showing with forward slashes as expected.

I right-clicked on `app.js` and copied the absolute path – see, forward slashes everywhere!

```jsx
\\wsl.localhost\Ubuntu\learning\app.js
```

### Lets learn something more

```jsx
cd . // current folder
cd ..   // parent folder 
cd ../  // parent folder
~/      // moves to home folder
cd ~    // home folder
cat ~/fileName   // read fileName content
cd /   // root directory
```
