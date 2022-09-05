
const updateRow = async (parameterID, toUpdate, modelName, algorithm) => {
   //const result = modelName.findOne( {where :{ID : parameterID}})
    await  modelName.update(
        {[toUpdate]: true},
        {where :{ID : parameterID}},
      
    );
}
// Model name and the id of the request
const getSingleItem = async (modelName, id) => {
  await modelName.findOne({
    where : {ID : id}
 })
}
module.exports = {
    updateRow,
    getSingleItem
}