

declare module 'prismjs' {
  export function highlight(html:string,languages:string): any;
  export let languages:{
    [key: string]: any
  }
}

declare module 'qiniu-js' {
  export function upload(file:any,filename:string,token:string,ext:object,opt:object):any;
  export let region:{
    [key: string]: any
  }
}

declare module 'crypto-js'{
  export function SHA256(str:string):any;
  export let enc:{
    [key: string]: any
  }
}

declare function equire(array:string[]):any;