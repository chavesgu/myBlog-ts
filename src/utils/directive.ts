import Vue from 'vue'
import Prism from 'prismjs'

Vue.directive('prism',{
  componentUpdated:function(el,binding){
    let pre = el.querySelectorAll('pre');
    for (let index = 0;index<pre.length;index++){
      let lang:string = pre[index].className.split('-')[1];
      let code:any = pre[index].querySelector('code');
      let html = code.innerHTML;
      code.innerHTML = Prism.highlight(html,Prism.languages[lang]);
    }
  }
});