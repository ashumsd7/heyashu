---
title: "E16: Promt in terminal"
name: Promt in Terminal
episode: 16
publishedOn: 09-19-2024
updatedOn: 09-19-2024
tags: promt, nodejs, javascript
thumbnail: /public/images/blogs/promt-procdre.png
author: Ashutosh Anand Tiwari
profilePic: /public/images/blogs/promt-procdre.png
---
Ab humne **GUI**, **CLI**, aur commands ke baare mein kaafi achhe se jaan liya hai. Ab baari hai ye jaanne ki **prompt** kya hota hai.

## **What is a command prompt?**

A command prompt is the input field in a text-based [user interface](https://www.techtarget.com/searchapparchitecture/definition/user-interface-UI) screen for an operating system (OS) or program. The prompt is designed to elicit an action. The command prompt consists of a brief text string followed by a blinking [cursor](https://www.techtarget.com/whatis/definition/cursor), which is where the user types command prompt commands.  [This is copied from](https://www.techtarget.com/whatis/definition/command-prompt). 
Jab hum koi bhi terminal open karte hain, jaise **Start** button par click karke **PowerShell** open karte hain, to aapko waha ek **PS** likha hua milega, jaise ye:

```jsx
PS C:\Users\heyashu>
```

Aapko pata hai ye **PS** kya hota hai? PS ka full form hota hai **Prompt String**. PS ko nahi, but `C:\Users\heyashu>` isse **Prompt** kehte hain. PS ka matlab **Prompt String** hai.

Ab aao, jaante hain prompt ko kaise customize karein?

Dekho, Bash mein **PS1** aur **PS2** naam se variables hote hain. To chalo, print karke dekhte hain. Kaise print karenge? Using `$`.

```jsx
Ashutosh Tiwari@DESKTOP-NCVPMH3 MINGW64 ~/Desktop/Me/node-js-by-procodrr
$ echo $PS1
\[\]\[\033]0;$TITLEPREFIX:$PWD\007\]\n\[\033[32m\]\u@\h \[\033[35m\]$MSYSTEM \[\033[33m\]\w\[\033[36m\]`__git_ps1`\[\033[0m\]\n$ \[\]
```

to ps1 ke andar wo stored ahi badi si string, ab isko hum rename ekr sate hain kaise??

```jsx
Ashutosh Tiwari@DESKTOP-NCVPMH3 MINGW64 ~/Desktop/Me/node-js-by-procodrr
$ PS1=ashu
ashu
ashu
ashu

// ab upar wali string badal ke ashu ho gyi. lekin ye permanant nahi fix hua 
// bad me permanant krenge modify isko
```

### Configure Terminal

To agar hume **PS1** aur **PS2** ko permanently change karna hai, to aaye dekhte hain kaise possible hoga.

Ek file hoti hai **home directory** ke andar. Achha, aapko kaise pata chalega home directory kya hai? To aap terminal mein jaayein aur likhiye:

```jsx
~ explorer .
// enter kriye aur aapka home directory fataak se file explorere me khul jayegi
// note: agar aap linux pe hai to ./ use karye after explorer
```

to ab folder open hua ab agar `.bashrc` file na ho waha to aapko banani padegi aise, ya fir normally

```jsx
Ashutosh Tiwari@DESKTOP-NCVPMH3 MINGW64 ~
$ touch .bashrc
```

ab file create ho jayegi..

ab us `.bashrc` ko vs code ya kisi editor me open kr lijiye, ab iss bash rc me jo bhi likh denge aap wo har naye terminal pe run hoga , ab aap likh dijiye .bashrc me

```jsx
//.bashrc
echo "heyyyy"
PS1='hello=> '
```

ab har bar naye terminal me mere hello print hoga

```jsx
// in terminal
heyyyy
hello=> 
```

### Alias

Iska use tab hota hai jab aapko koi bahut badi command baar-baar likhni padti ho, to aap usko ek naam de sakte ho. Jaise, `git add .` aur aap nahi chahte baar-baar ye command likho, to iska ek upnaam (alias) de do, jaise mera naam Ashutosh hai aur aap mujhe **Ashu** bula sakte ho waise. Ab aapko **.bashrc** file mein likhna hoga.

To chalo, sabse pehle **.bashrc** ko **source** karte hain aur run karte hain.

```jsx
// in terminal
source ~./.bashrc
```

ab jaise maine bashrc me likh diya hai 

```
// .bashrc
alias hey='echo 1233445'
```

ab jaise aapne source ~/.bashrc kiya to wo file run kr jayegi aur saara content print ho jayega, ab jaise aap hey likhge 1233445 print ho jayega

```jsx
Ashutosh Tiwari@DESKTOP-NCVPMH3 MINGW64 ~/Desktop/ME/node-js-by-procodrr
$ hey
1233445
```

aise aap git ki commnds ko bhi customize kr sakte ho, aurr bahut kuchh, ab dekho aise aap bahut customize kr sakte ho,. kuchh error aaye mujhe contact kro ya fi google kariye, Dhanywaad
