
///////////////////////////////
// Helper function to format the current date
function formatDate()
{
	var date = new Date();
	var day = date.getDay();
	var month = date.getMonth();
	switch(day)
	{
		case 0:
			day = "Sun";
			break;
		case 1:
			day = "Mon";
			break;
		case 2:
			day = "Tues";
			break;
		case 3:
			day = "Wed";
			break;
		case 4:
			day = "Thur";
			break;
		case 5:
			day = "Fri";
			break;
		case 6:
			day = "Sat";
			break;
	}

	switch(month)
	{
		case 0:
			month = "Jan";
			break;
		case 1:
			month = "Feb";
			break;
		case 2:
			month = "Mar";
			break;
		case 3:
			month = "Apr";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "Jun";
			break;
		case 6:
			month = "Jul";
			break;
		case 7:
			month = "Aug";
			break;
		case 8:
			month = "Sept";
			break;
		case 9:
			month = "Oct";
			break;
		case 10:
			month = "Nov";
			break;
		case 11:
			month = "Dec";
			break;
	}



	var year = 1900 + date.getYear();

	return day + " " + month + " " + date.getDate() + ", " + year;
}