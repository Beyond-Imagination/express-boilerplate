import interceptor from 'express-interceptor'
import snakecaseKeys from 'snakecase-keys'

export const snakecaseResponse = interceptor(function(req, res){
  return {
    isInterceptable: function(){
      return true;
    },
    intercept: function(body, send) {
      if (isJSONString(body)) {
        body = JSON.stringify(snakecaseKeys(JSON.parse(body)))
      }
      send(body);
    }
  };
})

export function isJSONString(jsonString:string) : boolean {
  let obj = null;
  try {
    obj = JSON.parse(jsonString);
  } catch (e) {
    return false
  }
  return obj !== null && typeof obj === "object"
}
