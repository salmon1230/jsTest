/**
 * Ϊ�����������¡���Է����� ������ظ������򲻸ı�.
 * ������һ�������¡��һ���������������.
 *����������
 */
Object.defineProperty(Object.prototype, "copyAttr", {
   writable : false,
   configurable : true,
   enumerable : false,
   value : function(o) {
	   if(util.checkType(o) !== "Object") {
		   console.error("____wrong arguments, need Object, get " + util.checkType(o));
		   
		   return;
	   }
	   
	   var names = Object.getOwnPropertyNames(o);
	   
	   for(var t in names) {
		   // ������ظ��� ������.
		   if(this[names[t]] !== undefined) continue;
		   
		   var config = Object.getOwnPropertyDescriptor(o, names[t]);
		   Object.defineProperty(this, names[t], config);
	   }
   }
});

/**
 * �¿�¡������ʹ�����������Ͷ����Կ�¡.
 */
util.newDeepClone = function(o) {
   var result;	
	
   if(util.checkType(o) == "Object") {
      result = {};   	   
   }
   else if(util.checkType(o) == "Array") {
	  result = []; 
   }
   else {
      return o;	   
   }
   
   // ��¡�����д˶����ö������.
   for (var v in o) {
	  if(util.checkType(o[v]) == "Object" || util.checkType(o[v]) == "Array") {
	     result[v] = arguments.callee(o[v]);	   
	  }
	  else {
		 result[v] = o[v];
	  }
   }
   
   return result;
};

/**
 *  Ѽʽ���ͷ����ж�����.
 **/
util.quacks = function(o, /*optional*/) {
   for(var i = 1; i < arguments.length; i++) {
   	var arg = arguments[i];
   	switch(typeof arg) {
   	   case "string" :
   	   	if(typeof o[arg] !== "function") return false;
   	   	continue;
   	   case "function" :
   	      arg = arg.prototype;
   	   case "object" :
   	      for(var m in arg) {
   	         if(typeof arg[m] !== "function") continue;
   	         if(typeof o[m] !== "fucntion") return false;   	
   	      } 	
   	}
   }
   
   return true;
   //afsdfasdfasdfasdfas
}