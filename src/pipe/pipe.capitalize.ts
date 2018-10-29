import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})

export class PipeCapitalize implements PipeTransform {
    
    transform(text) {
        let reg = /([^\W_]+[^\s-]*) */g;
        return (!!text) ? text.replace(reg, function(txt) { 
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : '';
    }

}
