dpd.commands.get({$limit:1, $sort: {timestamp: -1}}, function(results, error) {
    if(error) {
        cancel(error);
    } else {
        var result = results[0];
        var resultStr = "";
        resultStr += result.timestamp;
        resultStr += "_";
        resultStr += result.code;
        resultStr += "_";
        resultStr += result.param;
        setResult(resultStr);
    }
});