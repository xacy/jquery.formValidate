!function ($) {
	$.fn.formValidate = function(options){
		var retorno=true;
		this.each(function(){
			var types={
				text: /^[A-Za-z0-9 ]{3,20}$/,
				mail: /^([\w-]+(?:\.[\w-]+)*)@([\w-]+)\.[a-z]{2,3}(?:(\.[a-z]{2,3})?)$/ ,
				pass: /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/,
				date:/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
				datemd:/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/,
				check: /^[A-Za-z0-9 ]{1,20}$/,
				select: /^[A-Za-z0-9 ]{1,20}$/,
				difdate: "difdat5mh",
				equdate: "equdat"
			};
			/*
			Posibles params: 
				custom regexp
				custom atrbitues
				custom clases
			 */
			var settings = $.extend({
				custom: {lol:"l",lol2:"l2"},
				backgroundColor: "rgba(252,252,252,0.5)",
				logo: "none"
			}, options );
			var $this = $(this);
			$this.find('input[data-use=required],select').each(function (){
				//alert($(this).attr("data-type"));
				if($(this).attr("data-type") in types){
					//types[$(this).attr("data-type")].test($(this).val())?true:$(this).css({color:"#e74c3c",border:"1px solid #e74c3c"});
					if(String(types[$(this).attr("data-type")]).substring(0,1)==="/" 
						&& (String(types[$(this).attr("data-type")]).substring(String(types[$(this).attr("data-type")]).length-1,String(types[$(this).attr("data-type")]).length)==="/")
						 && String(types[$(this).attr("data-type")]).length>1){
						types[$(this).attr("data-type")].test($(this).val())?true:$(this).attr("data-valide","false");retorno=false;
					}
					else{
						//comprueba expresiones aritmeticas
						if($(this).attr("data-link")!=""){
							var datatype=types[$(this).attr("data-type")];
							switch(String(datatype).substring(3,6)){
								case "dat":
									var $linked=$("#"+$(this).attr("data-link"));
									switch(String(datatype).substring(0,3)){
										case "dif":
											if(types["date"].test($(this).val())&&types["date"].test($linked.val())){
												var first;
												var second;
												if(String(datatype).substring(datatype.length-1,datatype.length)==="h"){
													first=numDiasFecha($(this).val());
													second=numDiasFecha($linked.val());
												}
												else{
													first=numDiasFecha($linked.val());
													second=numDiasFecha($(this).val());
												}
												//alert(first+"-"+second);
												var multiply=0;
												switch(datatype.substring(datatype.length-2,datatype.length-1)){
													case "d":
														multiply=86400000;
													break;
													case "m":
														multiply=2628000000;
													break;
													case "y":
													default:
														multiply=31536000000;
													break;
												}
												if(first>second){
													if(first-second>(multiply*parseInt(datatype.substring(6,datatype.length-2),10))){
														retorno=false;
														$(this).attr("data-valide","false");
														$linked.attr("data-valide","false");
													}
												}
												else{
													retorno=false;
													$(this).attr("data-valide","false");
													$linked.attr("data-valide","false");
												}
											}
											else{
												$(this).attr("data-valide","false");
												$linked.attr("data-valide","false");
												retorno=false;	
											}
										break;
										case "equ":
											if(numDiasFecha($(this).val())!=numDiasFecha($linked.val())){
												$(this).attr("data-valide","false");
												$linked.attr("data-valide","false");
												retorno=false;
											}
										break;
									}
								break;
							}
						}
					}
				}
				
			});
		});
		return retorno;
	}

	function numDiasFecha(fecha){

		var d=fecha.trim().substr(0,2);
		var m=fecha.trim().substr(3,2);
		var a=fecha.trim().substr(6,4);
	  	fecha=new Date(parseInt(a,10),parseInt(m,10),parseInt(d,10));
	  //return 365*a+Math.floor(a/4)-Math.floor(a/100)+Math.floor(a/400)
				//+Math.floor((m*306+5)/10)+d-1; 
	//alert(fecha);
		return fecha.getTime();
	}
	function difDias(d1,m1,a1,d2,m2,a2){
		return numDiasFecha(d2,m2,a2) - numDiasFecha(d1,m1,a1);
	}

    function comprobarSiBisisesto(anio){
    if ( ( anio % 100 != 0) && ((anio % 4 == 0) || (anio % 400 == 0))) {
        return true;
        }
    else {
        return false;
        }
    }
}(window.jQuery);