/**
 * 为对象增加深克隆属性方法， 如果有重复属性则不改变.
 * 适用于一个对象克隆另一个对象的所有属性.
 *新增点内容
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
		   // 如果有重复， 则跳过.
		   if(this[names[t]] !== undefined) continue;
		   
		   var config = Object.getOwnPropertyDescriptor(o, names[t]);
		   Object.defineProperty(this, names[t], config);
	   }
   }
});

/**
 * 新克隆方法，使所有数据类型都可以克隆.
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
   
   // 克隆出所有此对象可枚举属性.
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
 *  鸭式辩型方法判断类型.
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