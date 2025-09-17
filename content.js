const bookbefore = chrome.runtime.getURL('assets/before.png')
const bookafter = chrome.runtime.getURL('assets/after.png')
const CF_PROBLEM_KEY = "CF_PROBLEM_KEY"

window.addEventListener("load",async()=>{await addbookmarkbutton()});

const addbookmarkbutton = async ()=>{
  const bookmarkbutton = document.createElement("img")
  const isbookmarked = await onloadcolor()
  bookmarkbutton.src = isbookmarked?bookafter:bookbefore
  bookmarkbutton.id = "bookmark-button"
  bookmarkbutton.width = 20
  bookmarkbutton.height = 20
  bookmarkbutton.style.marginLeft = "10px"
  bookmarkbutton.style.cursor = "pointer"
  bookmarkbutton.style.transition = "all 0.2s ease"

  bookmarkbutton.addEventListener("mouseenter", () => {
    bookmarkbutton.height = 23
    bookmarkbutton.width = 23
  })
  bookmarkbutton.addEventListener("mouseleave", () => {
    bookmarkbutton.height = 20
    bookmarkbutton.width = 20
  })

  bookmarkbutton.addEventListener("click",async()=>{
        const add = await addquestion()
        bookmarkbutton.src = add?bookafter:bookbefore
  })

  const secondelevellist = document.getElementsByClassName("current selectedLava")[0];
  secondelevellist.insertAdjacentElement("afterend", bookmarkbutton)
}



async function addquestion() {
  let allbookmarks = await getcurrentbookmarks();
  const url = window.location.href;
  const name = document.getElementsByClassName("title")[0].innerText;
  const uniqueid = getId(url);


  if (allbookmarks.some((bookmark) => bookmark.id === uniqueid)) {
    allbookmarks = allbookmarks.filter(
      bookmark => bookmark.id !== uniqueid
    );
    chrome.storage.sync.set({[CF_PROBLEM_KEY]:allbookmarks});
    return false;
  }


  const bookmarkObj = { id: uniqueid, name, url };
  const updatedbookmarks = [...allbookmarks, bookmarkObj];

  chrome.storage.sync.set({ [CF_PROBLEM_KEY]: updatedbookmarks }, () => {        
  });
  return true;
}


const onloadcolor = async()=>{
      const url = window.location.href
      const allbookmarks = await getcurrentbookmarks()
      const id = getId(url)

      if(allbookmarks.some((bookmark)=>bookmark.id===id)){
           return true;
      }
      else return false;
}



function getId(url){
     const arr = url.split('/');
     let id;
     for(let i=0;i<arr.length;i++){
          if(arr[i][0]-'0'<10 & arr[i][0]>=0){
            id = arr[i];
            break;
          }
     }
     id+=arr[arr.length-1]
     return id;
}


function getcurrentbookmarks() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([CF_PROBLEM_KEY], (results) => {
      resolve(results[CF_PROBLEM_KEY] || []);
    });
  });
}
