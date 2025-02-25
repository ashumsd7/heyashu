---
title: " LLD: Youtube live chat UI"
name: " LLD: Youtube live chat UI"
episode: 29
publishedOn: 02-25-2025
updatedOn: 02-25-2025
author: Ashutosh Anand Tiwari
tags: fsd
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
\
[Github Code Link](https://github.com/ashumsd7/react-playground-2025/blob/main/src/pages/YoutubeChat.jsx)\
[Live Deployed Link](https://heyashu-react.netlify.app/yt-chat)

```
import React, { useEffect, useState,useRef } from 'react';

const COMMENTS = [
  {
    id: 1,
    name: 'John Doe',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    avatar: 'https://avatar.iran.liara.run/public'
  },
  {
    id: 2,
    name: 'Jane Doe',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    avatar: 'https://avatar.iran.liara.run/public'
  },
  {
    id: 3,
    name: 'Alice Smith',
    comment: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    avatar: 'https://avatar.iran.liara.run/public'
  },
  {
    id: 4,
    name: 'Bob Johnson',
    comment: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.',
    avatar: 'https://avatar.iran.liara.run/public'
  },
  {
    id: 5,
    name: 'Charlie Brown',
    comment: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.',
    avatar: 'https://avatar.iran.liara.run/public'
  },
  {
    id: 6,
    name: 'David Wilson',
    comment: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
    avatar: 'https://avatar.iran.liara.run/public'
  },
  {
    id: 7,
    name: 'Eve Davis',
    comment: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    avatar: 'https://avatar.iran.liara.run/public'
  },
  {
    id: 8,
    name: 'Frank Miller',
    comment: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    avatar: 'https://avatar.iran.liara.run/public'
  },
  {
    id: 9,
    name: 'Grace Lee',
    comment: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    avatar: 'https://avatar.iran.liara.run/public'
  },
  {
    id: 10,
    name: 'Hank Green',
    comment: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
    avatar: 'https://avatar.iran.liara.run/public'
  }
];


function generateRandomName() {
  const names = [
    'Alice Smith', 'Bob Johnson', 'Charlie Brown', 'David Wilson', 
    'Eve Davis', 'Frank Miller', 'Grace Lee', 'Hank Green', 
    'Ivy White', 'Jack Black', 'Karen Hill', 'Larry King', 
    'Mona Lisa', 'Nina Simone', 'Oscar Wilde', 'Paul Newman', 
    'Quincy Jones', 'Rachel Green', 'Steve Jobs', 'Tina Turner'
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}


function YoutubeChat() {
  const [comments, setComments] = useState(COMMENTS);
  const myRef= useRef()

 async function fetchData(){
   //make API call
   const response = await fetch('https://jsonplaceholder.typicode.com/comments/1');
   const data = await response.json();
   console.log(data);
   const newComment={
    id:1,
    name:generateRandomName(),
    comment:data.body,
    avatar:'https://avatar.iran.liara.run/public'
   }
   setComments(prev=>{

    let  oldData=[...prev]
    if(oldData?.length>5){
      console.log("Yes more than 5")
      oldData = oldData.slice(-5);
      console.log("oldData",oldData)
    }
    return [...oldData,newComment]
   })

  if (myRef.current) {
    myRef.current.scrollTop = myRef.current.scrollHeight;
  }

 
  }


  useEffect(() => {
    const s = setInterval(() => {
      fetchData()
    }, 5000);
    return () => clearInterval(s);
  }, []);
  return (
    <div>
      <h2 className='mb-2 text-3xl font-bold text-red-600'>Youtube </h2>
      <div className='flex gap-4 flex-wrap'>
        <iframe
          className='h-[600px] md:w-2/3 w-full'
          src='https://www.youtube.com/embed/dQw4w9WgXcQ'
          title='Youtube'
        />
        <div className='h-[600px] md:w-1/3 w-full flex gap-4   border p-5 mx-h-[600px] overflow-y-auto  flex-col' ref={myRef}>
          {comments?.map((item) => (
            <SingleComment key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default YoutubeChat;

function SingleComment({ name, comment, avatar }) {
  return (
    <div className='flex gap-2 '>
      <img src={avatar} alt='user' className='h-10 w-10 rounded-full' />
      <div className='flex flex-col'>
        <span className='text-sm font-bold'>{name}</span>
        <span className='text-sm'>{comment}</span>
      </div>
    </div>
  );
}

```
