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

var date = {
    day:3,
    month:11,
    year:2020
}

console.log(checkPalindromeForAllDateFormats(date));
