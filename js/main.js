var tokenizatorAddress = "0x6a190eef45f589373a463AFb3B90493E696c45e2";

var web3js = new Web3();

var tokenizatorAbi = [ { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_tokenId", "type": "uint256" } ], "name": "approvedFor", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "tokensOf", "outputs": [ { "name": "", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "tokenMetadata", "outputs": [ { "name": "name", "type": "bytes32" }, { "name": "creationTimestamp", "type": "uint256" }, { "name": "creator", "type": "address" }, { "name": "description", "type": "string" }, { "name": "base64Image", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_tokenId", "type": "uint256" } ], "name": "takeOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "lockTimestamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_name", "type": "bytes32" }, { "name": "_description", "type": "string" }, { "name": "_base64Image", "type": "string" } ], "name": "createToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_approved", "type": "address" }, { "indexed": false, "name": "_tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" } ];

function getTotalSupply() {
  var params = $.param({
      module: 'proxy',
      action: 'eth_call',
      tag: 'latest',
      to: tokenizatorAddress,
      data: '0x18160ddd',
      apikey: '5FUHMWGH51JT3G9EARU4K4QH3SVWYIMFIB',
  });
  return $.get('https://'+etherscanPrefix+'.etherscan.io/api?' + params);
}

var etherscanPrefix = "api";

function getLockTimestamp() {
  var params = $.param({
      module: 'proxy',
      action: 'eth_call',
      tag: 'latest',
      to: tokenizatorAddress,
      data: '0xb544bf83',
      apikey: '5FUHMWGH51JT3G9EARU4K4QH3SVWYIMFIB',
  });
  return $.get('https://'+etherscanPrefix+'.etherscan.io/api?' + params);
}

function getOwnerOf(tokenId) {
  var params = $.param({
      module: 'proxy',
      action: 'eth_call',
      tag: 'latest',
      to: tokenizatorAddress,
      data: '0x6352211e000000000000000000000000000000000000000000000000000000000000000'+tokenId,
      apikey: '5FUHMWGH51JT3G9EARU4K4QH3SVWYIMFIB',
  });
  return $.get('https://'+etherscanPrefix+'.etherscan.io/api?' + params);
}

function getTokensOf(owner) {
  var params = $.param({
      module: 'proxy',
      action: 'eth_call',
      tag: 'latest',
      to: tokenizatorAddress,
      data: '0x5a3f2672000000000000000000000000'+owner.substring(2),
      apikey: '5FUHMWGH51JT3G9EARU4K4QH3SVWYIMFIB',
  });
  return $.get('https://'+etherscanPrefix+'.etherscan.io/api?' + params);
}

function getTokenMetadata(tokenId) {
  var params = $.param({
      module: 'proxy',
      action: 'eth_call',
      tag: 'latest',
      to: tokenizatorAddress,
      data: '0x6914db60000000000000000000000000000000000000000000000000000000000000000'+tokenId,
      apikey: '5FUHMWGH51JT3G9EARU4K4QH3SVWYIMFIB',
  });
  return $.get('https://'+etherscanPrefix+'.etherscan.io/api?' + params);
}

function updateTokenInfo(netId) {

  if (netId == 3){
    $("#tokenizatorAddress").html("Contract  Address: <strong><a href=\"https://ropsten.etherscan.io/address/"+tokenizatorAddress+"\">"+tokenizatorAddress+"</a></strong>");
    $("#tokenTimelock").html(
      "Token Timelock: <strong>No timelock in testnet</strong>"
    );
  } else {
    $("#tokenizatorAddress").html("Contract  Address: <strong><a href=\"https://etherscan.io/address/"+tokenizatorAddress+"\">"+tokenizatorAddress+"</a></strong>");
    getLockTimestamp().then(function(response) {
      console.log('Lock timestamp:', Number(response.result));
      $("#tokenTimelock").html(
        "Token Timelock: <strong>"+new Date(Number(response.result)*1000).toLocaleString()+"</strong>"
      );
      $("#tokenTimelock").show();
    });
  }

  $("#totalTokens").show();
  getTotalSupply().then(function(response) {
    console.log('Total supply:', (Number(response.result)));
    $("#totalTokens").html("Total Tokens: <strong>"+(Number(response.result))+"</strong>");
    $("#totalTokens").show();
    loadTokens(Number(response.result));
  });

}

$('#tokenImage').on('change', function () {
    var fileReader = new FileReader();
    fileReader.onload = function () {
      var data = fileReader.result;  // data <-- in this var you have the file data in Base64 format
      console.log(data);
      $('#tokenImageSrc').val(data);
    };
    fileReader.readAsDataURL($('#tokenImage').prop('files')[0]);
});

