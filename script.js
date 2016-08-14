/* alternative implementation with setTimeout
var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
console.log('timeout val',randomDelay);
setTimeout(function(){
  cb(sum);
},randomDelay);
*/


(function() {
  var sum1,sum2,sum3,
  fakeAjax=function(id,cb){
  	console.log('setting up cb');

    var el=document.getElementById(id);

    el.onclick=function(btn){
      var params=JSON.parse(btn.target.value);
      var sum=params.x+params.y;
      cb(sum);
    };
  },
  add=function(id){
  	var resp, fn;

  	fakeAjax(id, function(sum){
  		if(fn) fn(sum);
  		else resp=sum;
  	});

  	return function (cb){
  		console.log('running cb');
  		if(resp) cb(resp);
  		else fn=cb;
  	};
  },
  results=document.getElementById('results'),
  isComplete=function(el){
      var args=[].slice.call(arguments,1);
      el.innerHTML="";
      args.forEach(function(item){
        el.innerHTML+=item+" ";
      });
      el.innerHTML+="Complete";
  },
  th1=add('btn1'),
  th2=add('btn2'),
  th3=add('btn3');

  results.innerHTML="Starting.....";

  th1(function(sum){
    console.log(sum);
  	sum1=sum;
  	th2(function(sum){
      console.log(sum);
  		sum2=sum;
  		th3(function(sum){
        console.log(sum);
  			sum3=sum;
        isComplete(results,sum1,sum2,sum3);
        console.log('Sums are:',sum1,sum2,sum3);
  		});
  	});
  });
}());
