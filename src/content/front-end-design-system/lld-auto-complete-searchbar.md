---
title: LLD Auto Complete Searchbar
name: LLD Auto Complete Searchbar
episode: 30
publishedOn: 02-25-2025
updatedOn: 02-25-2025
author: Ashutosh Anand Tiwari
tags: fsd
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
[Live Deployed Link](https://heyashu-react.netlify.app/autocomplete)

[Github Code Link](https://github.com/ashumsd7/react-playground-2025/blob/main/src/pages/AutoComplete.jsx)

```
import { useEffect, useRef, useState } from 'react';
let timeoutId;
const AutoComplete = () => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const fetchData = (query) => {
    console.log('get called', query);
    if (!query) return;
    console.log(query);
    fetch(`https://www.google.com/complete/search?client=firefox&q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[1]);
        setIsVisible(true);
        setList(data[1]);
      });
  };
  console.log('New');

  const debounce = (func, delay) => {
    if (timeoutId) clearTimeout(timeoutId);

    // if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(search);
    }, delay);
  };

  // const debouncedFetchData = debounce(fetchData, 2000);

  useEffect(() => {
    debounce(fetchData, 400);
  }, [search]);
  return (
    <div>
      <h1 className='mb-2 text-2xl font-bold'>Auto Complete</h1>

      <input
        type='text'
        value={search}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        onChange={(e) => {
          console.log(e.target.value);
          setSearch(e.target.value);
        }}
        className='w-full rounded-md border p-2'
        placeholder='Search...'
      />
      {isVisible && (
        <ul className='mt-2 flex flex-col justify-center rounded-md border p-1 shadow-md'>
  
            <>
              {list?.map((item, index) => (
                <li key={index} className='cursor-pointer p-2 hover:bg-gray-200'>
                  {item}
                </li>
              ))}

              {list?.length == 0 && <li className='mt-4 opacity-30'>No Results</li>}
            </>
     
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;

```
