const { handleHomePage, handleSearchById, handleStatics, handleKeywords, handleError } = require('./handler');


let router = (request, response) => {
   const endpoint = request.url;
    if(endpoint === '/'){
        handleHomePage(request,response);
    }
    
    else if(endpoint === '/search'){
        handleSearchById(request,response);
    }
    else if(endpoint === '/keywordsearch'){
        handleKeywords(request,response);
    }
    else if(endpoint.includes('public')){
        handleStatics(request,response);
    }
    else{
        handleError(request,response);
    }
  }

module.exports = router;