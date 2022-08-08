
const updateRow = async (parameterID, toUpdate, modelName, algorithm) => {
   //const result = modelName.findOne( {where :{ID : parameterID}})
    await  modelName.update(
        {[toUpdate]: true},
        {where :{ID : parameterID}},
      
    );
}

module.exports = {
    updateRow
}