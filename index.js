const CF_PROBLEM_KEY = "CF_PROBLEM_KEY"
const bookmarksection = document.getElementById("bookmark-section")
const deleteimage = chrome.runtime.getURL('assets/delete.png')


document.addEventListener("DOMContentLoaded",()=>{
      chrome.storage.sync.get([CF_PROBLEM_KEY],(data)=>{
          const currentbookmarks = data[CF_PROBLEM_KEY] || [];
          viewbookmarks(currentbookmarks);
      })
})

function viewbookmarks(bookmarks){
       bookmarksection.innerHTML = ""

       if(bookmarks.length===0){
           bookmarksection.innerHTML = "<i>No Bookmarks to show </i>"
           return;
       }
       bookmarks.forEach(bookmark => addbookmark(bookmark));
}

function addbookmark(bookmark){
       const newitem = document.createElement("div")
       newitem.className = "item"

       const ProblemName = document.createElement("p")
       ProblemName.id = "bookmark-name"
       ProblemName.innerText = bookmark.name

       ProblemName.addEventListener("click",()=>{
           chrome.tabs.create({url:bookmark.url})
       })

       const deleteimg = document.createElement("img")
       deleteimg.className = "delete-img"
       deleteimg.src = deleteimage
       
 deleteimg.addEventListener("click", () => {
        newitem.classList.add("slide-out");

        newitem.addEventListener("transitionend", () => {
            chrome.storage.sync.get([CF_PROBLEM_KEY], data => {
                const current = data[CF_PROBLEM_KEY] || [];
                const updated = current.filter(b => b.url !== bookmark.url);
                chrome.storage.sync.set({ [CF_PROBLEM_KEY]: updated }, () => {
                    newitem.remove();
                });
            });
        }, { once: true });
    });


       newitem.append(ProblemName)
       newitem.append(deleteimg)
       bookmarksection.appendChild(newitem)
}

