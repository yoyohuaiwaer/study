function getFullTime(wrapId){
	id= wrapId;
	setFouce();
}
function setFouce(){
	var startChild = $(id).find('#startTime').children();
	var endChild = $(id).find('#endTime').children();
	var sLength = startChild.length;
	var eLength = endChild.length;
	for( var i=0; i<sLength; i++ ) {     
	    startChild[i].i = i; 
		var isSFocus=$(startChild).eq(startChild[i].i).is(":focus");  
	    if($(startChild).eq(startChild[i].i).val()=='' && !isSFocus)
	    {
	    	$(startChild).eq(startChild[i].i).focus();
	    	return ;
	    }
    } 
    
    for( var j=0; j<eLength; j++ ) {     
	    endChild[j].i = j; 
		var isEFocus=$(endChild).eq(startChild[j].i).is(":focus");  
	    if($(endChild).eq(endChild[j].i).val()=='' && !isEFocus)
	    {
	    	$(endChild).eq(endChild[j].i).focus();
	    	return ;
	    }
    }
}

function  showValue(e){
	var str = '';
	if(str == e.value)
	{
		return false;
	}
	str = e.value;
	if(parseInt(e.value)<e.max && parseInt(e.value)>=e.min && (e.value).length>=2){
		
 		var isFocus=$(e).is(":focus");
 		if(isFocus){
 			setFouce();
 		}
 	}
}
