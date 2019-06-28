var TwitterAgent = function() {
  this.btnClass = 'r-qvutc0';
  this.waitSeconds = 2
  this.waitPeriod = 3
  this.followVocab = ['Follow', 'Читать'];
  this.displayLogs = true;

  this.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  this.followVisible = async function() {
      let accountButtons = document.getElementsByClassName(this.btnClass);
      let btn, processed = 0;
      this.log(accountButtons.length + ' buttons found')
      for (let btn of accountButtons) {
        if (this.followVocab.findIndex(el => el === btn.innerHTML) !== -1) {
          let y = btn.getBoundingClientRect().top + window.pageYOffset;
          window.scroll({
            top: y,
            behavior: 'smooth'
          });
          await this.sleep(this.waitSeconds * 1000);
          btn.click();
          await this.sleep(this.waitPeriod * 1000 * Math.random());
          processed++;
          this.log('button clicked. sleeping')
        }
      }
      return processed;
  }

  this.scrollDown = async () => {
    let accountButtons = document.getElementsByClassName(this.btnClass);
    let btn = accountButtons[accountButtons.length - 1]
    let y = btn.getBoundingClientRect().top + window.pageYOffset;
    window.scroll({
      top: y,
      behavior: 'smooth'
    });
    await this.sleep(this.waitSeconds * 1000);
  }

  this.follow = async (numberOfAccounts) => {
    this.scrollDown();
    this.scrollDown();
    let total = 0;
    while(total < numberOfAccounts) {
      this.log('total followed: ' + total)
      let inc = await this.followVisible();
      this.log(inc)
      if (inc === 0) {
        this.log('nothing to click: total followed: ' + total)
        return;
      }
      total = total + inc;
    }
    this.log('end of script: total followed: ' + total)
  }

  this.log = (message) => {
    if (this.displayLogs) {
      document.getElementById('AgentResult').innerHTML = message
      console.log(message)
    }
  }
}

var TA = new TwitterAgent();
//TA.follow(500);



function init() {
  let div = document.createElement('div');
  div.id="AgentWrapper"

  let p = document.createElement('p');
  p.id="AgentBtn"
  p.onclick = function() {TA.follow(500);}
  p.innerHTML = "Follow all at this page";
  div.appendChild(p)

  /*
  p = document.createElement('p');
  p.style="padding:10px;cursor:pointer;"
  p.innerHTML = "UnFollow not followers";
  div.appendChild(p)
  */

  let result = document.createElement('p');
  result.id="AgentResult"
  result.innerHTML=""
  div.appendChild(result)

  document.body.appendChild(div)
}

init()
