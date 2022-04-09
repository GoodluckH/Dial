import React from 'react';

/// Get all functions from a parsed ABI
function ContractFunctions(props) {
   // console.log(props.ABI);
    var parsed = JSON.parse(props.ABI)
    console.log(parsed);
    var functions = parsed.filter((item) => item.type === 'function')
    for (var item of functions) {
        console.log(item);
    }
    return (
    <div>
      { functions.map((item, i) => {
            return (
                <div key={i}>
                    <h1>{item.name}</h1>
                    <p>Inputs: {item.inputs.toString()}</p>
                    <p>Outputs: {item.inputs.toString()}</p>
                </div>                    
            )
        }) }
    </div>)
  
    
}

export default ContractFunctions            