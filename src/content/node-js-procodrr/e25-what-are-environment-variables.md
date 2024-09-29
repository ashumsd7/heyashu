---
title: "e25: What are Environment Variables?"
name: What are Environment Variables?
episode: 25
publishedOn: 09-25-2024
updatedOn: 09-25-2024
thumbnail: /public/images/blogs/1env.jpg
author: Ashutosh Anand Tiwari
tags: "env variables , node js, os, "
profilePic: /public/images/blogs/pfp2.png
---
Ye ek tareeke ke key-value pair hote hain, aur dono strings hote hain. Achha, aapke Windows OS me bhi environment variables hote hain. MacOS aur Linux pe bhi aap inhe dekh sakte hain. Agar aap Windows me "environment" search karenge, to aapko global environment variables dikh jayenge.

![image.png](/public/images/blogs/2env.jpg)

User variables aur System variables ke do tareeke ke sections aap dekh sakte ho. Aur aap naye variables bhi add kar sakte ho "New" pe click karke, jisme aap paths wagairah bhi dal sakte hain. System variables me aapko PATH wagairah bhi dikh jayega. Lekin system variables ko edit karna recommend nahi kiya jata.

Abhi humne dekha ek user variable aur ek system variable show ho raha hai, jo basically operating system aur user se related hote hain. Achha, ek teesre tareeke ka variable bhi hota hai.

### Process Specific Variables

Jab bhi ek process start hoti hai, jaise Node.js process, to hume us process ke variables ka bhi access milta hai. Ek warning hai aapke liye—ye blog jo aap padh rahe ho, wo pichhle blog se related hai, to kaafi cheeje humne pehle se install aur configure kar rakhi hain. To ye highly recommended hai ki aap pehle pichhle blogs ko achhe se padhein. Yaha hum pichhle wale A, B, aur C thread wale example par debugger laga ke run karenge.

