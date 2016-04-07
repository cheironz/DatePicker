var date_picker = {};
// 日期存储
date_picker.current = new Date();

// 生成 DOM
date_picker.createDom = function(){
	// DOM创建
	date_picker.domElem = document.createElement('div');
	date_picker.domElem.header = document.createElement('div');
	date_picker.domElem.header.year = document.createElement('div');
	date_picker.domElem.header.year.prevBtn = document.createElement('button');
	date_picker.domElem.header.year.yearNum = document.createElement('span');
	date_picker.domElem.header.year.nextBtn = document.createElement('button');
	date_picker.domElem.header.confirmBtn = document.createElement('button');
	date_picker.domElem.monthDisplay = document.createElement('div');
	date_picker.domElem.monthDisplay.prevBtn = document.createElement('button');
	date_picker.domElem.monthDisplay.monthNum = document.createElement('span');
	date_picker.domElem.monthDisplay.prevBtn = document.createElement('button');
	date_picker.domElem.dateDisplay = document.createElement('table');
	// DOM 固定内容填充
	date_picker.domElem.header.year.prevBtn.innerHTML = '<i class="fa fa-angle-left"></i>';
	date_picker.domElem.header.year.nextBtn.innerHTML = '<i class="fa fa-angle-right"></i>';
	date_picker.domElem.header.confirmBtn.innerHTML = 'OK';
	// DOM 样式处理
	date_picker.domElem.className += 'date-picker';
	date_picker.domElem.style.position = 'absolute';
	date_picker.domElem.header.className += 'calendar-head';
	date_picker.domElem.header.year.className += 'year-display';
	date_picker.domElem.header.confirmBtn.className += 'confirm-btn';
	date_picker.domElem.monthDisplay.className += 'month-display';
}

