const path = require("path")
const fs = require('fs')
const moment = requre('moment')
const multer = require("multer")

multer({dest: 'public/'}).single('file')
const storage = multer.diskStorage({
	destination: path.join(__dirname, "../uploads"),
	filename: function(req, file, cb) {
		cb(null, file.originalname + "_" + Date.now())
	}
})

const upload = multer({ storage: storage }).single("file")
const csv = require("csvtojson")


exports.jsonToCSV = async (json, columnHeading) => {
    let csvData = ''
    csvData += columnHeading
    json.forEach(response => {
        let row = ""
        for (const key in response) {
                let value = response[key]
                if (value) {
                    value = `\"${value}\"`
                } else { value = '' }
                
                row += `${value},`
        }
        row = row.slice(0, -1)
        row += '\r\n'
        csvData += row
    })
    return csvData
}

exports.writeContentToFile = async (filename, content) => {
    const filepath = `uploads/${filename}`
    return new Promise((resolve, reject)=>{
        fs.writeFile(filepath, content, (err) => {
            if (err) reject(err) ;

            resolve(filepath)
        });
    })
}

//converts the date format to dd-mm-yyyy
exports.convertDate1 = date => {
	let newDate = new Date(date)
	let year = newDate.getFullYear()
	
	let month = (1 + newDate.getMonth()).toString()
	month = month.length > 1 ? month : "0" + month
	
	let day = newDate.getDate().toString()
	day = day.length > 1 ? day : "0" + day
	
	return day + "-" + month + "-" + year
}

//converts the date format from dd-mm-yyyy to YYYY-mm-dd
function convertDate2(ddmmyyyy) {
	if (moment(ddmmyyyy, "DDMMYYYY").isValid()) {
		let stringArray = ddmmyyyy.split("-")
		let result = moment().format(
			stringArray[2] + "-" + stringArray[1] + "-" + stringArray[0]
		)
		//console.log("Converted date from " + ddmmyyyy + " to " + result)
		return result
	} else {
		return new Error("Invalid Date")
	}
}
