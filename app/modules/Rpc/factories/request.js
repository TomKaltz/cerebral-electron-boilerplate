import {copy} from 'cerebral/operators'

export default function(name){
  function request({services, input, output, modules}) {
    services.rpc.client.request(name, input, function(err, body) {
      //console.log('Error from someAsyncRequest:', err);
  		//console.log('Body from someAsyncRequest:', body);
  		if(err){
        output.error({message: {route:name,...err}})
  		}else{
  			output.success({message: body})
  		}
  	})
  }

  request.async = true;
  request.displayName = `rpc request ` + name;
  request.outputs = ['error', 'success'];
  return request
}
