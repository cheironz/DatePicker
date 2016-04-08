(function ($){
	$.fn.datePicker = function(){
		this.each(function(){
			var targetTrigger = this;
			var init = function(targetTrigger){
				targetTrigger.addEventListener('click', function(e){
					var DatePicker = {};
					var DatePickerBuilder = function(){
						// 日期存储
						if (targetTrigger.value) {
							DatePicker.current = new Date(targetTrigger.value);
							DatePicker.result = new Date(targetTrigger.value);
						}else{
							DatePicker.current = new Date();
							DatePicker.result = new Date();
						}
						// 生成 DOM
						DatePicker.createDom = function(){
							// DOM创建
							DatePicker.domElem = document.createElement('div');
							DatePicker.domElem.header = document.createElement('div');
							DatePicker.domElem.header.year = document.createElement('div');
							DatePicker.domElem.header.year.prevBtn = document.createElement('button');
							DatePicker.domElem.header.year.yearNum = document.createElement('span');
							DatePicker.domElem.header.year.nextBtn = document.createElement('button');
							DatePicker.domElem.header.confirmBtn = document.createElement('button');
							DatePicker.domElem.monthDisplay = document.createElement('div');
							DatePicker.domElem.monthDisplay.prevBtn = document.createElement('button');
							DatePicker.domElem.monthDisplay.monthNum = document.createElement('span');
							DatePicker.domElem.monthDisplay.nextBtn = document.createElement('button');
							DatePicker.domElem.dateDisplay = document.createElement('table');
							// DOM 固定内容填充
							DatePicker.domElem.header.year.prevBtn.innerHTML = '<i class="fa fa-angle-left"></i>';
							DatePicker.domElem.header.year.nextBtn.innerHTML = '<i class="fa fa-angle-right"></i>';
							DatePicker.domElem.header.confirmBtn.innerHTML = 'OK';
							// DOM 样式处理
							DatePicker.domElem.className += 'date-picker-content';
							DatePicker.domElem.header.className += 'calendar-head';
							DatePicker.domElem.header.year.className += 'year-display';
							DatePicker.domElem.header.confirmBtn.className += 'confirm-btn';
							DatePicker.domElem.monthDisplay.className += 'month-display';
						};
						// 生成日历
						DatePicker.createDate = {};
						DatePicker.createDate.createYear = function(){
							DatePicker.domElem.header.year.yearNum.innerHTML = DatePicker.current.getFullYear();
						};
						DatePicker.createDate.createMonth = function(){
							// var monthsName = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
							var monthsName = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
							var month = DatePicker.current.getMonth();
							if (month > 0) {
								DatePicker.domElem.monthDisplay.prevBtn.innerHTML = monthsName[month - 1];
							}else{
								DatePicker.domElem.monthDisplay.prevBtn.innerHTML = monthsName[11];
							}
							DatePicker.domElem.monthDisplay.monthNum.innerHTML = monthsName[month];
							if (month < 11) {
								DatePicker.domElem.monthDisplay.nextBtn.innerHTML = monthsName[month + 1];
							}else{
								DatePicker.domElem.monthDisplay.nextBtn.innerHTML = monthsName[0];
							}
						};
						DatePicker.createDate.createDate = function(){
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
							var cyear = DatePicker.current.getFullYear();
							var cmonth = DatePicker.current.getMonth();
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
									var currentYear = DatePicker.current.getFullYear();
									var currentMonth = DatePicker.current.getMonth();
									if (i == 1) {
										if (j >= day + 1) {
											dateBtn = document.createElement('button');
											dateBtn.innerHTML = d < 10 ? '0' + d : d;
											dateBtn.className += 'date-btn';
											tmpDate = new Date();
											if(currentYear == tmpDate.getFullYear() && currentMonth == tmpDate.getMonth() && d == tmpDate.getDate()){
												dateBtn.className += ' current-date';
											}
											if(targetTrigger.value){
												if(currentYear == DatePicker.result.getFullYear() && currentMonth == DatePicker.result.getMonth() && d == DatePicker.current.getDate()){
													DatePicker.selectedDateBtn = dateBtn;
													dateBtn.className += ' selected';
												}
											}
											td.appendChild(dateBtn);
											DatePicker.event.selectDate(dateBtn);
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
										if(targetTrigger.value){
											if(currentYear == DatePicker.result.getFullYear() && currentMonth == DatePicker.result.getMonth() && d == DatePicker.current.getDate()){
												DatePicker.selectedDateBtn = dateBtn;
												dateBtn.className += ' selected';
											}
										}
										td.appendChild(dateBtn);
										DatePicker.event.selectDate(dateBtn);
										d++;
									}
									tr.appendChild(td);
								}
								tbody.appendChild(tr);
							}
							DatePicker.domElem.dateDisplay.appendChild(thead);
							DatePicker.domElem.dateDisplay.appendChild(tbody);
						};
						// 效果
						DatePicker.effect  = {};
						DatePicker.effect.cards = document.createElement('div');
						DatePicker.effect.cards.className += 'date-picker-cards';
						DatePicker.effect.createCards = function(){
							for (i = 0; i <= 2; i++){
								var card = document.createElement('div');
								card.className += 'date-card card_anim2';
								DatePicker.effect.cards.appendChild(card);
							}
						};
						DatePicker.effect.cardsInit = function(){
							var cards = DatePicker.effect.cards.childNodes;
							cards[0].id = 'currentCard';
							cards[0].appendChild(DatePicker.domElem);
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
						DatePicker.effect.cardsNext = function(count, clickedBtn){
							clickedBtn.disabled = true;
							var cards = DatePicker.effect.cards.childNodes;
							var goObj = cards[0];
							goObj.className += ' card_anim1';
							goObj.style.left = '-50px';
							goObj.style.opacity = '0';
							var removeGoObj = function(){
								DatePicker.effect.cards.removeChild(goObj);
								var newCard = document.createElement('div');
								newCard.className += 'date-card card_anim2';
								newCard.appendChild(DatePicker.domElem);
								DatePicker.effect.cards.appendChild(newCard);
								DatePicker.effect.cardsInit();
								var tableContent = DatePicker.domElem.dateDisplay.childNodes;
								for (var i = tableContent.length - 1; i >= 0; i--) {
									DatePicker.domElem.dateDisplay.removeChild(tableContent[i]);
								}
								DatePicker.createDate.createYear();
								DatePicker.createDate.createMonth();
								DatePicker.createDate.createDate();
							};
							clickedBtn.disabled = false;
							setTimeout(removeGoObj,400);
						};
						DatePicker.effect.cardsPrev = function(count, clickedBtn){
							clickedBtn.disabled = true;
							var cards = DatePicker.effect.cards.childNodes;
							var goObj = cards[cards.length - 1];
							DatePicker.effect.cards.removeChild(goObj);
							cards[0].removeAttribute('id');
							cards[0].removeChild(cards[0].childNodes[0]);
							for (var i = 0; i < 2; i++) {
								cards[i].style.width = (280 - i*10) + 'px';
								cards[i].style.left = (i+1)*5 + 'px';
								cards[i].style.top = (i+1)*5 + 'px';
								cards[i].style.zIndex = 998 - i;
								cards[i].style.backgroundColor = 'rgba(255,255,255,0.9)';
							}
							var addNewCard = function(){
								var newCard = document.createElement('div');
								newCard.id = 'currentCard';
								var tableContent = DatePicker.domElem.dateDisplay.childNodes;
								for (var i = tableContent.length - 1; i >= 0; i--) {
									DatePicker.domElem.dateDisplay.removeChild(tableContent[i]);
								}
								DatePicker.createDate.createYear();
								DatePicker.createDate.createMonth();
								DatePicker.createDate.createDate();
								newCard.className += 'date-card card_anim2';
								newCard.appendChild(DatePicker.domElem);
								newCard.style.width = '290px';
								newCard.style.backgroundColor = 'rgba(255,255,255,0.95)';
								newCard.style.zIndex = '999';
								newCard.style.left = '-50px';
								newCard.style.opacity = 0;
								DatePicker.effect.cards.insertBefore(newCard, DatePicker.effect.cards.firstChild);
								var anim = function(){
									newCard.style.left = '0';
									newCard.style.opacity = 1;	
								};
								clickedBtn.disabled = false;
								setTimeout(anim, 20);
							};
							setTimeout(addNewCard, 200);

						};
						// 事件绑定
						DatePicker.event = {};
						DatePicker.event.prevYear = function(){
							var prevYearBtn = DatePicker.domElem.header.year.prevBtn;
							prevYearBtn.addEventListener('click', function(e){
								var newYear = DatePicker.current.getFullYear() - 1;
								DatePicker.current.setFullYear(newYear);
								var clickedBtn = e.target;
								DatePicker.effect.cardsPrev(12,clickedBtn);
							});
						};
						DatePicker.event.nextYear = function(){
							var nextYearBtn = DatePicker.domElem.header.year.nextBtn;
							nextYearBtn.addEventListener('click', function(e){
								var newYear = DatePicker.current.getFullYear() + 1;
								DatePicker.current.setFullYear(newYear);
								var clickedBtn = e.target;
								DatePicker.effect.cardsNext(12,clickedBtn);
							});
						};
						DatePicker.event.prevMonth = function(){
							var prevMonthBtn = DatePicker.domElem.monthDisplay.prevBtn;
							prevMonthBtn.addEventListener('click', function(e){
								if(DatePicker.current.getMonth() === 0){
									var newYear = DatePicker.current.getFullYear() - 1;
									DatePicker.current.setFullYear(newYear,11);
								}else{
									DatePicker.current.setMonth(DatePicker.current.getMonth()-1);
								}
								var clickedBtn = e.target;
								DatePicker.effect.cardsPrev(1,clickedBtn);
							});
						};
						DatePicker.event.nextMonth = function(){
							var nextMonthBtn = DatePicker.domElem.monthDisplay.nextBtn;
							nextMonthBtn.addEventListener('click', function(e){
								if (DatePicker.current.getMonth() == 11) {
									var newYear = DatePicker.current.getFullYear() + 1;
									DatePicker.current.setFullYear(newYear,0);
								}else{
									DatePicker.current.setMonth(DatePicker.current.getMonth()+1);
								}
								var clickedBtn = e.target;
								DatePicker.effect.cardsNext(1,clickedBtn);
							});
						};
						DatePicker.event.selectDateHandler = function(e){
							if (DatePicker.selectedDateBtn) {
								$(DatePicker.selectedDateBtn).removeClass('selected');
							}
							var clickedBtn = e.target;
							var targetDate = parseInt(clickedBtn.innerHTML);
							DatePicker.result = DatePicker.current;
							DatePicker.result.setDate(targetDate);
							clickedBtn.className += ' selected';
							DatePicker.selectedDateBtn = clickedBtn;
						};
						DatePicker.event.selectDate = function(dateBtn){
							dateBtn.addEventListener('click', DatePicker.event.selectDateHandler);
						};
						DatePicker.event.confirmResult = function(targetTrigger){
							var confirmBtn = DatePicker.domElem.header.confirmBtn;
							confirmBtn.addEventListener('click', function(e){
								var cyear,cmonth,cdate;
								cyear = DatePicker.result.getFullYear();
								cmonth = DatePicker.result.getMonth() < 9 ? '0' + (DatePicker.result.getMonth() + 1) : DatePicker.result.getMonth() + 1;
								cdate = DatePicker.result.getDate() < 10 ? '0' + DatePicker.result.getDate() : DatePicker.result.getDate();
								targetTrigger.value = cyear + '-' + cmonth + '-' + cdate;
								$(targetTrigger).change();
								var body = document.getElementsByTagName('body');
								body[0].removeChild(DatePicker.container);
							});
						};
						// 组合DOM
						DatePicker.combineDom = function(){
							//组合头部
							DatePicker.domElem.header.year.appendChild(DatePicker.domElem.header.year.prevBtn);
							DatePicker.domElem.header.year.appendChild(DatePicker.domElem.header.year.yearNum);
							DatePicker.domElem.header.year.appendChild(DatePicker.domElem.header.year.nextBtn);
							DatePicker.domElem.header.appendChild(DatePicker.domElem.header.year);
							DatePicker.domElem.header.appendChild(DatePicker.domElem.header.confirmBtn);
							// 组合月份
							DatePicker.domElem.monthDisplay.appendChild(DatePicker.domElem.monthDisplay.prevBtn);
							DatePicker.domElem.monthDisplay.appendChild(DatePicker.domElem.monthDisplay.monthNum);
							DatePicker.domElem.monthDisplay.appendChild(DatePicker.domElem.monthDisplay.nextBtn);
							//全部组合
							DatePicker.domElem.appendChild(DatePicker.domElem.header);
							DatePicker.domElem.appendChild(DatePicker.domElem.monthDisplay);
							DatePicker.domElem.appendChild(DatePicker.domElem.dateDisplay);
						};
					};
					DatePickerBuilder();
					// 生成数据
					DatePicker.createDom();
					DatePicker.createDate.createYear();
					DatePicker.createDate.createMonth();
					DatePicker.createDate.createDate();
					DatePicker.combineDom();
					DatePicker.container = document.createElement('div');
					DatePicker.container.className += 'date-picker';
					// 效果初始化
					DatePicker.effect.createCards();
					DatePicker.effect.cardsInit();
					DatePicker.container.appendChild(DatePicker.effect.cards);
					// 添加到页面
					$('body').append(DatePicker.container);
					var triggerPosition = $(targetTrigger).offset();
					DatePicker.container.style.left = triggerPosition.left + (targetTrigger.clientWidth - 290)/2 + 'px';
					DatePicker.container.style.top = triggerPosition.top - (250 - targetTrigger.clientHeight)/2 + 'px';
					// 事件绑定
					DatePicker.event.prevYear();
					DatePicker.event.nextYear();
					DatePicker.event.prevMonth();
					DatePicker.event.nextMonth();
					DatePicker.event.confirmResult(targetTrigger);
				});
			};
			init(targetTrigger);
		});
	};
})(jQuery);






