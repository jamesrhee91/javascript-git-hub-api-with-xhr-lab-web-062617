

function displayRepositories(event, data) {
  // debugger
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.owner.login + ' - <a href="'+r.html_url+'" data-repo="' + r.name + '" onclick="getCommits(this)">'+r.name+'</a> - <a href="'+r.branches_url+'" onclick="getBranches(this)">'+r.default_branch+'</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById('username').value
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el) {
  const username = document.getElementById('username').value
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`)
  req.send()
}

function getBranches(el) {
  const username = document.getElementById('username').value
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(c => '<li>' + c.commit.author.name + ' - ' + c.author.login + ' - ' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
