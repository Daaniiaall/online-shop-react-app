// function for miniaturize title to 3 words
function shortenText(text){
    return text.split(" ").slice(0 , 3).join(" ");
}
// if user searched products
function searchProducts(products , search){
    if(!search){return products;}
    const searchedProducts = products.filter((p)=>(p.title.toLowerCase().includes(search)))
    return searchedProducts;
}

// if user selected category
function filterProducts(products , category){
    if(!category){return products}
    const filteredProducts = products.filter((p)=>(p.category === category))
    return filteredProducts;
}

// function for create QUERY STRING 
function createQueryObject(currentQuery , newQuery){

    // if user selected "category===all" ===> we dont want SET category in QUERY STRING IN URL
    if(newQuery.category === "all"){
        // destructure category from QUERY & remove that from QUERY  
        const {category , ...rest} = currentQuery
        // rest = anything else has been in Query "EXCEPT" category
        return rest;
    }

    // if user NOT FILLED search input ===> we dont want SET search in QUERY STRING IN URL
    if(newQuery.search === ""){
        // destructure search from QUERY & remove that from QUERY 
        const {search , ...rest} = currentQuery
        // rest = anything else has been in Query "EXCEPT" search
        return rest;
    }
    // else:
    return{...currentQuery , ...newQuery}
}

// when user Reload pages ===> we want current page still showing

function getInitialQuery(searchParams){
    const query = {}
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    // if category&search EXIST in URL
    if(!!category){query.category = category}
    if(!!search){query.search = search}
    return query;
}

// redux shopping basket
function sumPrice(products){
    return products.reduce((prev , curr)=> prev + curr.price * curr.quantity , 0)
}

function sumQuantity(products){
    return products.reduce((prev , curr)=> prev + curr.quantity , 0)
}
// redux shopping basket


// for access to productQuantity
function productQuantity(state , id){
    const index = state.selectedItems.findIndex((item)=> item.id === id)

    if(index === -1) { return 0 ; }
    else{
        return state.selectedItems[index].quantity;
    }
}


export {shortenText , searchProducts , filterProducts , createQueryObject , getInitialQuery , productQuantity ,sumPrice , sumQuantity } ;