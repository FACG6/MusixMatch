const { handleHomePage , handleSearch , handleStatics , handleError } = require('./handler');


let router = (request, response) => {
   const endpoint = request.url;
    if(endpoint === '/'){
        handleHomePage(request,response);
    }
    
    else if(endpoint === '/search'){
        handleSearch(request,response);
    }

    else if(endpoint.includes('public')){
        handleStatics(request,response);
    }
    else{
        handleError(request,response);
    }
  }

module.exports = router;