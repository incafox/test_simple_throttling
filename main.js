// send a request every 0.05 seconds
//
const axios = require('axios');
const maxNumberRequest = 20;  //reqs per second
const timePeriod = 1;

const delay = ms => new Promise(resolve=> setTimeout(resolve, ms));

async function main(maxNumberReqs, timePeriod) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDgwMDU5NzQsImlzcyI6InBzVFBMU0VPeWdEWmdTOFE2UEswSjlHMlRiV1RFVjZjIn0.-N7hACOlR0X2HteFpF_W1xpzO9LKK-s006tcDBiQFYE';
  const phone = '50200000001';
  const code = 'NTAyMDAwMDAwMDEyOTM5MQo=';
  const body  = {
    "recipient_type": "individual",
    "to": phone,
    "type": "text",
    "text": {
        "body": `Hello, your code is: *${code}*`
    }
  }

  let counter = 0;
  let timePassed = 0;

  while (true) {
    if (timePassed < timePeriod && counter < maxNumberReqs) {
      //send 
      await delay((timePeriod/maxNumberReqs)*1000); // 50 > 0.05 * 1000
      timePassed += new Date();
      const res = axios.post('xxx', body, {headers: {"Authorization": `Bearer ${token}`}});
      counter++;
    }
    if (timePassed >= timePeriod) timePassed = 0;
    if (counter == maxNumberReqs) counter = 0;
  }
}

main(timePeriod, maxNumberRequest);
