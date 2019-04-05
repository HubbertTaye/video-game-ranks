let trash = document.querySelectorAll(".fa-trash");
let voteUp = document.querySelectorAll(".fa-chevron-circle-up");
let voteDown = document.querySelectorAll(".fa-chevron-circle-down");

Array.from(voteUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const title = this.parentNode.parentNode.childNodes[1].innerText
        const voteUp = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
        fetch('voteUp', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'title': title,
            'voteUp': voteUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(voteDown).forEach(function(el) {
      el.addEventListener('click', function(){
        const title = this.parentNode.parentNode.childNodes[1].innerText
        const voteUp = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
        fetch('voteDown', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'title': title,
            'voteUp': voteUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(el) {
      el.addEventListener('click', function(){
        const title = this.parentNode.parentNode.childNodes[1].innerText
        fetch('vidgames', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'title': title
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
//optimizations: change order depending on the amount of likes.
//prevent users from creating the same video game for the list
