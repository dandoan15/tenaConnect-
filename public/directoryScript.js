/*function init()
{
	document.getElementById("home").style.display = "block";
	document.getElementById("tenantList").style.display = "none";
	document.getElementById("onePerson").style.display = "none";
}

function getAll() 
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (xhttp.readyState == 4 && xhttp.status == 200) 
		{
			var list = JSON.parse(xhttp.responseText);
		    tenantTable(list);
		}
	};
	xhttp.open("GET", "http://localhost/listTenants/", true);
	xhttp.send();
}

function getSpecific(id) 
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (xhttp.readyState == 4 && xhttp.status == 200) 
		{
		    var list = JSON.parse(xhttp.responseText);
		    tenantInfo(list);
		}
	};
	xhttp.open("GET", "http://localhost/listTenants/" + id, true);
	xhttp.send();
}

function addNew(form) 
{
	var input = new FormData(form);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (xhttp.readyState == 4 && xhttp.status == 200) 
		{
			document.getElementById("form").innerHTML = "Submition Complete!";
		}
	};
	xhttp.open("POST", "http://localhost/myaction/", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(input);
}

function tenantTable(data)
{
	document.getElementById("home").style.display = "none";
	document.getElementById("tenantList").style.display = "block";
	document.getElementById("onePerson").style.display = "none";
	var newElement = '<tr><th class="dataRow">Room Number</th><th class="dataRow">TenantID</th></tr>';
	for (var index = 0; index < data.length; index++)
	{
		newElement += '<tr><td class="dataRow">' + data[index].Room + '</td>';
		newElement += '<td class="dataRow querySpecific" onclick="getSpecific(' + data[index].TenantID + ')">' + data[index].TenantID + '</td></tr>';
	}
	document.getElementById("tenantTbl").innerHTML = newElement;
}

function tenantInfo(data)
{
	document.getElementById("home").style.display = "none";
	document.getElementById("tenantList").style.display = "none";
	document.getElementById("onePerson").style.display = "block";

	var newTitle = 'ID: '+ data[0].TenantID;
	document.getElementById("title").innerHTML = newTitle;

	var newElement = '<tr><td class="dataRow">' + data[0].FName + '</td>';
	newElement += '<td class="dataRow">' + data[0].LName + '</td></tr>';
	newElement += '<tr><td class="dataRow">' + data[0].PhoneNum + '</td>';
	newElement += '<td class="dataRow">' + data[0].Email + '</td></tr>';

	document.getElementById("singleTbl").innerHTML = newElement;
}*/