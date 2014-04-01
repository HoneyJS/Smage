﻿function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.sharingContainer = document.querySelector(".score-sharing");

  this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

	  try {
    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });
	  }catch (e) {
		  alert(e.message);
	  }

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continue = function () {
  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "restart");
  }

  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var text=new Array(18);
	text[0] = " ";
	text[1] = "夏";
	text[2] = "商";
	text[3] = "周";
	text[4] = "秦";
	text[5] = "汉";
	text[6] = "三国";
	text[7] = "晋";
	text[8] = "南北朝";
	text[9] = "隋";
	text[10] = "唐";
	text[11] = "五代<br>十国";
	text[12] = "宋";
	text[13] = "元";
	text[14] = "明";
	text[15] = "清";
	text[16] = " ";
	text[17] = " ";
  var self = this;
  var text2 = function (n) { var r = 0; while (n > 1) r++, n >>= 1; return r; }

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 131072) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  //inner.classList.add("tile-inner");
  inner.className += " tile-inner";
  inner.innerHTML = text[text2(tile.value)];

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    //addition.classList.add("score-addition");
	  addition.className += " score-addition";
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
	  var self = this;
	  setTimeout(function() {
		  if (addition.parentNode == self.scoreContainer) self.scoreContainer.removeChild(addition);
	  }, 600);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  var mytxt=new Array(14);
  mytxt[0]="花开花落花开花落，悠悠岁月长长的河";
	mytxt[1]="力拔山兮气盖世，时不利兮骓不逝。";
  mytxt[2]="但使龙城飞将在，不教胡马度阴山。";//"将军百战死，壮士十年归。";
  mytxt[3]="大江东去，浪淘尽、千古风流人物。";
  mytxt[4]="悟已往之不谏，知来者之可追。";
  mytxt[5]="商女不知亡国恨，隔江犹唱后庭花！";
  mytxt[6]="借问长城侯，单于入朝谒。";
  mytxt[7]="春宵苦短日高起，从此君王不早朝……";
  mytxt[8]="待从头、收拾旧山河，朝天阙。";
  mytxt[9]="一代天骄，只识弯弓射大雕！";
  mytxt[10]="粉身碎骨全不顾，要留清白在人间。";
  mytxt[11]="量中华之物力，结与国之欢心……";
  mytxt[12]="革命尚未成功,同志仍须努力。";
  mytxt[13]="数风流人物，还看今朝！";


  var text3 = function (m) { var r = 0; while (m > 1) r++, m >>= 1; return r; }
  var type    = won ? "game-won" : "game-over";
  var message = won ? "中华人民共和国万岁！" : mytxt[text3(maxscore)-3];

  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "end", type, this.score);
  }

  //this.messageContainer.classList.add(type);
	this.messageContainer.className += " "+type;
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;

  this.clearContainer(this.sharingContainer);
  this.sharingContainer.appendChild(this.scoreTweetButton());
  ///twttr.widgets.load();
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  //this.messageContainer.classList.remove("game-won");
  //this.messageContainer.classList.remove("game-over");
	var list = this.messageContainer.className.split(" ");
	list.indexOf("game-won") >= 0 && list.splice(list.indexOf("game-won"), 1);
	list.indexOf("game-over") >= 0 && list.splice(list.indexOf("game-over"), 1);
	this.messageContainer.className = list.join(" ");
};

HTMLActuator.prototype.scoreTweetButton = function () {
  var tweet = document.createElement("a");
  //tweet.classList.add("twitter-share-button");
	tweet.className += " twitter-share-button";
  //tweet.setAttribute("href", "https://twitter.com/share");
	tweet.setAttribute("href", "../index.html");
  tweet.setAttribute("data-via", "oprilzeng");
  tweet.setAttribute("data-url", "http://www.oprilzeng.com/2048/full");
  tweet.setAttribute("data-counturl", "http://www.oprilzeng.com/2048/full/");
  tweet.textContent = "退出";

  var text = "I scored " + this.score + " points at PRC2048-Full edition, a game where you " +
             "join numbers to score high! #PRC2048";
  tweet.setAttribute("data-text", text);

  return tweet;
};