function loadTokens(totalTokens) {
  var tokens = [];
  for (var i = totalTokens; i > 0; i--)
    tokens.push({
      id: i,
      srcImg: "",
      desc: "",
      name: "",
      creator: ""
    });
  function remove_non_ascii(str) {
    if ((str===null) || (str===''))
      return false;
   else
     str = str.toString();
    return str.replace(/[^\x20-\x7E]/g, '');
  }
  $("#tokenList").html("");
  tokens.map(function(t, i){
    getTokenMetadata(t.id).then(function(response) {
      var name = web3js.toAscii( response.result.substring(2,66));
      var creator = '0x'+response.result.substring(154,194);
      var desc = web3js.toAscii(response.result.substring(386).split('00000000000000000000000000000000000000000000000000000000000000')[0]);
      var srcImg = web3js.toAscii(response.result.substring(386)).replace(desc, '').substring(38);
      srcImg = remove_non_ascii(srcImg);
      desc = remove_non_ascii(desc);
      name = remove_non_ascii(name);
      tokens[i].name = name;
      tokens[i].srcImg = srcImg;
      tokens[i].desc = desc;
      tokens[i].creator = creator;
      if (etherscanPrefix != 'ropsten') {
        tokens[i].link = '/token?tid='+t.id;
      } else {
        tokens[i].link = '/token?tid='+t.id+'&net=3';
      }
      $("#tokenList").append("<li class=\"list-group-item d-flex justify-content-between lh-condensed\"> <div><h6 class=\"my-0\"><img src=\""+tokens[i].srcImg+"\"> <strong><a href=\""+tokens[i].link+"\">#"+tokens[i].id+" "+tokens[i].name+"</strong></a></h6> Creator: <small class=\"text-muted\">"+tokens[i].creator+"</small> <br> Description: <small class=\"text-muted\">"+tokens[i].desc+"</small> </div> </li>");
    });
  })
}

function getCreateTokenData(){
  var tokenName = $("#tokenName").val();
  var tokenImageSrc = $("#tokenImageSrc").val();
  var tokenDescription = $("#tokenDescription").val();
  var tokenizatorContract = new web3js.eth.contract(tokenizatorAbi).at(tokenizatorAddress);
  $("#txData").text('TX Data: '+tokenizatorContract.createToken.getData(tokenName, tokenDescription, tokenImageSrc));
}

function createToken(){
  var tokenName = $("#tokenName").val();
  var tokenImageSrc = $("#tokenImageSrc").val();
  var tokenDescription = $("#tokenDescription").val();
  var tokenizatorContract = new web3js.eth.contract(tokenizatorAbi).at(tokenizatorAddress);
  var txData = tokenizatorContract.createToken.getData(tokenName, tokenDescription, tokenImageSrc);
  var txGas = web3js.eth.estimateGas({
    to: tokenizatorAddress,
    data: txData
  }, function(err, gasLimit) {
    if (!err)
      web3js.eth.sendTransaction({
        to: tokenizatorAddress,
        from: web3js.eth.accounts[0],
        data: txData,
        gas: gasLimit,
        value: 0
      }, function(err, transactionHash) {
        if (!err)
        console.log(transactionHash);
        $("#txData").text('Create Token tx: '+transactionHash);
      });
  });
}

window.addEventListener("load", function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
    $('#tokenActions').show();
    web3js.version.getNetwork((err, netId) => {
      updateTokenInfo(netId);
    });
  } else {
    console.log("No web3? You should consider trying MetaMask!");
    var web3js = new Web3();
    $('#tokensColum').attr('class', 'col-md-8');
    web3js.setProvider(new web3js.providers.HttpProvider('https://mainnet.infura.io/WKNyJ0kClh8Ao5LdmO7z'));
    console.log(web3js)
    updateTokenInfo(1);
  }
});

function switchNetwork() {
  $("#tokenList").html("");
  if (tokenizatorAddress == "0x6a190eef45f589373a463AFb3B90493E696c45e2") {
    tokenizatorAddress = "0x5251F45C90D79112388993EbC45d9583A060f9F5";
    etherscanPrefix = "ropsten";
    web3js.setProvider(new web3js.providers.HttpProvider('https://ropsten.infura.io/WKNyJ0kClh8Ao5LdmO7z'));
    updateTokenInfo(3);
    $("#switchNetwork").html("<button class=\"btn btn-sm btn-link\">Swicth to MainNet</button>");
  } else {
    tokenizatorAddress = "0x6a190eef45f589373a463AFb3B90493E696c45e2";
    etherscanPrefix = "api";
    web3js.setProvider(new web3js.providers.HttpProvider('https://mainnet.infura.io/WKNyJ0kClh8Ao5LdmO7z'));
    updateTokenInfo(1);
    $("#switchNetwork").html("<button class=\"btn btn-sm btn-link\">Swicth to Testnet</button>");
  }

}
