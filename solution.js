module.exports = function sortCategoriesForInsert (inputJson) {

    // Convert a JSON string to a JSON object
    const categories = JSON.parse(inputJson);
    
    let properJsonOutput = new Array();

    // Construct an Object that stores position(index) values of categories by parent_id
    let positionsByParentId = {};
    categories.forEach((category, index) => {
        if (!(category.parent_id in positionsByParentId)) {
            positionsByParentId[category.parent_id] = new Array();
        }
        positionsByParentId[category.parent_id].push(index);
    });

    // Push positions(indexes) of root categories to a queue
    let categoryPositionsQueue = new Array();
    for (let i = 0; i < positionsByParentId["null"].length; i++) {
        categoryPositionsQueue.push(positionsByParentId["null"][i]);
    }

    // Iterate categories using Breadth-First Search algorithm
    while (categoryPositionsQueue.length) {

        const currentCategoryPosition = categoryPositionsQueue.shift();
        const currentCategory = categories[currentCategoryPosition];
        
        properJsonOutput.push(currentCategory);

        // Skip if the current category hasn't any childs
        if (!(currentCategory.id in positionsByParentId)) continue;

        for (let i = 0; i < positionsByParentId[currentCategory.id].length; i++) {
            categoryPositionsQueue.push(positionsByParentId[currentCategory.id][i]);
        }

    }

    // Convert a JSON object to a JSON string
    properJsonOutput = JSON.stringify(properJsonOutput);
    
    return properJsonOutput

}