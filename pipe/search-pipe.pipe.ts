import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: any[], ...args: string[]): any[] {
       

    let searchkey=args[0].toLowerCase();
   value =  value.filter(v => {
     
       return  this.resolveObject(v,searchkey)
    })

    return value; 
  }


  resolveObject(obj:any,searchkey:string):boolean{
    
    for (let key in obj) { 
      
      if (typeof obj[key] !=  'object'  ) {
         let  d = obj[key]+""; 
         d = d.toLocaleLowerCase(); 
         
         //@ts-ignore  
        if(d.includes(searchkey)){
         return true;
        }
      }
      else{
        return this.resolveObject(obj[key],searchkey);
      }
    }
    return false;
  }
  


}
