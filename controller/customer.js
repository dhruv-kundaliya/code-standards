const fileSystem = require('fs')
const json2xls = require('json2xls')
/**
 * function that give age of customer
 * @param {String} dateOfBirth 
 * @returns {Number} age
 */
function getAge(dateOfBirth) 
{
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
}
/**
 * function that write customer data in excel 
 */
async function writeDataInExcel(){
    const customerData = fileSystem.readFileSync('jsons/json.json')
       const data = JSON.parse(customerData)
       const customerArray = []
       for (let i = 0; i < data.length; i++) {
        if (!data[i].name.last) {
            data[i].name.last = " "
        }
        const customerDtailInExcel = {
            FirstName : data[i].name.first,
            LastName : data[i].name.last,
            email : data[i].email,
            age : getAge(data[i].dateOfBirth)
        }
       // console.log(customerDtailInExcel.age)
        customerArray.push(customerDtailInExcel)
       }
       let xls = json2xls(customerArray);
       const filename = 'customers details.xls'
       fs.writeFileSync(filename, xls, "binary", (err) => {
        if (err) {
          console.log("writeFileSync :", err);
        }
        console.log(filename + " file is saved!");
      });
}

module.exports = { writeDataInExcel }





  