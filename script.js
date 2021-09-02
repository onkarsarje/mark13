var dateInput = document.querySelector("#bday-input");
var checkButton =document.querySelector("#show-btn");
var resultDispaly = document.querySelector("#result");


function reverseStr(str){
    var listOfChars =str.split("");
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');

    return reversedStr;
}

function isPalindrome(str){
    var reverse = reverseStr(str);
     
    return str===reverse;
}

function convertDateToStr(date){
    var dateStr = {day: "", month:"", year:""}
     
    if(date.day < 10){
        dateStr.day = "0" + date.day;
    }else{
        dateStr.day = date.day.toString();
    }
    
    if(date.month < 10){
        dateStr.month = "0" + date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormat(date){
    var dateStr =convertDateToStr(date);

    var ddmmyyyy = dateStr.day+ dateStr.month+ dateStr.year; 
    var mmddyyyy = dateStr.month+ dateStr.day+ dateStr.year; 
    var yyyymmdd = dateStr.year+ dateStr.month+ dateStr.day;
    var ddmmyy = dateStr.day+ dateStr.month+ dateStr.year.slice(-2);
    var mmddyy = dateStr.month+ dateStr.day+ dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2)+ dateStr.month+ dateStr.day;

    return [ddmmyyyy,  mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormat(date);

    var flag =false;

    for(var i=0; i<listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag=true;
            break;
        }
    }

    return flag;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day= date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth= [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month++;
            }
        }else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }else{
        if(day>daysInMonth[month-1]){
            day =1;
            month++;
        }
    }

    if(month>12){
        month=1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome =checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate= getNextDate(nextDate);
    }

    return[ctr, nextDate];
}

function getPreviousDate(date){
    var day = date.day - 1;
    var month= date.month;
    var year= date.year;

    var daysInMonth= [31,28,31,30,31,30,31,31,30,31,30,31];
                    //1  2  3  4  5  6  7  8  9  10 11 12
    if (month === 3){
        if(isLeapYear(year)){
            if(day<2){
                day=29;
                month--;
            }
        }else{
            if(day<2){
                day=28;
                month--;
            }
        }
    }else if (month === 2 || month === 4 || month === 6 || month === 8 || month === 9 || month === 11){
        if(day<2){
            day=31;
            month--;
        }
                
    }else if (month === 5 || month === 7 || month === 10 || month === 12){
        if(day<2){
            day = 30;
            month--;
        }

    }else{ //for January
        day=31;
        month=12;
        year--;
    }
    
    return {
        day: day,
        month: month,
        year: year
    };
}

function getPreviousPalindromeDate(date){
    var ctr=0;
    var prevDate= getPreviousDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(prevDate);
        if(isPalindrome){
            break;
        }
        prevDate =getPreviousDate(prevDate);
    }
    return[ctr, prevDate];
}

function clickHandler(){
    var bdayStr = dateInput.value;

    if(bdayStr !== ""){
       var listOfDate = bdayStr.split('-');
       var date = {
           day: Number(listOfDate[2]),
           month: Number(listOfDate[1]),
           year: Number(listOfDate[0])
       };
       var isPalindrome = checkPalindromeForAllDateFormats(date);

      if (isPalindrome){
          resultDispaly.innerText="Yea! Your BirthDay is a Palindrome!!🥳🚀"
      }else{
    
        var[ctr, nextDate]= getNextPalindromeDate(date);
          resultDispaly.innerText=`The Next Palindrome date is ${nextDate.day} -${nextDate.month}-${nextDate.year} you missed it by ${ctr} days!`;
      }

    }else{
        resultDispaly.innerText="Enter Your Birth Date.";
    }
}

checkButton.addEventListener("click", clickHandler)
