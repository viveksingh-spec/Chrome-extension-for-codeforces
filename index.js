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
       newitem.id = "item"
       const ProblemName = document.createElement("p")
       ProblemName.id = "bookmark-name"
       ProblemName.innerText = bookmark.name
       const deleteimg = document.createElement("img")
       deleteimg.id = "delete-img"
       deleteimg.src = deleteimage
       newitem.append(ProblemName)
       newitem.append(deleteimg)
       bookmarksection.appendChild(newitem)
}