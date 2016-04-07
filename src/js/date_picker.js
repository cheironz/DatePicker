var date_picker = {};
// 日期存储
date_picker.current = new Date();
// 容器创建
date_picker.container = document.createElement('div');
date_picker.container.className += 'date-picker';
date_picker.container.style.position = 'absolute';
// 卡片创建
date_picker.createCards = function(){
	for (i = 0; i <= 2; i++){
		var card = document.createElement('div');
		card.className += 'date-card';
		date_picker.container.appendChild(card);
	}
};

// 特效
date_picker.effect  = {};
date_picker.effect.cardsInit = function(){
		var cards = $('.date-card');
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
	};
date_picker.effect.cardsNext = function(count,clickedBtn){
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
			date_picker.event.prevMonth();
			date_picker.event.nextMonth();
			date_picker.event.prevYear();
			date_picker.event.nextYear();
			clickedBtn.disabled = false;
		};
		setTimeout(removeGoObj,400);
	};
date_picker.effect.cardsPrev = function(count,clickedBtn){
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
			date_picker.event.prevMonth();
			date_picker.event.nextMonth();
			date_picker.event.prevYear();
			date_picker.event.nextYear();
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

// 生成日历
date_picker.createData = function(nowDate, container){
	if (nowDate) {
		var currentYear = nowDate.getFullYear();
		var currentMonth = nowDate.getMonth();
		var currentDate = nowDate.getDate();
		var currentDay = nowDate.getDay();
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
		var showCalender = function(year, month, container) {
			// 显示年份
			var yearDisplay = document.createElement('div');
			yearDisplay.className += 'year-display';
			var prevYearBtn = document.createElement('button');
			prevYearBtn.innerHTML = '-';
			prevYearBtn.id = 'prevYearBtn';
			var yearNumber = document.createElement('span');
			yearNumber.innerHTML = year;
			var nextYearBtn = document.createElement('button');
			nextYearBtn.innerHTML = '+';
			nextYearBtn.id = 'nextYearBtn';
			yearDisplay.appendChild(prevYearBtn);
			yearDisplay.appendChild(yearNumber);
			yearDisplay.appendChild(nextYearBtn);
			// 显示确认按钮
			var confirmBtn = document.createElement('button');
			confirmBtn.id = 'confirmBtn';
			confirmBtn.className += 'confirm-btn';
			confirmBtn.innerHTML = 'OK';
			// 创建标题头
			var calendarHead = document.createElement('div');
			calendarHead.className += 'calendar-head';
			calendarHead.appendChild(yearDisplay);
			calendarHead.appendChild(confirmBtn);
			// 添加到容器
			container.appendChild(calendarHead);

			// 显示月份
			// var monthsName = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
			var monthsName = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
			var prevMonthBtn = document.createElement('button');
			if (month > 0) {
				prevMonthBtn.innerHTML = monthsName[month - 1];
			}else{
				prevMonthBtn.innerHTML = monthsName[11];
			}
			prevMonthBtn.id = 'prevMonthBtn';
			var MonthNumber = document.createElement('span');
			MonthNumber.innerHTML = monthsName[month];
			var nextMonthBtn = document.createElement('button');
			if (month < 11) {
				nextMonthBtn.innerHTML = monthsName[month + 1];
			}else{
				nextMonthBtn.innerHTML = monthsName[0];
			}
			nextMonthBtn.id = 'nextMonthBtn';
			// 创建月份容器
			var monthDisplay = document.createElement('div');
			monthDisplay.className += 'month-display';
			monthDisplay.appendChild(prevMonthBtn);
			monthDisplay.appendChild(MonthNumber);
			monthDisplay.appendChild(nextMonthBtn);
			// 添加到容器
			container.appendChild(monthDisplay);
			

			// 显示日子
			var table = document.createElement('table');
			var thead = document.createElement('thead');
			var theadTr = document.createElement('tr');
			thead.appendChild(theadTr);
			// var daysName = ['一', '二', '三', '四', '五', '六', '日'];
			var daysName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
			for (var k = 0; k <= 6; k++) {
				var theadTd = document.createElement('td');
				theadTd.innerHTML = daysName[k];
				theadTr.appendChild(theadTd); 
			}
			var tbody = document.createElement('tbody');
			table.appendChild(thead);
			table.appendChild(tbody);

			var date = new Date(year, month, 1);
			var day = date.getDay();
			var days = getDaysOfMonth(year, month);
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
			container.appendChild(table);
		};
		showCalender(currentYear, currentMonth, container);
		date_picker.event.selectDate();
	}else{
		console.log('no now date input!');
	}
};

// 事件
date_picker.event = {};
date_picker.event.prevMonth = function(){
	var prevMonthBtn = document.getElementById('prevMonthBtn');
	prevMonthBtn.addEventListener('click', function(e){
		if(date_picker.current.getMonth() == 1){
			var newYear = date_picker.current.getFullYear() - 1;
			date_picker.current.setFullYear(newYear,11,1);
		}else{
			date_picker.current.setMonth(date_picker.current.getMonth()-1,1);
		}
		var clickedBtn = e.target;
		date_picker.effect.cardsPrev(1,clickedBtn);
	});
};
date_picker.event.nextMonth = function(){
	var nextMonthBtn = document.getElementById('nextMonthBtn');
	nextMonthBtn.addEventListener('click', function(e){
		if (date_picker.current.getMonth() == 11) {
			var newYear = date_picker.current.getFullYear() + 1;
			date_picker.current.setFullYear(newYear,0,1);
		}else{
			date_picker.current.setMonth(date_picker.current.getMonth()+1,1);
		}
		var clickedBtn = e.target;
		date_picker.effect.cardsNext(1,clickedBtn);
	});
};
date_picker.event.prevYear = function(){
	var prevYearBtn = document.getElementById('prevYearBtn');
	prevYearBtn.addEventListener('click', function(e){
		var newYear = date_picker.current.getFullYear() - 1;
		date_picker.current.setFullYear(newYear);
		var clickedBtn = e.target;
		date_picker.effect.cardsPrev(12,clickedBtn);
	});
};
date_picker.event.nextYear = function(){
	var nextYearBtn = document.getElementById('nextYearBtn');
	nextYearBtn.addEventListener('click', function(e){
		var newYear = date_picker.current.getFullYear() + 1;
		date_picker.current.setFullYear(newYear);
		var clickedBtn = e.target;
		date_picker.effect.cardsNext(12,clickedBtn);
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
		date_picker.event.prevMonth();
		date_picker.event.nextMonth();
		date_picker.event.prevYear();
		date_picker.event.nextYear();
		date_picker.event.confirmResult(targetTrigger);
	});
};