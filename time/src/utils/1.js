const date1 = "2025-02-10 21:24:00";
const date2 = new Date();

const msInMinute = 1000 * 60;
const msInHour = msInMinute * 60;
const msInDay = msInHour * 24;

const date = new Date(date1);


const diff = date2 - date;


if (diff > msInDay) {
    console.log("days", Math.floor(diff / msInDay));
} else if (diff < msInHour) {
    console.log("minutes", Math.floor(diff / msInMinute));
} else {
    console.log("hours", Math.floor(diff / msInHour));
}
