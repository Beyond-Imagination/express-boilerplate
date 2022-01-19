import interceptor from 'express-interceptor'
import snakecaseKeys from 'snakecase-keys'

export const snakecaseResponse = interceptor(function(req, res){
  return {
    isInterceptable: function(){
      return true;
    },
    intercept: function(body, send) {
      send(JSON.stringify(snakecaseKeys(JSON.parse(body))));
    }
  };
})
