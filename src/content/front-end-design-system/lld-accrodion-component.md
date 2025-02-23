---
title: LLD Accrodion Component
name: "LLD:  Accrodion Component"
episode: 24
publishedOn: 02-23-2025
updatedOn: 02-23-2025
thumbnail: /public/images/blogs/acc_1.png
author: Ashutosh Anand Tiwari
tags: front-end-design-system
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
Accordion is a kind of controlled input used to show data.
So, after confirming where the data comes from and knowing the requirements, we start the development.
🔗 Links
📌 GitHub Code Link: \[https://github.com/ashumsd7/react-playground-2025/blob/main/src/pages/Accordion.jsx]
🚀 Live Deployed Link: \[https://heyashu-react.netlify.app/accordion]
Approach
Here, we have accordion items and children. Since siblings are sharing data and using the same state to track which one is opened and which is not, it's better to use state lifting.
That's why the parent component will keep all the state, and children will receive props based on which item is opened. This ensures that the accordion works properly.
After checking the code, you will also see state lifting in action.

```jsx
function Accordion() {

  const [open, setOpen] = useState(null);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Accordion</h1>

      {jsonData?.map((item)=>(
        <AccordionItem key={item.id} item={item} open={open} setOpen={setOpen}/>
      ))}
      

      
    </div>
  )
}

export default Accordion

function AccordionItem({item,open, setOpen}){
  return (
    <>
      <div className="border-b border-gray-200">
        <div className='flex justify-between bg-gray-200 p-2 font-bold border-b border-gray-300'>
          {item.title}
          <button onClick={() => setOpen(open==item.id ? null : item.id)}>
            {open==item.id ? <span>&#9650;</span> : <span>&#9660;</span>}
          </button>
        </div>
        {open==item.id  && <div className='my-2'>{item.body}</div>}
      </div>
    </>
  )

}
```
