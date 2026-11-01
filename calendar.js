/* Four-week months. Historical years; release months use documented regional anchors. */
(function(root){
 'use strict';
 const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 const startYear=1981,startMonth=8,weeksPerYear=48,normalWeekMs=4000;
 function at(week){const n=week-1+(startMonth-1)*4;return {year:startYear+Math.floor(n/48),month:Math.floor(n%48/4)+1,week:n%4+1,studioYear:Math.floor((week-1)/48)+1};}
 function weekOf(year,month=1,week=1){return ((year-startYear)*12+month-startMonth)*4+week;}
 function format(week){const d=at(week);return `${months[d.month-1]} ${d.year} · W${d.week}`;}
 // [year, month, reference region, modeled retirement year]. Retirement is gameplay data.
 const launches={slate:[1981,8,'US',1990],byte:[1982,8,'US',1994],nova:[1985,10,'North America',1995],moss:[1989,4,'Japan',2003],stride:[1988,10,'Japan',1997],vector:[1984,1,'Open PC era (modeled)',2200],super:[1990,11,'Japan / Super Famicom',2003],pulse:[1994,12,'Japan',2006],n64:[1996,6,'Japan',2002],palcolor:[1998,10,'Japan',2003],dream:[1998,11,'Japan',2001],prism:[2000,3,'Japan',2013],xcube:[2001,11,'North America',2009],lunchbox:[2001,9,'Japan',2007],dual:[2004,11,'North America',2013],portable:[2004,12,'Japan',2014],revolve:[2005,11,'North America',2016],wave:[2006,11,'North America',2013],play3:[2006,11,'Japan',2017],play4:[2013,11,'North America',2030],oneup:[2013,11,'Initial launch markets',2021],orbit:[2017,3,'Worldwide',2030],play5:[2020,11,'First launch markets',2200],series:[2020,11,'Worldwide',2200]};
 const api={months,startYear,startMonth,weeksPerYear,normalWeekMs,at,weekOf,format,launches,campaignWeek:48*40+1};if(typeof module!=='undefined')module.exports=api;root.StudioCalendar=api;
})(globalThis);
