function validateParams(params) { 
    // ...
}

function sendTransaction(params) {
    var data = {
        from: params.from,
        to: params.to,
        value: web3.toWei(params.amount, "ether")
    };
    var hash = web3.eth.sendTransaction(data);

    return true;
}

status.command({
    name: "send",
    color: "#50bb7a",
    description: "Send transaction",
    params: [{
        name: "to",
        type: status.types.CONTACT,
        default: context.participants[0]
    }, {
        name: "from",
        type: status.types.CONTACT,
        default: context.self
    }, {
        name: "amount",
        type: status.types.NUMBER
    }],
    preview: function (params) {
        return status.components.text(
            {},
            params.value + " ETH"
        );
    },
    handler: sendTransaction,
    validator: validateParams
});




------------------------------------------------------------------

var location = {
    name: "location",
    color: "#a187d5",
    description: "Send Location",
    // ...
};

status.command(location);
status.response(location);

status.command({
    name: "whereis",
    color: "#a187d5",
    description: "Request a participants Location",
    params: [
        {
            name: "from",
            type: status.types.CONTACT,
            default: context.participants[0]
        }
    ],
    handler: function (params) {
        status.request('location', params.from);
   }
});