// 生成日历
date_picker.createDate.createYear = function(){
	date_picker.domElem.header.year.yearNum.innerHTML = date_picker.current.getFullYear();
};
date_picker.createDate.createMonth = function(){
	// var monthsName = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
	var monthsName = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
	var month = date_picker.current.getMonth();
	if (month > 0) {
		date_picker.domElem.monthDisplay.prevBtn.innerHTML = monthsName[month - 1];
	}else{
		date_picker.domElem.monthDisplay.prevBtn.innerHTML = monthsName[11];
	}
	date_picker.domElem.monthDisplay.monthNum.innerHTML = monthsName[month];
	if (month < 11) {
		date_picker.domElem.monthDisplay.nextBtn.innerHTML = monthsName[month + 1];
	}else{
		date_picker.domElem.monthDisplay.nextBtn.innerHTML = monthsName[0];
	}
};
date_picker.createDate.createDate = function(){
	// 计算每月天数
	var getDaysOfMonth = function(year, month) {
		month += 1;
		if (month == 2) {
			if ( (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ) {
				return 29;
			}else{
				return 28;
			}
		}else{
			var bigMonth = [1,3,5,7,8,10,12];
			var littleMonth = [4,6,9,11];
			for(var m in bigMonth){
				if (month == bigMonth[m]) {
					return 31;
				}
			}
			for(m in littleMonth){
				if (month == littleMonth[m]) {
					return 30;
				}
			}
		}
	};
	// 生成星期
	var thead = document.createElement('thead');
	var theadTr = document.createElement('tr');
	// var daysName = ['一', '二', '三', '四', '五', '六', '日'];
	var daysName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	for (var k = 0; k <= 6; k++) {
		var theadTd = document.createElement('td');
		theadTd.innerHTML = daysName[k];
		theadTr.appendChild(theadTd); 
	}
	thead.appendChild(theadTr);
	// 生成日期
	var cyear = date_picker.current.getFullYear();
	var cmonth = date_picker.current.getMonth();
	var tbody = document.createElement('tbody');
	var date = new Date(cyear, cmonth, 1);
	var day = date.getDay();
	var days = getDaysOfMonth(cyear, cmonth);
	var tmp = Math.floor((days + day) / 7);
	var rows = (days + day) % 7 === 0 ? tmp : (tmp + 1);
	var d = 1;
	// 循环行
	for (var i = 1; i<= rows; i++){
		var tr = document.createElement('tr');
		// 循环列
		for (var j = 1; j <= 7; j++){
			var td = document.createElement('td');
			// 超过最大天数赋空
			if(d > days){
				td.innerHTML = '';
				tr.appendChild(td);
				continue;
			}
			var dateBtn;
			if (i == 1) {
				if (j >= day + 1) {
					dateBtn = document.createElement('button');
					dateBtn.innerHTML = d < 10 ? '0' + d : d;
					dateBtn.className += 'date-btn';
					tmpDate = new Date();
					if(currentYear == tmpDate.getFullYear() && currentMonth == tmpDate.getMonth() && d == tmpDate.getDate()){
						dateBtn.className += ' current-date';
					}
					td.appendChild(dateBtn);
					d++;
				}else{
					td.innerHTML = '';
				}
			}else{
				dateBtn = document.createElement('button');
				dateBtn.innerHTML = d < 10 ? '0' + d : d;
				dateBtn.className += 'date-btn';
				if(currentYear == tmpDate.getFullYear() && currentMonth == tmpDate.getMonth() && d == tmpDate.getDate()){
					dateBtn.className += ' current-date';
				}
				td.appendChild(dateBtn);
				d++;
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	date_picker.domElem.dateDisplay.appendChild(thead);
	date_picker.domElem.dateDisplay.appendChild(tbody);
	date_picker.event.selectDate();
};

// 效果
date_picker.cards = document.createElement('div');
date_picker.effect  = {};
date_picker.effect.createCards = function(){
	for (i = 0; i <= 2; i++){
		var card = document.createElement('div');
		card.className += 'date-card';
		date_picker.cards.appendChild(card);
	}
};
date_picker.effect.cardsInit = function(){
	var cards = date_picker.cards.childNodes;
	cards[0].id = 'currentCard';
	for (var i = 0; i < cards.length; i++) {
		cards[i].style.width = (290 - i*10) + 'px';
		cards[i].style.left = i*5 + 'px';
		cards[i].style.top = i*5 + 'px';
		cards[i].style.zIndex = 999 - i;
		if (i === 0) {
			cards[i].style.backgroundColor = 'rgba(255,255,255,0.95)';
		}else{
			cards[i].style.backgroundColor = 'rgba(255,255,255,0.9)';
		}
	}
}
date_picker.effect.cardsNext = function(count, clickedBtn, targetTrigger){
	clickedBtn.disabled = true;
}

// 组合DOM
date_picker.combineDom = function(){
	//组合头部
	date_picker.domElem.header.year.appendChild(this.prevBtn);
	date_picker.domElem.header.year.appendChild(this.yearNum);
	date_picker.domElem.header.year.appendChild(this.nextBtn);
	date_picker.domElem.header.appendChild(this.year);
	date_picker.domElem.header.appendChild(this.confirmBtn);
	// 组合月份
	date_picker.domElem.monthDisplay.appendChild(this.prevBtn);
	date_picker.domElem.monthDisplay.appendChild(this.monthNum);
	date_picker.domElem.monthDisplay.appendChild(this.nextBtn);
	//全部组合
	date_picker.domElem.appendChild(this.header);
	date_picker.domElem.appendChild(this.monthDisplay);
	date_picker.domElem.appendChild(this.dateDisplay);
};


// DOM 固定事件绑定
date_picker.event.prevYear(targetTrigger);
date_picker.event.nextYear(targetTrigger);
date_picker.event.prevMonth(targetTrigger);
date_picker.event.nextMonth(targetTrigger);
date_picker.event.confirmResult(targetTrigger);


// 特效
date_picker.effect.cardsNext = function(count,clickedBtn,targetTrigger){
		clickedBtn.disabled = true;
		var cards = $('.date-card');
		var goObj = $(cards[0]);
		goObj.addClass('card_anim1');
		goObj.css('left','-50px');
		goObj.css('opacity','0');
		var removeGoObj = function(){
			goObj.remove();
			var newCard = document.createElement('div');
			newCard.setAttribute('class','date-card');
			var cards = $('.date-card');
			$(cards[cards.length - 1]).after(newCard);
			cards = $('.date-card');
			for (var i = cards.length - 1; i >= 0; i--) {
				$(cards[i]).addClass('card_anim2');
			}
			date_picker.effect.cardsInit();
			date_picker.createData(date_picker.current, document.getElementById('currentCard'));
			date_picker.event.prevMonth(targetTrigger);
			date_picker.event.nextMonth(targetTrigger);
			date_picker.event.prevYear(targetTrigger);
			date_picker.event.nextYear(targetTrigger);
			date_picker.event.confirmResult(targetTrigger);
			clickedBtn.disabled = false;
		};
		setTimeout(removeGoObj,400);
	};
date_picker.effect.cardsPrev = function(count,clickedBtn,targetTrigger){
		clickedBtn.disabled = true;
		var cards = $('.date-card');
		for (var i = cards.length - 1; i >= 0; i--) {
			$(cards[i]).addClass('card_anim2');
		}
		var goObj = $(cards[cards.length-1]);
		goObj.remove();
		cards = $('.date-card');
		var oldCards = cards[0];
		oldCards.removeAttribute('id');
		for (var j = 0; j < cards.length; j++) {
			cards[j].style.width = (280 - j*10) + 'px';
			cards[j].style.left = (j+1)*5 + 'px';
			cards[j].style.top = (j+1)*5 + 'px';
			cards[j].style.zIndex = 998 - j;
			cards[j].style.backgroundColor = 'rgba(255,255,255,0.9)';
		}
		var addNewCard = function(){
			var newCard = document.createElement('div');
			newCard.id = 'currentCard';
			date_picker.createData(date_picker.current, newCard);
			newCard.setAttribute('class','date-card card_anim2');
			newCard.style.width = '290px';
			newCard.style.backgroundColor = 'rgba(255,255,255,0.95)';
			newCard.style.zIndex = '999';
			newCard.style.left = '-50px';
			newCard.style.opacity = 0;
			$(cards[0]).before(newCard);
			date_picker.event.prevMonth(targetTrigger);
			date_picker.event.prevMonth(targetTrigger);
			date_picker.event.nextMonth(targetTrigger);
			date_picker.event.prevYear(targetTrigger);
			date_picker.event.nextYear(targetTrigger);
			date_picker.event.confirmResult(targetTrigger);
			var anim = function(){
				newCard.style.left = '0';
				newCard.style.opacity = 1;
				oldCards.innerHTML = '';
			};
			setTimeout(anim,20);
			clickedBtn.disabled = false;
		};
		setTimeout(addNewCard,200);
	};

// 事件
date_picker.event = {};
date_picker.event.prevMonth = function(targetTrigger){
	var prevMonthBtn = document.getElementById('prevMonthBtn');
	prevMonthBtn.addEventListener('click', function(e){
		if(date_picker.current.getMonth() == 1){
			var newYear = date_picker.current.getFullYear() - 1;
			date_picker.current.setFullYear(newYear,11,1);
		}else{
			date_picker.current.setMonth(date_picker.current.getMonth()-1,1);
		}
		var clickedBtn = e.target;
		date_picker.effect.cardsPrev(1,clickedBtn,targetTrigger);
	});
};
date_picker.event.nextMonth = function(targetTrigger){
	var nextMonthBtn = document.getElementById('nextMonthBtn');
	nextMonthBtn.addEventListener('click', function(e){
		if (date_picker.current.getMonth() == 11) {
			var newYear = date_picker.current.getFullYear() + 1;
			date_picker.current.setFullYear(newYear,0,1);
		}else{
			date_picker.current.setMonth(date_picker.current.getMonth()+1,1);
		}
		var clickedBtn = e.target;
		date_picker.effect.cardsNext(1,clickedBtn,targetTrigger);
	});
};
date_picker.event.prevYear = function(targetTrigger){
	date_picker.domElem.header.year.prevBtn.addEventListener('click', function(e){
		var newYear = date_picker.current.getFullYear() - 1;
		date_picker.current.setFullYear(newYear);
		var clickedBtn = e.target;
		date_picker.effect.cardsPrev(12,clickedBtn,targetTrigger);
	});
};
date_picker.event.nextYear = function(targetTrigger){
	var nextYearBtn = document.getElementById('nextYearBtn');
	nextYearBtn.addEventListener('click', function(e){
		var newYear = date_picker.current.getFullYear() + 1;
		date_picker.current.setFullYear(newYear);
		var clickedBtn = e.target;
		date_picker.effect.cardsNext(12,clickedBtn,targetTrigger);
	});
};
date_picker.event.selectDate = function(){
	var dateBtns = $('.date-btn');
	var clickHandler = function(e){
		$('.date-picker .selected').removeClass('selected');
		var clickedBtn = e.target;
		var targetDate = parseInt(clickedBtn.innerHTML);
		date_picker.result = date_picker.current;
		date_picker.result.setDate(targetDate);
		clickedBtn.className += ' selected';
	};
	for (var i = dateBtns.length - 1; i >= 0; i--) {
		dateBtns[i].addEventListener('click', clickHandler);
	}
};
date_picker.event.confirmResult = function(targetTrigger){
	var confirmBtn = document.getElementById('confirmBtn');
	confirmBtn.addEventListener('click', function(e){
		var cyear,cmonth,cdate;
		cyear = date_picker.result.getFullYear();
		cmonth = date_picker.result.getMonth() < 9 ? '0' + (date_picker.result.getMonth() + 1) : date_picker.result.getMonth() + 1;
		cdate = date_picker.result.getDate() < 10 ? '0' + date_picker.result.getDate() : date_picker.result.getDate();
		targetTrigger[0].value = cyear + '-' + cmonth + '-' + cdate;
		$(targetTrigger[0]).change();
		var body = document.getElementsByTagName('body');
		body[0].removeChild(date_picker.container);
		date_picker.container.innerHTML = '';
	});
};

date_picker.init = function(targetTrigger){
	targetTrigger[0].addEventListener('click', function(e){
		date_picker.createCards();
		$('body').append(date_picker.container);
		var triggerPosition = targetTrigger.offset();
		date_picker.container.style.left = triggerPosition.left + (targetTrigger[0].clientWidth - 290)/2 + 'px';
		date_picker.container.style.top = triggerPosition.top - (250 - targetTrigger[0].clientHeight)/2 + 'px';
		date_picker.effect.cardsInit();
		date_picker.createData(date_picker.current, document.getElementById('currentCard'));
		date_picker.event.confirmResult(targetTrigger);
	});
};