---
title: "e27: Installing Linux WSL in windows"
name: Installing Linux (WSL) in windows
episode: 27
publishedOn: 09-26-2024
updatedOn: 09-26-2024
thumbnail: /public/images/blogs/1wsl.jpg
author: Ashutosh Anand Tiwari
profilePic: /public/images/blogs/pfp2.png
---
The permission system on Linux is totally different from Windows, and whenever we deploy our project on a server, the terminal we get is usually a Linux system. So, it's important to learn the Linux path and file system as well. What are you waiting for? Let's start!

Click the Windows key and search for "WSL." If it shows up, great! Otherwise, just install it and get ready to explore.

```jsx
// in powershell
wsl --install
```

After opening and installing, if you search and click on WSL, you'll get this terminal where you can start exploring the Linux environment.

```jsx
 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

This message is shown once a day. To disable it please create the
/home/heyashu/.hushlogin file.
heyashu@DESKTOP-NCVPMH3:~$  
```

So, just like this, all cloud providers offer you a similar terminal. If you're installing it for the first time, you might need to restart and set up in the terminal, meaning you'll need to answer a few setup questions. That's it!

Now, if you check your VS Code terminal, you'll notice that WSL has been added as a new terminal environment option.

![image.png](/public/images/blogs/2wsl.jpg)

he full form of WSL is **Windows Subsystem for Linux**, and with this, we've basically installed a new OS (Linux) inside our Windows system. If you already have Linux, then you're good to go—nothing to worry about, you're already rocking!

To navigate in the terminal, use `cd /` to move to the previous directory.

Go to `\\wsl.localhost\Ubuntu` to check all Ubuntu files.

And for accessing the `.bashrc` file, navigate to `\\wsl.localhost\Ubuntu\home\heyashu`.

So, did you get it? Windows has a different `.bashrc` and Ubuntu has its own `.bashrc`, right?

Now, you can create any file or folder inside this directory, open it with VS Code, and run whatever you need.

We also recommend downloading this extension as well!

https://code.visualstudio.com/docs/remote/wsl-tutorial

and then you can wirte sudo commands  also

```jsx
sudo ls
```

The full form of **sudo** is **Super User Do**. So, what you've done is downloaded WSL, which installed Ubuntu. Now, any folder you're opening in VS Code is actually opening in Ubuntu. This makes it super easy for you to learn Linux file paths and use all the Ubuntu commands, including **sudo** for superuser privileges. You're all set to explore Linux commands and manage your system like a pro!