Aap JavaScript debugger ke auto-attach ko on kar lijiye. Agar samajh nahi aa raha ho, to pichhle blog ko follow kariye [ye rahi link](https://heyashu.in/digital-garden/notes/backend-with-nodejs-by-procoderr-notes/e22-thread-concurrency-and-parallelism). Humne debugger laga ke start kar diya hai thread wali file, jisme humne teen threads bana rakhe the, aur debugger unhi threads me doosre thread par ruk gaya hai.

Ab jab aap "Process Informer" app kholenge (jo humne pichhle session me download kiya tha) aur Node.js process pe click karoge, to environment section me PS1 dikhai dega.

![image.png](/public/images/blogs/3env.jpg)

Actually, is dialog box me aapko teen accordion dikhenge: Process, System, aur User. Jo ye Process section hai, yahi process-specific variables ka hota hai. Achha, hum yeh bhi samajhte hain ki jab ek process child process ko start karti hai, to child process apne parent process ke saare variables ko access kar sakti hai, yaani wo variables inherit ho jaate hain. Aap "inspect" ya debugger use karke bhi in variables ko dekh sakte ho aur process ki details ko check kar sakte ho.

```jsx
🚀> node --inspect fileName
```

Achha, ye baat dhyaan rakhni hai ki kisi bhi JavaScript file me ek normal variable ko env variable nahi bolte hain. Env (environment) variable ek special variable hota hai jo aapke system ya application ke environment se related hota hai.

Ab agar aapko ek naya env variable banana ho, to uska ek alag tareeka hota hai, jo hum ab dekhte hain. Env variables uske andar key-value pairs likhe jaate hain. Fir usse aap apne application me access kar sakte ho `process.env` ke through.

### Create new Env Variable

```jsx
//in terminal
export website=heyashu.in
```

![image.png](/public/images/blogs/4env.jpg)

Achha, jo humne create kiya wo sirf us bash shell ke liye tha, yani wo variable permanent nahi hai.

Ab kaise ek aisa variable banayein jo environment variable bhi ho aur permanent bhi rahe? Iske liye hum `.bashrc` ka use karenge. Aapko bas us file me jaake wahi code likhna hoga.

```jsx
//in .bashrc
export website=heyashu.in  
// this will be created in all sub sets of bash new terminal
```

Ab baari aati hai ki access kaise karte hain? Matlab humne environment variables to bana liye, par use kaise karein?

### Access env variables in code

To ab tak humne yeh samajh liya ki user, system, aur process env variables hote hain. Ab hume process env variables ko access karna hai. Process ke andar ek object hota hai jiska naam hai `env`. Aap apne code me isko aise access kar sakte hain:

```jsx
// in terminal
console.log(process.env)
```

![image.png](/public/images/blogs/5env.jpg)

Ab dekha apne, jo new variable humne `website_name` ke naam se `.bashrc` me banaya tha, wo `process.env` me bhi visible hai aur hum usse code me bhi access aur use kar pa rahe hain. Accha, ek cheez aur, `PATH` naam ka bhi ek variable hota hai jo kabhi override nahi hota, balki concatenate hota hai. Iske baare me hum detail me baad me jaanenge. Abhi ke liye, `process.env` ki mystery resolve ho chuki hai!

- - -

### How to Print Env Variables in Terminal

Bas aap terminal me jaake `env` likh dijiye, aur aapko saare environment variables list ho jayenge!

4o

```jsx
🕑 15:00  heyashu ~/Desktop/ME/node-js-by-procodrr (master)
🚀 env
ProgramFiles(x86)=C:\Program Files (x86)
CommonProgramFiles(x86)=C:\Program Files (x86)\Common Files
SHELL=/usr/bin/bash
NUMBER_OF_PROCESSORS=8
FPS_BROWSER_USER_PROFILE_STRING=Default
COLORTERM=truecolor
PROCESSOR_LEVEL=6
TERM_PROGRAM_VERSION=1.92.2
MINGW_PREFIX=/mingw64
VSCODE_INSPECTOR_OPTIONS=:::{"inspectorIpc":"\\\\.\\pipe\\node-cdp.16944-a308e7a1-12.sock","deferredMode":false,"waitForDePKG_CONFIG_PATH=/mingw64/lib/pkgconfig:/mingw64/share/pkgconfig
USERDOMAIN_ROAMINGPROFILE=DESKTOP-NCVPMH3
HOSTNAME=DESKTOP-NCVPMH3
PROGRAMFILES=C:\Program Files
NODE_OPTIONS= --require "c:/Users/Ashutosh Tiwari/.vscode/extensions/ms-vscode.js-debug-nightly-2024.9.1817/src/bootloader.js"  --inspect-publish-uid=http
MSYSTEM=MINGW64
ChocolateyInstall=C:\ProgramData\chocolatey
PATHEXT=.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.PY;.PYW
ORIGINAL_TEMP=/tmp
MINGW_CHOST=x86_64-w64-mingw32
OS=Windows_NT
HOMEDRIVE=C:
MSYSTEM_CARCH=x86_64
USERDOMAIN=DESKTOP-NCVPMH3
PWD=/c/Users/Ashutosh Tiwari/Desktop/ME/node-js-by-procodrr
USERPROFILE=C:\Users\Ashutosh Tiwari
OneDriveConsumer=C:\Users\Ashutosh Tiwari\OneDrive
MANPATH=/mingw64/local/man:/mingw64/share/man:/usr/local/man:/usr/share/man:/usr/man:/share/man
VSCODE_GIT_ASKPASS_NODE=C:\Users\Ashutosh Tiwari\AppData\Local\Programs\Microsoft VS Code\Code.exe
MINGW_PACKAGE_PREFIX=mingw-w64-x86_64
ALLUSERSPROFILE=C:\ProgramData
ORIGINAL_PATH=/mingw64/bin:/usr/bin:/c/Users/Ashutosh Ti
CommonProgramW6432=C:\Program Files\Common Files
HOME=/c/Users/Ashutosh Tiwari
USERNAME=Ashutosh Tiwari
SSH_ASKPASS=/mingw64/bin/git-askpass.exe
LANG=en_US.UTF-8
PLINK_PROTOCOL=ssh
OneDrive=C:\Users\Ashutosh Tiwari\OneDrive
COMSPEC=C:\Windows\system32\cmd.exe
TMPDIR=/tmp
GIT_ASKPASS=c:\Users\Ashutosh Tiwari\AppData\Local\Programs\Microsoft V
APPDATA=C:\Users\Ashutosh Tiwari\AppData\Roaming
SYSTEMROOT=C:\Windows
LOCALAPPDATA=C:\Users\Ashutosh Tiwari\AppData\Local
COMPUTERNAME=DESKTOP-NCVPMH3
INFOPATH=/mingw64/local/info:/mingw64/share/info:/usr/local/info:/usr/share/info:/usr/info:/share/info
VSCODE_GIT_ASKPASS_EXTRA_ARGS=
TERM=xterm-256color
LOGONSERVER=\\DESKTOP-NCVPMH3
ZES_ENABLE_SYSMAN=1
ACLOCAL_PATH=/mingw64/share/aclocal:/usr/share/aclocal
PSModulePath=C:\Program Files\WindowsPowerShell\Modules;C:\Windows\system32\WindowsPowerShell\v1.0\Modules
VSCODE_GIT_IPC_HANDLE=\\.\pipe\vscode-git-ada4b81b52-sock
TEMP=/tmp
MSYSTEM_CHOST=x86_64-w64-mingw32
DISPLAY=needs-to-be-defined
ORIGINAL_TMP=/tmp
SHLVL=1
PROCESSOR_REVISION=8e0a
DriverData=C:\Windows\System32\Drivers\DriverData
COMMONPROGRAMFILES=C:\Program Files\Common Files
EXEPATH=C:\Program Files\Git\bin
PROCESSOR_IDENTIFIER=Intel64 Family 6 Model 142 Stepping 10, GenuineIntel
SESSIONNAME=Console
PS1=\[\]🕑 \[\033[01;36m\]\A \[\033[0m\] \[\033[1;32m\]heyashu \[\033[1;33m\]\w\[\033[36m\]`__git_ps1`\[\033[0m\]\n🚀 \[\033[1m\]\[\]
PKG_CONFIG_SYSTEM_LIBRARY_PATH=/mingw64/lib
VSCODE_GIT_ASKPASS_MAIN=c:\Users\Ashutosh Tiwari\AppData\Local\Programs\Microsoft VS Code\resources\app\extensions\git\dist\askpass-main.js
CHROME_CRASHPAD_PIPE_NAME=\\.\pipe\crashpad_7888_UATMJLDLBBTYUQND
HOMEPATH=\Users\Ashutosh Tiwari
TMP=/tmp
CONFIG_SITE=/etc/config.site
PATH=/c/Users/Ashutosh Tiwari/bin:/mingw64/bin:/usr/local/bin:
FPS_BROWSER_APP_PROFILE_STRING=Internet Explorer
PROCESSOR_ARCHITECTURE=AMD64
PUBLIC=C:\Users\Public
PKG_CONFIG_SYSTEM_INCLUDE_PATH=/mingw64/include
MSYS=disable_pcon
SYSTEMDRIVE=C:
TERM_PROGRAM=vscode
ProgramData=C:\ProgramData
website=heyashu.in
_=/usr/bin/env
```

In sabme **PATH** variable bahut hi important hota hai. Aap online jaake iske baare mein aur achhe se padh sakte ho. Har operating system ka **PATH** variable ka structure alag hota hai. Agar aap **bash** ya **Unix** system use karte ho to ye **colon (:)** se concatenate karta hai. Aap terminal me `printenv` ya `env` likh ke bhi variables print kar sakte ho.

```jsx
// in terminal
printenv
```

Baki terminal me variables kaise create karte hain, ye bhi hum pahle padh chuke hain. Aap simply terminal me `export` command ka use kar ke variable create kar sakte ho. Jaise:

```jsx
//in terminal ya .bashrc
export website=heyashu.in
```

Ye variable tab tak available rahega jab tak aapka current terminal session open hai. Session close karte hi ye variable remove ho jayega. Permanent variable banane ke liye `.bashrc` ya `.bash_profile` file me add karna hota hai, jaisa humne pehle discuss kiya tha.

ekin agar aap chahte ho ki ek env variable ko system ke operating system ke process me add karna hai, to uske liye?

### setx command (Create env using bash)

Hum `setx` command ka use karke key-value pair ke form me environment variables ko system pe globally set kar sakte hain.

```jsx
🕑 15:04  heyashu ~/Desktop/ME/node-js-by-procodrr (master)
🚀 setx hey hi

SUCCESS: Specified value was saved.
```

![image.png](/public/images/blogs/6env.jpg)

Agar aako us evaribale ko empty krna hai to just empty string  pass kr dijiye

```jsx
// in terminal
🚀 setx hey ""   // deletes variable  temp

SUCCESS: Specified value was saved.

// Permanant Delete
REG delete HKCU\Environment /F /v KeyName 
//( search online ) , but ye command kewal pewershell me hi run hoti hai
// to chahe aap direct power shell me REG command likh do
// ya shell se powershell -Command "REG delete HKCU\Environment /F /v KeyName " run kr do
```

Humne yaha ye bhi jana, bash me PowerShell bhi use kar sakte hain.

Ab aao dekhte hain Node.js se variables kaise create karein aur delete karein.

### Create env variable using node js

```jsx
const {exec}= require('child_process')

exec(`setx aa bb`)
```

### The new way to debug Node.js code (In Chrome Dev Tools)

Debug lagaiye apne code me, chahe thread wale example me ya phir ek file me `setInterval` laga ke. `—inspect` flag ke saath run kar lijiye aur aap Chrome Dev Tools me apne Node.js code ko debug kar paayenge.

```jsx
const envs=process.env
setInterval(() => {
  console.log(envs);
}, 2000);
```

```jsx
🚀> node --inspect fileName
```

Aur ab Chrome open karo Inspect mode me, waha aapko Node.js ka green icon dikhega. Us par click karte hi ek naya Dev Tools window open ho jayega, aur ab aap yaha pe apne code ko easily debug kar sakte hain

![image.png](/public/images/blogs/7emv.jpg)

agr aap chahte ho isss process me kisi env ko exclude krna to aap command ruin kr skate ho

Agar aap chahte ho iss process me kisi specific env variable ko exclude karna, to aap command run kar sakte ho aur uss variable ko process se temporarily hata sakte ho.

```jsx
env -u PS1 -u node --inspect fileName
```

e itna janana zaroori hai ki child process apne parent process ke env variables ko inherit karta hai. Lekin agar child process koi parent env variable ko inherit karega, to parent process ka variable change nahi hoga. Aap kuch extra commands run karke ise check kar sakte ho. Baki aap explore kar sakte ho, abhi ke liye itna hi jan lo ki aisa hota hai. Mujhe pata hai ki aap thoda confuse ho sakte ho.

### .env files

Aap chaho to `.env` ya `.meraenv` file bana sakte ho, dono ka kaam same hota hai. Ya phir bina kisi extension ke ek `meraenv` file bana lo, jise hum read karenge aur process ke env me store karenge.

Pehle aap ek file banayein `meraenv` aur usme kuch likh dein.

```jsx
xyz lololo
```

Aur ab agar ye code likh ke usko read karke, split karke `process.env` me attach kar doge,

```
const fs= require("fs");  

const fileData=fs.readFileSync('./meraenv')
let parsedFile= fileData.toString()
const splittedVar= parsedFile.split(' ')
console.log("splittedVar", splittedVar);
process.env[splittedVar[0]]= splittedVar[1]

setInterval(() => {
  console.log(process.env);
  console.log("Check");
}, 1000);

//output ( Process env ka console hai)
  website: 'heyashu.in',
  WINDIR: 'C:\\Windows',
  API_URL: 'my api url'
  xyz: 'lololo',
```

Aapko ye samajhna hai ki `.env` ek standard hai jisme aap environment variables ko store karte ho aur kebab-case me likhte ho. Iska syntax simple hota hai aur Node.js jaise environments isse read karke variables ko `process.env` me attach kar lete hain.

Ab `.env` koi special file nahi hoti, bas Node.js isko piche se read karta hai aur process ke env me variables ko attach karta hai. Ye ek widely accepted standard hai, aur aapke kaam ko simplify karne ke liye ek npm package bhi hai jiska naam hai `dotenv`, jo yehi kaam automatically karta hai.

**Package link**: [dotenv npm package](https://www.npmjs.com/package/dotenv)

**GitHub link**: [dotenv GitHub](https://github.com/motdotla/dotenv)

**Source code line**: [Code block](https://github.com/motdotla/dotenv/blob/master/lib/main.js#L327) jo same kaam karta hai jaisa humne manually kiya tha.

**Homework**:

1. CRLF aur LF ka kya farak hota hai VS Code me?
2. `\r\n` kya hota hai aur iska kya use hai?
