// FINAL SPRINT
// Author: Joseph Flores
// Date: December 21, 2023


// FETCH and READ the JSON file data.json
fetch('./data.json')
.then(response => response.json())
.then(data => {
  let output = '<pre>ID'.padEnd(16, ' ') + 'NAME'.padEnd(25, ' ') + 'AMOUNT'.padEnd(9, ' ') + 'PROGRESS'.padEnd(12, ' ') + 'PAY AMT'.padEnd(11, ' ') + 'BALANCE'.padEnd(13, ' ') + 'STATUS\n';

  data.forEach(client => {      
    let connum = pad1(client.connum.toString(), 10);
    let fullname = pad1((client.fname + ' ' + client.lname).substring(0, 20), 20);
    let conamt = pad2(parseFloat(client.conamt).toFixed(2), 10);
    let status = pad1(client.status, 8);
    let payamt = pad2(parseFloat(client.payamt).toFixed(2), 10);
    let total = pad2(parseFloat(client.total).toFixed(2), 10);
    let totstat = pad2(paystat(total).toString(), 11);  

    output += `${connum} ${fullname} ${conamt}   ${status} ${payamt} ${total} ${totstat}\n`;
  });
  output += '</pre>';
  // printing the output to the html page
  document.getElementById('output').innerHTML = output;
  document.getElementById('totalPaid').innerHTML = TotalAmtPaid(data);
  document.getElementById('numGold').innerHTML = GoldMem(data);
  // printing the output to the console
  console.log(output.replace(/<pre>|<\/pre>|<h3>|<\/h3>/g, ''));
  console.log(TotalAmtPaid(data));
  console.log(GoldMem(data));

})
.catch(error => {
  console.error(error);
});

// function declaring if the client is a gold member or not
// gold members are the ones who have paid more than $10,000

function paystat(amt) {
  if(amt >= 10000) return 'Gold Member'
  else return '---'
}

// functions to pad a string with spaces

function pad1(str, len) {
  return str.padEnd(len, ' ');
}

function pad2(str, len) {
  return str.padStart(len, ' ');
}
 
// function to get the total amount paid by all clients
function TotalAmtPaid(data) {
  let total = data.reduce((sum, client) => sum + parseFloat(client.payamt), 0);
  return `The total amount paid by all clients is $${total.toFixed(2)}.`;
}

// function to get the number of gold members
function GoldMem(data) {
  let goldMembers = data.filter(client => parseFloat(client.total) >= 10000).length;
  return `The number of gold members is ${goldMembers}.`;
}
